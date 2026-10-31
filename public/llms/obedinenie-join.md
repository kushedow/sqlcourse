# Объединение [Join]


## Объединение таблиц: JOIN


**LEFT JOIN** используется для объединения данных из двух таблиц.
Например, у нас есть две таблицы **animals** и **species**.

### Таблица animals:

| name | specie_id |
| --- | --- |
| Buddy | 1 |
| Whiskers | 2 |
| Leo | 3 |
| Rex | 1 |

### Таблица species:

| id | icon | name |
| --- | --- | --- |
| 1 | 🐶 | Dog |
| 2 | 🐱 | Cat |

С помощью **LEFT JOIN** можем объединить таблицы и получить полную информацию о каждом животном, даже если у животного нет соответствующего вида.

### Примеры:

#### 1. Отобразить животных с иконками:

```sql
SELECT animals.name, species.icon
FROM animals
LEFT JOIN species ON animals.specie_id = species.id;
```

Результат:

| name | icon |
| --- | --- |
| Buddy | 🐶 |
| Whiskers | 🐱 |
| Leo | NULL |
| Rex | 🐶 |

Leo остался в результате, хотя вида с `id = 3` в таблице species нет: у него **пустое значение** `icon` — `NULL`.

#### 2. Вывести всех «Котов» (Cats):

```sql
SELECT animals.name, species.icon
FROM animals
LEFT JOIN species ON animals.specie_id = species.id
WHERE species.name = 'Cat';
```

Результат:

| name | icon |
| --- | --- |
| Whiskers | 🐱 |

#### 3. Вывести всех собак (Dogs) с иконками:

```sql
SELECT animals.name, species.icon
FROM animals
LEFT JOIN species ON animals.specie_id = species.id
WHERE species.name = 'Dog';
```

Результат:

| name | icon |
| --- | --- |
| Buddy | 🐶 |
| Rex | 🐶 |

#### 4. Тот же запрос через INNER JOIN:

```sql
SELECT animals.name, species.icon
FROM animals
INNER JOIN species ON animals.specie_id = species.id;
```

Результат:

| name | icon |
| --- | --- |
| Buddy | 🐶 |
| Whiskers | 🐱 |
| Rex | 🐶 |

**Leo исчез**: у него нет пары в таблице species, а **INNER JOIN** оставляет только строки, которым нашлась пара.

Каждый пример показывает, как **JOIN** позволяет расширять информацию из основной таблицы, добавляя данные из связанной таблицы.

## Питомцы и владельцы


Добро пожаловать в Токио! Ваша задача — вывести рядом с каждым питомцем информацию о его владельце. Если у питомца нет владельца, то строки не должны выводиться.

**animals**

| icon | name | specie | owner_id |
| --- | --- | --- | --- |
| 🐱 | Tama | Cat | 1 |
| 🐶 | Hachi | Dog | 2 |
| 🐦 | Tori | Bird | 3 |

**owners**

| id | name | age |
| --- | --- | --- |
| 1 | Yuki Tanaka | 34 |
| 2 | Kaito Suzuki | 28 |
| 3 | Ayumi Takahashi | 41 |

Выведите в результате следующие колонки под указанными именами: `animal_icon`, `animal_name`, `owner_name`. Сортировка не требуется.

## Питомец, владелец и адрес


В этой задаче мы будем работать с двумя таблицами: одна содержит информацию о животных, другая — об их владельцах. Нам нужно для каждого питомца, у которого есть владелец, вывести соответствующий адрес владельца. Если владельца нет, строка не должна выводиться.

**animals**

| icon | name | specie | owner_id |
| --- | --- | --- | --- |
| 🐱 | Tama | Cat | 1 |
| 🐶 | Hachi | Dog | 2 |
| 🐦 | Tori | Bird | 3 |

**owners**

| id | name | location |
| --- | --- | --- |
| 1 | Yuki Tanaka | Adachi |
| 2 | Kaito Suzuki | Minato |
| 3 | Ayumi Takahashi | Shibuya |

## Все животные из Минато


Выведите всех животных, которые живут в районе Минато, вместе с именем их владельца.

 Информацию о том, где находится животное можно получить из таблицы хозяев.

**Таблица Животные (animals)**

| icon | name | specie | owner_id |
| --- | --- | --- | --- |
| 🐱 | Tama | Cat | 1 |
| 🐶 | Hachi | Dog | 2 |
| 🐦 | Tori | Bird | 3 |

**Таблица Хозяева (owners)**

| id | name | location |
| --- | --- | --- |
| 1 | Yuki Tanaka | Adachi |
| 2 | Kaito Suzuki | Minato |
| 3 | Ayumi Takahashi | Shibuya |

## Вот мои собачки!


В этом задании мы работаем с двумя таблицами: одной для животных, другой для владельцев. В таблице животных нам нужно найти всех владельцев, у которых есть собаки.

**animals**

| icon | name | specie | owner_id | weight |
| --- | --- | --- | --- | --- |
| 🐱 | Tama | Cat | 1 | 4.2 |
| 🐶 | Hachi | Dog | 2 | 8.3 |
| 🐦 | Tori | Bird | 3 | 0.5 |

**owners**

| id | name | age | location |
| --- | --- | --- | --- |
| 1 | Yuki Tanaka | 34 | Adachi |
| 2 | Kaito Suzuki | 28 | Minato |
| 3 | Ayumi Takahashi | 41 | Shibuya |

Выведите информацию о владельцах в колонках: `name` (владелец), `age` (возраст). Сортировка не требуется. Используйте отношения (джойны или объединения) для объединения данных из таблиц.

## Все владельцы котов и кисок


В этом задании мы работаем с базой данных, которая содержит информацию о хозяевах и их питомцах. Вам нужно найти хозяев, у которых есть хотя бы один питомец - кот.

**animals**

| icon | name | specie | weight | owner_id |
| --- | --- | --- | --- | --- |
| 🐱 | Tama | Cat | 4.2 | 1 |
| 🐦 | Tori | Bird | 0.5 | 2 |
| 🐱 | Sora | Cat | 4.0 |  |

**owners**

| id | name | age |
| --- | --- | --- |
| 1 | Yuki Tanaka | 34 |
| 2 | Kaito Suzuki | 28 |
| 3 | Ayumi Takahashi | 41 |

## Кто раскормил кота?


В этом задании мы будем работать с таблицами, содержащими информацию о животных и их владельцах. Мы хотим найти владельцев котов, чья масса равна или превышает 4 килограмма.

**animals**

| icon | name | specie | weight | owner_id |
| --- | --- | --- | --- | --- |
| 🐱 | Tama | Cat | 4.2 | 1 |
| 🐦 | Tori | Bird | 0.5 | 2 |
| 🐱 | Sora | Cat | 4.0 |  |

**owners**

| id | name | age |
| --- | --- | --- |
| 1 | Yuki Tanaka | 34 |
| 2 | Kaito Suzuki | 28 |
| 3 | Ayumi Takahashi | 41 |

## Это большая собачка!


В этом задании мы работаем с базой данных, содержащей информацию о животных и их владельцах. Нам нужно найти владельцев собак, чей вес больше 10 килограмм.

**animals**

| icon | name | specie | owner_id | weight |
| --- | --- | --- | --- | --- |
| 🐱 | Tama | Cat | 1 | 4.2 |
| 🐶 | Hachi | Dog | 2 | 8.3 |
| 🐦 | Tori | Bird | 3 | 0.5 |

**owners**

| id | name | age | location |
| --- | --- | --- | --- |
| 1 | Yuki Tanaka | 34 | Adachi |
| 2 | Kaito Suzuki | 28 | Minato |
| 3 | Ayumi Takahashi | 41 | Shibuya |

Для выполнения задачи выведите информацию о владельцах в колонках `name`, `age`, `location`. Сортировка не требуется. Для получения результата используйте INNER JOIN для соединения таблиц и указывайте условия в секции WHERE.

## Ребята и зверята


В этом задании мы работаем с базой данных, содержащей информацию о животных и их владельцах.

**Таблица Животные (animals)**

| icon | name | specie | owner_id | weight |
| --- | --- | --- | --- | --- |
| 🐱 | Tama | Cat | 1 | 4.2 |
| 🐶 | Hachi | Dog | 2 | 8.3 |
| 🐦 | Tori | Bird | 3 | 0.5 |

**Таблица Владельцы (owners)**

| id | name | age | location |
| --- | --- | --- | --- |
| 1 | Yuki Tanaka | 34 | Adachi |
| 2 | Kaito Suzuki | 28 | Minato |
| 3 | Ayumi Takahashi | 41 | Shibuya |

Ваша задача — выбрать владельцев животных, вес которых строго меньше 2 кг.

## Мы живем в коробке!


В этом задании мы работаем с базой данных животных и их владельцев. Необходимо выбрать всех животных, у чьих хозяев не указан адрес проживания. Используйте для этого операторы `JOIN` и `IS NULL`. Сортировка не требуется.

**Таблица: animals**

| icon | name | specie | owner_id |
| --- | --- | --- | --- |
| 🐱 | Tama | Cat | 1 |
| 🐶 | Hachi | Dog | 2 |
| 🐦 | Tori | Bird | 3 |

**Таблица: owners**

| id | name | location |
| --- | --- | --- |
| 1 | Yuki Tanaka | Adachi |
| 2 | Kaito Suzuki | Minato |
| 3 | Ayumi Takahashi | Shibuya |

Выведите информацию в колонках `icon`, `name`, `specie`.
