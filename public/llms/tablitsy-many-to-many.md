# Таблицы Many To Many


## Связи Many To Many


Таблицы связи Many To Many помогают моделировать отношения, где одна запись из таблицы A может быть связана с несколькими записями из таблицы B, и наоборот. Например, у нас есть таблицы животных и еды. Каждое животное может есть несколько видов еды, и каждый вид еды может быть съеден несколькими животными.

Имеем таблицы:

**animals** — список животных:

| id | icon | specie |
| --- | --- | --- |
| 1 | 🐶 | Dog |
| 2 | 🐱 | Cat |
| 3 | 🦁 | Lion |
| 4 | 🐵 | Monkey |
| 5 | 🐻 | Nikita |

**food** — список еды:

| id | icon | name |
| --- | --- | --- |
| 1 | 🥩 | Steak |
| 2 | 🐟 | Fish |
| 3 | 🍌 | Banana |
| 4 | 🥕 | Carrot |
| 5 | 🌽 | Corn |

**animals_food** — связи между животными и едой:

| animal_id | food_id |
| --- | --- |
| 1 | 1 |
| 1 | 2 |
| 2 | 2 |
| 3 | 1 |
| 4 | 3 |
| 5 | 5 |

### Запросы и результаты:

#### Все, что ест животное Кошка:

```sql
SELECT food.icon, food.name FROM animals
JOIN animals_food ON animals.id = animals_food.animal_id
JOIN food ON food.id = animals_food.food_id
WHERE animals.specie = 'Cat';
```

Результат:

```sql
🐟 Fish
```

#### Все, кто ест рыбу:

```sql

```sql
SELECT animals.icon, animals.specie FROM food
JOIN animals_food ON food.id = animals_food.food_id
JOIN animals ON animals.id = animals_food.animal_id
WHERE food.name = 'Fish';
```

```

Результат:

```sql
🐶 Dog
🐱 Cat
```

#### Еда, которую никто не ест:

```sql

```sql
SELECT food.icon, food.name FROM food
LEFT JOIN animals_food ON food.id = animals_food.food_id
WHERE animals_food.food_id IS NULL;
```

```

Результат:

```sql
🥕 Carrot
🌽 Corn
```

#### Что ест каждое животное (конкатенация иконок):

```sql

```sql
SELECT animals.icon, animals.specie, GROUP_CONCAT(food.icon) as foods
FROM animals
JOIN animals_food ON animals.id = animals_food.animal_id
JOIN food ON food.id = animals_food.food_id
GROUP BY animals.id;
```

```

Результат:

```sql
🐶 Dog       🥩🐟
🐱 Cat       🐟
🦁 Lion      🥩
🐵 Monkey    🍌
🐻 Никита    🌽
```

PS: А чтобы быть на связи с автором тренажера, подпишитесь на  [телеграм-канал](https://t.me/kushedowish)!

## Что ты туда кладешь? ⚡️


В этом задании мы работаем с базой данных рецептов и ингредиентов. Каждому рецепту соответствует несколько ингредиентов, а каждый ингредиент может быть частью нескольких рецептов.

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

Выведите все ингредиенты, используемые в рецепте Moussaka. Используйте JOIN для соединения таблиц и WHERE для фильтра по нужному рецепту. Выведите результаты с колонками `icon` и `name`. Сортировка не требуется.

## Количество ингредиентов ⚡️


Для выполнения этой задачи мы будем работать с базой данных, включающей рецепты и продукты, используемые в них. Посчитайте количество продуктов в каждом рецепте из таблицы `recipes ` и выведите информацию в колонках `name` и `count`.

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

## Картинки для рецептов ⚡️


В этом задании мы работаем с рецептами и используем таблицы, чтобы подсчитать количество продуктов, необходимых для каждого рецепта. Выведите напротив каждого рецепта в виде иконок какие продукты для него нужны (🍅 + 🍗 + 🥛 ) . Для этого используйте функцию агрегации `STRING_AGG( колонка, ' + ')` и группировку.

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

## Кто просил молоко ⚡️


Выведите информацию о рецептах, в которых используется продукт 'Milk'. Необходимо вывести колонки под именем: `name` для названия рецепта и `kitchen` для типа кухни.

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

## Где используются продукты? ⚡️


Рассчитайте количество рецептов для каждого продукта, в которых он используется. Выведите результат в колонках `icon`, `product` и `recipes`

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

## Все рецепты с продуктом ⚡️


Для каждого продукта выведите список рецептов, в которых он используется. Объедините названия рецептов в одну строку через запятую. Для объединения используйте STRING_AGG

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

## Где любят Базилик? ⚡️


**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

Ваша задача — вывести для каждого продукта через рецепты список кухонь, где он используется. Используйте оператор `STRING_AGG` для соединения строк.

## Продукты итальянской кухни ⚡️


Задача - найти все продукты, которые используются в итальянской кухне. Каждое блюдо может включать несколько продуктов, а продукты могут быть использованы в разных рецептах.

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

Вам нужно вывести уникальные продукты, которые используются в рецептах итальянской кухни. Выведите информацию в колонках `icon` и `product`.

## Стоимость приготовления ⚡️


**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name | price |
| --- | --- | --- | --- |
| 1 | 🍅 | Tomato | 120 |
| 2 | 🥛 | Milk | 40 |
| 3 | 🍗 | Chicken Breast | 200 |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |

Ваша задача — вычислить стоимость каждого рецепта, суммируя цены продуктов.

## Средняя стоимость рецепта ⚡️


Давайте рассчитаем среднюю стоимость рецепта. Стоимость рецепта определяется как сумма всех связанных со всеми рецептами продуктов, затем результат делится на количество рецептов

Чтобы решить задачу, выполните JOIN продуктов к рецептам. Вы получите таблицу, в которой каждый продукт встречается столько раз, сколько oн упомянут в рецептах, просуммируйте все цены (price) без группировки продуктов. Затем поделите на количество уникальных рецептов (DISTINCT(recipes.id)

**recipes**

| id | name | kitchen | time |
| --- | --- | --- | --- |
| 1 | Spaghetti Bolognese | italian | 45 |
| 2 | Butter Chicken | indian | 60 |
| 3 | Szechuan Chicken | chinese | 40 |

**products**

| id | icon | name |
| --- | --- | --- |
| 1 | 🍅 | Tomato |
| 2 | 🥛 | Milk |
| 3 | 🍗 | Chicken Breast |

**recipes_products**

| product_id | recipe_id |
| --- | --- |
| 1 | 1 |
| 3 | 1 |
| 12 | 1 |
