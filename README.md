# Тренажер ASQL с запуском запросов на клиенте

Vue 3 + TypeScript + Vite + Pinia + Tailwind CSS. PostgreSQL запускается прямо в браузере через PGlite (`@electric-sql/pglite`, WebAssembly).

## Смена курса

?product=basic
?product=education

## Структура компонентов

- `components/steps/` — шаблоны шагов (`step_promo`, `step_theory`, `step_practice`)
- `components/practice/` — компоненты страницы практики (`response_table`, `structure_tables`)
- `components/profile/` — компоненты пользователя (`login_form`)

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
