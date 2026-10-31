# SELECT


## Основы SELECT


Оператор `SELECT` - главный инструмент, чтобы "смотреть" на данные в таблице.

Возьмем таблицу `animals` и посмотрим, как вытащить из нее нужные колонки:

| id | emoji | name | species |
| --- | --- | --- | --- |
| 1 | 🐶 | Buddy | Dog |
| 2 | 🐱 | Whiskers | Cat |
| 3 | 🦁 | Leo | Lion |

### Показать всю таблицу

Чтобы вытащить все колонки, сперва пишем SELECT, затем ставим символ звездочки, чтобы показать, что забираем все колонки, затем ставим оператор FROM, затем указываем название таблицы.

```sql
SELECT * FROM animals
```

Результат:

1        🐶        Buddy        Dog

2        🐱        Whiskers        Cat

3        🦁        Leo        Lion

### Выбрать только имена (name):

```sql
SELECT name FROM animals
```

Результат:

Buddy

Whiskers

Leo

### Выбрать имена и emoji:

```sql
SELECT emoji, name FROM animals
```

Результат:

🐶        Buddy

🐱        Whiskers

🦁        Leo        Lion

### Ключевые слова:

- **SELECT**: Оператор для выбора данных
- **FROM**: Указывает таблицу, из которой выбираются данные
- *****: Символ для выбора всех столбцов

PS: В [Телеграм-канале](https://t.me/kushedowish) можно узнать про другие тренажеры и первым их протестировать

## Получить все


Выведите все записи с помощью SELECT из таблицы food

## Вывести только иконки


Выведите иконки всех записей с помощью SELECT из таблицы food. Не выводите другие колонки, только icon.

**food**

| id | icon | name | cat | kcal |
| --- | --- | --- | --- | --- |
| 1 | 🍏 | Apple | fruits | 45 |
| 2 | 🍎 | Apple | fruits | 49 |
| 3 | 🍌 | Banana | fruits | 95 |
| 4 | 🥑 | Avocado | fruits | 160 |

## Вывести иконку и название


Выведите иконки и названия всех записей с помощью SELECT из таблицы food. Не выводите другие колонки, только `icon`, `name`.

**food**

| id | icon | name | cat | kcal |
| --- | --- | --- | --- | --- |
| 1 | 🍏 | Apple | fruits | 45 |
| 2 | 🍎 | Apple | fruits | 49 |
| 3 | 🍌 | Banana | fruits | 95 |
| 4 | 🥑 | Avocado | fruits | 160 |

## Вывести все, кроме калорий


Выведите все поля всех записей, кроме `kcal` помощью SELECT из таблицы food.

**food**

| id | icon | name | cat | kcal |
| --- | --- | --- | --- | --- |
| 1 | 🍏 | Apple | fruits | 45 |
| 2 | 🍎 | Apple | fruits | 49 |
| 3 | 🍌 | Banana | fruits | 95 |
| 4 | 🥑 | Avocado | fruits | 160 |

## Уникальные значения (DISTINCT)


`SELECT DISTINCT` позволяет выбрать только уникальные значения из указанного столбца.

Представим таблицу **animals**:

| emoji | name | specie | owner |
| --- | --- | --- | --- |
| 🐶 | Buddy | Dog | Alice 🧑‍🦰 |
| 🐱 | Whiskers | Cat | Bob 🧑‍🦱 |
| 🦁 | Leo | Cat | Bob 🧑‍🦱 |
| 🐕 | Max | Dog | Alice 🧑‍🦰 |

### Уникальные виды:

```sql
SELECT DISTINCT specie FROM animals
```

Результат:

```sql
Dog
Cat
```

### Уникальные имена:

```sql
SELECT DISTINCT name FROM animals
```

Результат:

```sql
Buddy
Whiskers
Leo
Max
```

### Уникальные хозяева:

```sql
SELECT DISTINCT owner FROM animals
```

Результат:

```sql
Alice 🧑‍🦰
Bob 🧑‍🦱
```

PS: А знаете, что еще уникальное? Посты в[Телеграм-канале](https://t.me/kushedowish)автора тренажера!

## Получить уникальные категории


Выведите только категории, без повторов.

**food**

| id | icon | name | cat | kcal |
| --- | --- | --- | --- | --- |
| 1 | 🍏 | Apple | fruits | 45 |
| 2 | 🍎 | Apple | fruits | 49 |
| 3 | 🍌 | Banana | fruits | 95 |
| 4 | 🥑 | Avocado | fruits | 160 |

## Сортировка (ORDER BY)


**ORDER BY** сортирует результаты запроса по указанной колонке.

Представим таблицу **animals**:

**animals**

| id | name | species | emoji |
| --- | --- | --- | --- |
| 1 | Buddy | Dog | 🐶 |
| 2 | Whiskers | Cat | 🐱 |
| 3 | Leo | Lion | 🦁 |
| 4 | Alex | Lion | 🦁 |

### 1. Сортировка по алфавиту

```sql
SELECT name FROM animals ORDER BY name;
```

Результат — имена по алфавиту:

| name |
| --- |
| Alex |
| Buddy |
| Leo |
| Whiskers |

`ASC` — это направление по умолчанию, поэтому `ORDER BY name` и `ORDER BY name ASC` дают один и тот же результат. 🔤

### 2. В обратном порядке

```sql
SELECT name FROM animals ORDER BY name DESC;
```

Результат — от последней буквы к первой:

| name |
| --- |
| Whiskers |
| Leo |
| Buddy |
| Alex |

### 3. Сортировка по видам

```sql
SELECT species FROM animals ORDER BY species;
```

| species |
| --- |
| Cat |
| Dog |
| Lion |
| Lion |

**Обратите внимание:** у двух львов значение `species` одинаковое — это «ничья». В каком порядке они окажутся, база данных не гарантирует. Чтобы порядок был предсказуемым, добавляют второй ключ сортировки — см. пример ниже.

### 4. Сортировка по нескольким колонкам

```sql
SELECT * FROM animals ORDER BY species, name;
```

Сначала записи выстраиваются по `species`, а если вид совпадает — по `name`. То есть сначала все кошки по именам, потом все собаки по именам, потом все львы по именам:

| id | name | species | emoji |
| --- | --- | --- | --- |
| 2 | Whiskers | Cat | 🐱 |
| 1 | Buddy | Dog | 🐶 |
| 4 | Alex | Lion | 🦁 |
| 3 | Leo | Lion | 🦁 |

Каждый ключ может иметь своё направление: `ORDER BY species ASC, name DESC` — виды по возрастанию, а имена внутри вида по убыванию.

**Итог:** `ORDER BY` позволяет легко сортировать данные по вашим потребностям.

## Отсортировать по алфавиту


Выведите иконки и названия всех записей с помощью SELECT и ORDER BY из таблицы food, **отсортированные по алфавиту**. Не выводите другие колонки, только `icon`, `name`.

**food**

| id | icon | name | cat | kcal |
| --- | --- | --- | --- | --- |
| 1 | 🍏 | Apple | fruits | 45 |
| 2 | 🍎 | Apple | fruits | 49 |
| 3 | 🍌 | Banana | fruits | 95 |
| 4 | 🥑 | Avocado | fruits | 160 |

## Сортировка по калорийности


Выведите иконки (icon), названия (name) и калорийность (kcal) всех записей с помощью SELECT и ORDER BY из таблицы food, **отсортированные по калорийности по возрастанию**. Не выводите другие колонки, только `icon`, `name`, `kcal`.

**food**

| id | icon | name | cat | kcal |
| --- | --- | --- | --- | --- |
| 1 | 🍏 | Apple | fruits | 45 |
| 2 | 🍎 | Apple | fruits | 49 |
| 3 | 🍌 | Banana | fruits | 95 |
| 4 | 🥑 | Avocado | fruits | 160 |

## Отсортировать по калорийности (обратно)


Выведите иконки, названия и калорийность всех записей с помощью SELECT и ORDER BY из таблицы food, **отсортированные по калорийности по убыванию**. Не выводите другие колонки, только `icon`, `name`, `kcal`.

**food**

| id | icon | name | cat | kcal |
| --- | --- | --- | --- | --- |
| 1 | 🍏 | Apple | fruits | 45 |
| 2 | 🍎 | Apple | fruits | 49 |
| 3 | 🍌 | Banana | fruits | 95 |
| 4 | 🥑 | Avocado | fruits | 160 |
