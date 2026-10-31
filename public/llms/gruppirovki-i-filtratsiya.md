# Группировки и фильтрация


## Знакомство с Having 👻


**HAVING** фильтрует **группы**: он применяется к результату `GROUP BY`, а не к отдельным строкам. Проще говоря, `WHERE` отбирает строки *до* группировки, а `HAVING` — группы *после* неё.

Разберём на таблице **animals**:

**animals**

| icon | name | specie | location | owner | age | weight |
| --- | --- | --- | --- | --- | --- | --- |
| 🐶 | Бобик | Собака | Красные ворота | Иван | 3 | 10 кг |
| 🐱 | Мурка | Кошка | Парк культуры | Мария | 4 | 5 кг |
| 🐦 | Кеша | Попугай | Чистые пруды | Елена | 2 | 0.5 кг |
| 🐶 | Шарик | Собака | Красные ворота | Иван | 5 | 12 кг |
| 🐱 | Багира | Кошка | Таганская | Мария | 6 | 6 кг |

### 1. Хозяева, у которых 2 животных

```sql
SELECT owner, COUNT(*) AS animals_count
FROM animals
GROUP BY owner
HAVING COUNT(*) = 2;
```

Результат:

| owner | animals_count |
| --- | --- |
| Иван | 2 |
| Мария | 2 |

У Елены всего один питомец, поэтому её группа не проходит условие.

### 2. Хозяева, у которых средний возраст питомцев 5 лет и больше

```sql
SELECT owner, AVG(age) AS avg_age
FROM animals
GROUP BY owner
HAVING AVG(age) >= 5;
```

Результат:

| owner | avg_age |
| --- | --- |
| Мария | 5.00 |

У Ивана средний возраст питомцев (3 + 5) / 2 = 4 года, у Елены — 2 года. Условие выполнено только у Марии: (4 + 6) / 2 = 5.

### 3. Станции, где живут 2 собаки

Сначала надо отобрать только собак — это работа для `WHERE`, потому что фильтр по виду питомца относится к строкам. Затем сгруппируем их по станции и оставим те группы, где собак ровно две, — а это уже `HAVING`:

```sql
SELECT location, COUNT(*) AS dogs_count
FROM animals
WHERE specie = 'Собака'
GROUP BY location
HAVING COUNT(*) = 2;
```

Результат:

| location | dogs_count |
| --- | --- |
| Красные ворота | 2 |

Обе собаки — Бобик и Шарик — живут на одной станции, поэтому в результате одна строка. Фильтр `WHERE specie = 'Собака'` сработал до группировки, а `HAVING COUNT(*) = 2` — уже после неё.

**Что запомнить:** `WHERE` работает со строками и выполняется до `GROUP BY`, `HAVING` — с группами и после. В одном запросе они живут вместе: `WHERE` отсеивает строки, `GROUP BY` собирает группы, `HAVING` отбрасывает неподходящие группы.

## Бууу, испугался? 👻


Найдите детей, которые побывали в **3 и больше** домах, используя `GROUP BY` + `HAVING`.

**halloween**

| kid | home | treats | scared |
| --- | --- | --- | --- |
| Alice | 32 White av | 5 | 1 |
| Alice | 44 Red str | 0 | 0 |
| Alice | 12 Oak St | 7 | 2 |
| Alice | 7 Pine Rd | 0 | 1 |
| Bob | 32 White av | 2 | 1 |
| Bob | 88 Green str | 6 | 3 |
| Bob | 44 Red str | 0 | 0 |
| Clara | 88 Green str | 8 | 2 |
| Clara | 12 Oak St | 4 | 1 |
| David | 12 Oak St | 0 | 1 |
| David | 7 Pine Rd | 5 | 5 |
| David | 88 Green str | 6 | 1 |
| Emma | 32 White av | 0 | 0 |
| Emma | 44 Red str | 3 | 1 |

Выведите имена детей. Сортировка не требуется.

## Больше конфет 👻


Выведите детей, собравших **больше 10** конфет, и отсортируйте их по количеству конфет — от большего к меньшему.

**halloween**

| kid | home | treats | scared |
| --- | --- | --- | --- |
| Alice | 32 White av | 5 | 1 |
| Alice | 44 Red str | 0 | 0 |
| Alice | 12 Oak St | 7 | 2 |
| Alice | 7 Pine Rd | 0 | 1 |
| Bob | 32 White av | 2 | 1 |
| Bob | 88 Green str | 6 | 3 |
| Bob | 44 Red str | 0 | 0 |
| Clara | 88 Green str | 8 | 2 |
| Clara | 12 Oak St | 4 | 1 |
| David | 12 Oak St | 0 | 1 |
| David | 7 Pine Rd | 5 | 5 |
| David | 88 Green str | 6 | 1 |
| Emma | 32 White av | 0 | 0 |
| Emma | 44 Red str | 3 | 1 |

Выведите две колонки: `kid` (имя ребёнка) и `total_treats` (общее количество конфет).

## Страшное среднее 👻


Выведите детей, у которых среднее число конфет за дом **строго больше 3** — ровно 3 не считается.

**halloween**

| kid | home | treats | scared |
| --- | --- | --- | --- |
| Alice | 32 White av | 5 | 1 |
| Alice | 44 Red str | 0 | 0 |
| Alice | 12 Oak St | 7 | 2 |
| Alice | 7 Pine Rd | 0 | 1 |
| Bob | 32 White av | 2 | 1 |
| Bob | 88 Green str | 6 | 3 |
| Bob | 44 Red str | 0 | 0 |
| Clara | 88 Green str | 8 | 2 |
| Clara | 12 Oak St | 4 | 1 |
| David | 12 Oak St | 0 | 1 |
| David | 7 Pine Rd | 5 | 5 |
| David | 88 Green str | 6 | 1 |
| Emma | 32 White av | 0 | 0 |
| Emma | 44 Red str | 3 | 1 |

Выведите две колонки: `kid` (имя ребёнка) и `avg_treats` (среднее число конфет за дом, округлённое до двух знаков).

## Открывайте и отдавайте 👻


Выведите дома, где суммарно раздали **не меньше 10** конфет. Отсортируйте по убыванию количества конфет.

**halloween**

| kid | home | treats | scared |
| --- | --- | --- | --- |
| Alice | 32 White av | 5 | 1 |
| Alice | 44 Red str | 0 | 0 |
| Alice | 12 Oak St | 7 | 2 |
| Alice | 7 Pine Rd | 0 | 1 |
| Bob | 32 White av | 2 | 1 |
| Bob | 88 Green str | 6 | 3 |
| Bob | 44 Red str | 0 | 0 |
| Clara | 88 Green str | 8 | 2 |
| Clara | 12 Oak St | 4 | 1 |
| David | 12 Oak St | 0 | 1 |
| David | 7 Pine Rd | 5 | 5 |
| David | 88 Green str | 6 | 1 |
| Emma | 32 White av | 0 | 0 |
| Emma | 44 Red str | 3 | 1 |

Выведите две колонки: `home` (адрес дома) и `total_treats` (сколько конфет там раздали суммарно).

## Вас снова напугали 👻


Выведите дома, куда пришло **не меньше 3** разных детей.

**halloween**

| kid | home | treats | scared |
| --- | --- | --- | --- |
| Alice | 32 White av | 5 | 1 |
| Alice | 44 Red str | 0 | 0 |
| Alice | 12 Oak St | 7 | 2 |
| Alice | 7 Pine Rd | 0 | 1 |
| Bob | 32 White av | 2 | 1 |
| Bob | 88 Green str | 6 | 3 |
| Bob | 44 Red str | 0 | 0 |
| Clara | 88 Green str | 8 | 2 |
| Clara | 12 Oak St | 4 | 1 |
| David | 12 Oak St | 0 | 1 |
| David | 7 Pine Rd | 5 | 5 |
| David | 88 Green str | 6 | 1 |
| Emma | 32 White av | 0 | 0 |
| Emma | 44 Red str | 3 | 1 |

Выведите две колонки: `home` (адрес дома) и `kids_count` (сколько разных детей туда пришло). Отсортируйте по адресу дома.

## Низкая эффективность 👻


Выведите дома, где суммарно напугали **больше людей, чем дали конфет**.

**halloween**

| kid | home | treats | scared |
| --- | --- | --- | --- |
| Alice | 32 White av | 5 | 1 |
| Alice | 44 Red str | 0 | 0 |
| Alice | 12 Oak St | 7 | 2 |
| Alice | 7 Pine Rd | 0 | 1 |
| Bob | 32 White av | 2 | 1 |
| Bob | 88 Green str | 6 | 3 |
| Bob | 44 Red str | 0 | 0 |
| Clara | 88 Green str | 8 | 2 |
| Clara | 12 Oak St | 4 | 1 |
| David | 12 Oak St | 0 | 1 |
| David | 7 Pine Rd | 5 | 5 |
| David | 88 Green str | 6 | 1 |
| Emma | 32 White av | 0 | 0 |
| Emma | 44 Red str | 3 | 1 |

В колонке `scared` хранится количество напуганных людей, в `treats` — количество выданных конфет. Сравните их суммы для каждого дома.

Выведите три колонки: `home`, `total_treats` и `total_scared`. Отсортируйте по адресу дома.
