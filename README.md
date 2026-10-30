# Тренажер ASQL с запуском запросов на клиенте

Vue 3 + TypeScript + Vite + Pinia + Tailwind CSS. PostgreSQL запускается прямо в браузере через PGlite (`@electric-sql/pglite`, WebAssembly).

## Смена курса

?product=basic
?product=education

## Структура компонентов

- `components/steps/` — шаблоны шагов (`step_promo`, `step_theory`, `step_practice`)
- `components/practice/` — компоненты страницы практики (`response_table`, `structure_tables`)
- `components/profile/` — компоненты пользователя (`signup_form` — анкета регистрации: цель / профиль / уровень / почта)

## Классы

#### AI Helper

Собирает запрос и отправляет его на сервер чтобы получить ии помощь.

#### Checker

Набор методов которые сравнивают результат выполнения попытки и образца, оба в формате DBResponse.

#### Runner

Синглтон-обёртка над PGlite: один экземпляр БД на всё приложение (`SQLRunner.getInstance()`).

- `reset()` — при первом вызове создаёт `new PGlite()`, при повторных удаляет все таблицы (`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`).
- `run(query)` / `runAll(queries)` — выполняют SQL и возвращают результат в формате DBResponse.
- `getStructure(tableNames)` — читает структуру таблиц из pg_catalog.

## Сторы

```App Store``` – главный стор, управляет шагами, текущим шагом, статусом приложения, обрабатывает все действия пользователя по навигации.

```StepStore``` – стор уровня задания. загружает задание, запускает проверку, вывод чеклиста, работу ии помощника.

```ProfileStore``` – стор пользователя: `email`, `auth_token`, `is_confirmed`, `auth_method`, `progress`. Каждое изменение сохраняется в localStorage (`profile`), при инициализации стор загружается оттуда.

## Регистрация и вход

1. Анкета на роуте `/signup` (`signup_form.vue`): цель обучения, профиль, самооценка уровня, почта.
2. При отправке — `POST https://n8berry.onrender.com/server/asql/signup` с полями в snake_case: `email`, `goal`, `profile`, `profile_other`, `level`.
3. На почту приходит вечная ссылка-диплинк вида `/*/?auth=...`. Роутер в `beforeEach` подхватывает `auth`, сохраняет его в `profile_store` (`auth_token`), помечает аккаунт подтверждённым (`is_confirmed = true`) и убирает токен из адресной строки.

## Аналитика

События отправляются через `reportEvent()` в `step_store` на webhook `SERVER_URL/webhook/asql/events`.

- `opened` — открыт практический шаг
- `completed` / `failed` — результат проверки решения (в `details.code` — код пользователя)
- `aihelp` — запрошена подсказка ИИ

Если пользователь залогинен, к запросу добавляется заголовок `Authorization: Bearer <auth_token>`.
