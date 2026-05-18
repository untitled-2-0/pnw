# Data Model

## Ingredient

- id
- name
- category
- unit: g | кг | ml | l | шт
- currentStock
- minStock
- costPerUnit
- supplier

## Recipe

- id
- pizzaName
- size
- ingredients: ingredientId + quantity
- активний

## Stock Movement

- id
- type: purchase | usage | waste | correction
- ingredientId
- quantity
- reason
- createdBy
- createdAt

## Адміністратор User

- id
- name
- email
- role
- branchId
- активний

## Permission Groups

- inventory.view
- inventory.edit
- recipe.view
- recipe.edit
- usage.create
- purchase.create
- reports.view
- users.manage
- roles.manage
- settings.manage
