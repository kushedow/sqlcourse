import hljs from "highlight.js";
import type {Directive} from "vue";

// Подсвечивает все <code> внутри контейнера как SQL
function highlightCodeBlocks(el: HTMLElement): void {
    const blocks = el.querySelectorAll("code");
    blocks.forEach((block) => {
        block.classList.add("language-sql");
        delete block.dataset.highlighted;
        hljs.highlightElement(block);
    });
}

export const vHighlight: Directive<HTMLElement> = {
    mounted(el: HTMLElement) {
        highlightCodeBlocks(el);
    },
    updated(el: HTMLElement) {
        highlightCodeBlocks(el);
    },
};
