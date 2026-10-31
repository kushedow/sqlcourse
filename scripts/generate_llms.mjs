/**
 * Генератор файлов для ИИ-индексации (AI discoverability):
 *   - public/robots.txt        — разрешение ИИ-ботов
 *   - public/sitemap.xml       — все шаги курса
 *   - public/llms.txt          — индекс для LLM-краулеров (llmstxt.org)
 *   - public/llms/<lesson>.md  — текстовые версии уроков (Markdown)
 *   - public/llms-full.txt     — весь курс одним файлом
 *
 * Запуск:
 *   node scripts/generate_llms.mjs               # свежие данные из API
 *   node scripts/generate_llms.mjs path/to.json  # из заранее скачанного JSON
 *
 * Источник данных — тот же API, что использует приложение (src/config.ts).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// --- Конфигурация (дублирует src/config.ts, чтобы скрипт был автономным) ---
const SITE_URL = "https://sql.kushedow.tech";
const EXERCISES_URL = "https://n8berry.onrender.com/api/db/asql_excerises";
const EXERCISES_TOKEN = "sYpOm9R9kJJei-9vXkAtOpbFL4uKbafbGwPVsMnpKpo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const LLMS_DIR = path.join(PUBLIC_DIR, "llms");

// --- Загрузка шагов ---

async function loadRows() {
    const fileArg = process.argv[2];
    if (fileArg) {
        const raw = fs.readFileSync(path.resolve(fileArg), "utf8");
        return JSON.parse(raw).rows || [];
    }

    const headers = { Authorization: `Bearer ${EXERCISES_TOKEN}` };
    const res = await fetch(EXERCISES_URL, { headers });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data.rows || [];
}

// Повторяет маппинг src/classes/exercise_manager.class.ts
function mapSteps(rows) {
    const stepByUuid = new Map(rows.map((r) => [r.uuid, Number(r.step)]));
    return rows
        .map((r) => ({
            id: Number(r.step),
            title: r.title,
            type: r.type, // theory | practice | promo
            lesson: r.lesson,
            instruction: r.content || "",
            solution: r.solution || "",
            theorySteps: r.theory_steps ? String(stepByUuid.get(r.theory_steps) ?? "") : "",
        }))
        .sort((a, b) => a.id - b.id);
}

// --- HTML → Markdown ---

function decodeEntities(s) {
    return String(s)
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
        .replace(/&nbsp;/gi, " ")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&amp;/gi, "&");
}

function stripTags(s) {
    return s.replace(/<[^>]+>/g, "");
}

function cleanCell(s) {
    return decodeEntities(stripTags(s)).replace(/\s+/g, " ").trim();
}

function escapePipe(s) {
    return s.replace(/\|/g, "\\|");
}

function tableToMarkdown(tblHtml) {
    let caption = "";
    const cap = tblHtml.match(/<caption[^>]*>([\s\S]*?)<\/caption>/i);
    if (cap) caption = cleanCell(cap[1]);

    const rows = [];
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let m;
    while ((m = rowRe.exec(tblHtml))) {
        const cells = [];
        const cellRe = /<(th|td)[^>]*>([\s\S]*?)<\/\1>/gi;
        let c;
        while ((c = cellRe.exec(m[1]))) cells.push(cleanCell(c[2]));
        if (cells.length) rows.push(cells);
    }
    if (!rows.length) return "";

    const header = rows[0];
    const body = rows.slice(1);
    const width = header.length;

    const out = [];
    out.push("| " + header.map(escapePipe).join(" | ") + " |");
    out.push("| " + header.map(() => "---").join(" | ") + " |");
    for (const r of body) {
        const padded = Array.from({ length: width }, (_, i) => r[i] ?? "");
        out.push("| " + padded.map(escapePipe).join(" | ") + " |");
    }

    let result = "\n\n" + out.join("\n") + "\n\n";
    if (caption) result = `\n\n**${caption}**\n` + result;
    return result;
}

// Инлайновые теги внутри абзаца/заголовка
function inline(s) {
    let t = s;
    t = t.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => "`" + decodeEntities(stripTags(c)) + "`");
    t = t.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${decodeEntities(stripTags(text))}](${href})`);
    t = t.replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, (_, text) => decodeEntities(stripTags(text)));
    t = t.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, text) => `**${decodeEntities(stripTags(text))}**`);
    t = t.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, text) => `*${decodeEntities(stripTags(text))}*`);
    t = t.replace(/<img[^>]*src=["']([^"']*)["'][^>]*\/?>/gi, (_, src) => `![](${src})`);
    t = t.replace(/<br\s*\/?>/gi, "\n");
    t = t.replace(/<\/?(u|span|div|small|sup|sub)[^>]*>/gi, "");
    t = stripTags(t);
    return decodeEntities(t).trim();
}

function htmlToMarkdown(html) {
    if (!html) return "";
    let s = String(html);

    // 1. Блоки кода (<pre><code>...</code></pre>) → placeholders
    const codeBlocks = [];
    s = s.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, inner) => {
        const code = decodeEntities(stripTags(inner)).trim();
        codeBlocks.push(code);
        return `\u0000CODE${codeBlocks.length - 1}\u0000`;
    });

    // 2. Таблицы
    s = s.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, inner) => tableToMarkdown(inner));

    // 3. Заголовки
    s = s.replace(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lvl, t) => {
        const hashes = "#".repeat(+lvl + 1); // <h2> → "##"
        return `\n\n${hashes} ${inline(t)}\n\n`;
    });

    // 4. Списки
    s = s.replace(/<[ou]l[^>]*>([\s\S]*?)<\/[ou]l>/gi, (_, inner) => {
        const items = [];
        const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
        let m;
        while ((m = liRe.exec(inner))) items.push(`- ${inline(m[1])}`);
        return items.length ? `\n\n${items.join("\n")}\n\n` : "";
    });

    // 5. details/summary → bold заголовок + содержимое
    s = s.replace(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, (_, sum, body) => `\n\n**${inline(sum)}**\n\n${body}\n\n`);

    // 6. Абзацы (абзац из одного <code> → SQL-блок)
    s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => {
        const codeOnly = t.match(/^\s*<code[^>]*>([\s\S]*?)<\/code>\s*$/i);
        if (codeOnly) {
            return `\n\n\`\`\`sql\n${decodeEntities(stripTags(codeOnly[1])).trim()}\n\`\`\`\n\n`;
        }
        return `\n\n${inline(t)}\n\n`;
    });

    // 7. Переносы строк и остаточные блочные теги
    s = s.replace(/<br\s*\/?>/gi, "\n");
    s = s.replace(/<\/(div|section|article)>/gi, "\n\n");

    // 8. Собираем обратно: инлайны + блоки кода
    s = inline(s);
    s = s.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => `\n\n\`\`\`sql\n${codeBlocks[+i]}\n\`\`\`\n\n`);

    // 9. Нормализация пустых строк
    s = s.replace(/[ \t]+\n/g, "\n");
    s = s.replace(/\n{3,}/g, "\n\n");
    return s.trim();
}

// --- Слаги уроков (транслитерация) ---

const TRANSLIT = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh",
    щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function plural(n, one, few, many) {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return `${n} ${one}`;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return `${n} ${few}`;
    return `${n} ${many}`;
}

function slugify(text) {
    const lower = String(text).toLowerCase();
    const latin = [...lower].map((ch) => TRANSLIT[ch] ?? ch).join("");
    return latin
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60) || "lesson";
}

// --- Сборка ---

function buildLessonMarkdown(lesson, steps) {
    const parts = [`# ${lesson.title}\n`];
    for (const step of steps) {
        parts.push(`## ${step.title}\n`);
        parts.push(htmlToMarkdown(step.instruction));
    }
    return parts.join("\n\n") + "\n";
}

function groupByLesson(steps) {
    const map = new Map();
    for (const step of steps) {
        if (!map.has(step.lesson)) map.set(step.lesson, []);
        map.get(step.lesson).push(step);
    }
    return [...map.entries()]
        .map(([title, lessonSteps]) => ({ title, steps: lessonSteps, firstId: lessonSteps[0].id }))
        .sort((a, b) => a.firstId - b.firstId);
}

function buildRobots() {
    const bots = [
        "GPTBot", "OAI-SearchBot", "ChatGPT-User",
        "ClaudeBot", "Claude-Web", "anthropic-ai",
        "PerplexityBot", "Google-Extended", "CCBot",
        "Applebot-Extended", "Amazonbot", "Meta-ExternalAgent",
    ];
    const lines = ["User-agent: *", "Allow: /", ""];
    for (const bot of bots) {
        lines.push(`User-agent: ${bot}`, "Allow: /", "");
    }
    lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
    return lines.join("\n") + "\n";
}

function buildSitemap(lessons, steps) {
    const urls = new Set([`${SITE_URL}/`]);
    // все шаги (маршруты приложения)
    for (const step of steps) urls.add(`${SITE_URL}/#/step_${step.id}`);
    // текстовые версии уроков
    for (const lesson of lessons) urls.add(`${SITE_URL}/llms/${slugify(lesson.title)}.md`);

    const entries = [...urls]
        .map((u) => `  <url><loc>${escapeXml(u)}</loc></url>`)
        .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function buildLlmsIndex(lessons) {
    const lines = [];
    lines.push("# Тренажер ASQL");
    lines.push("");
    lines.push("> Интерактивный тренажёр SQL на PostgreSQL прямо в браузере: теория, практические задачи, примеры и проверка решений.");
    lines.push("");
    lines.push(`Попробовать: ${SITE_URL}/  — уроки от базового SELECT до оконных функций, JOIN и работы с датами.`);
    lines.push("");
    lines.push("## Уроки");
    lines.push("");
    for (const lesson of lessons) {
        const theory = lesson.steps.filter((s) => s.type === "theory").length;
        const practice = lesson.steps.filter((s) => s.type === "practice").length;
        const url = `${SITE_URL}/llms/${slugify(lesson.title)}.md`;
        const desc = (theory === 0 && practice === 0)
            ? "вводный экран"
            : [plural(theory, "теория", "теории", "теорий"), plural(practice, "задание", "задания", "заданий")].join(", ");
        lines.push(`- [${lesson.title}](${url}): ${desc}`);
    }
    lines.push("");
    lines.push("## Полный текст");
    lines.push("");
    lines.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt): весь курс одним файлом`);
    return lines.join("\n") + "\n";
}

function escapeXml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// --- Главный поток ---

async function main() {
    const rows = await loadRows();
    const steps = mapSteps(rows);
    if (!steps.length) throw new Error("Не удалось получить шаги курса");
    const lessons = groupByLesson(steps);

    // Текстовые версии уроков + llms-full.txt
    const fullParts = [];
    for (const lesson of lessons) {
        const md = buildLessonMarkdown(lesson, lesson.steps);
        const file = path.join(LLMS_DIR, `${slugify(lesson.title)}.md`);
        fs.writeFileSync(file, md);
        fullParts.push(md);
        console.log("lesson:", path.relative(PUBLIC_DIR, file));
    }
    fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), fullParts.join("\n---\n\n"));

    fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), buildRobots());
    fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), buildSitemap(lessons, steps));
    fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), buildLlmsIndex(lessons));

    console.log("done:", steps.length, "шагов,", lessons.length, "уроков");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
