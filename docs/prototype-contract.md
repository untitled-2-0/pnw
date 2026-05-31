# Prototype build contract (read before editing any page)

This is a **client-only** static prototype (no backend). Shared logic lives in `src/app.js`
and is **DONE — DO NOT EDIT `src/app.js` or `src/styles.css`**. Pages wire themselves to the
core via `data-*` attributes and the global `window.CRM` API, plus a small inline `<script>`
for page-specific logic. UI language is **Ukrainian**.

## 1. Page skeleton (every screen)

```html
<!doctype html>
<html lang="uk">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PAGE | Pizza na Wypasie CRM</title><link rel="stylesheet" href="src/styles.css" /></head>
  <body>
    <div class="app-layout">
      <aside class="sidebar">
        <a class="app-brand" href="dashboard.html"><div class="brand-mark">PW</div><div><strong>Pizza na Wypasie</strong><span>Адмінська CRM</span></div></a>
        <div class="nav-section">Адмін-панель</div>
        <!-- CANONICAL NAV (paste exactly, all pages identical) -->
        <nav class="side-nav" aria-label="Основна навігація">
          <a data-nav href="dashboard.html"><span class="nav-icon">DB</span>Дашборд</a>
          <a data-nav href="inventory.html"><span class="nav-icon">SK</span>Склад</a>
          <a data-nav href="ingredients.html"><span class="nav-icon">IN</span>Інгредієнти</a>
          <a data-nav href="recipes.html"><span class="nav-icon">RC</span>Рецепти</a>
          <a data-nav href="deliveries.html"><span class="nav-icon">PS</span>Поставки</a>
          <a data-nav href="orders.html"><span class="nav-icon">OR</span>Замовлення</a>
          <a data-nav href="customers.html"><span class="nav-icon">CL</span>Клієнти</a>
          <a data-nav href="customer-deliveries.html"><span class="nav-icon">DL</span>Доставки</a>
          <a data-nav href="write-offs.html"><span class="nav-icon">WO</span>Списання</a>
          <a data-nav href="reports.html"><span class="nav-icon">RP</span>Звіти</a>
          <a data-nav href="admin.html"><span class="nav-icon">ST</span>Налаштування</a>
        </nav>
      </aside>
      <div>
        <header class="topbar">
          <input class="search" type="search" placeholder="Пошук..." />
          <div class="topbar-actions"><!-- page action buttons; core auto-injects user chip + "Вийти" --></div>
        </header>
        <main class="content"><!-- page content --></main>
      </div>
    </div>
    <div class="toast" role="status"></div>
    <script src="src/app.js?v=rebuild-1"></script>
    <!-- optional page-specific inline <script> AFTER app.js, using window.CRM -->
  </body>
</html>
```

- Active nav highlight, the auth gate, the logout button, the user chip, search, and `[data-filter]`
  wiring are ALL handled by the core automatically. Do not re-implement them.
- The `.search` input is auto-wired: it filters rows of any `[data-table]` on the page by text.
- `<select data-filter>` is auto-wired: value (other than `all`/empty) hides rows whose
  `data-tags`/text don't contain it. Add `data-tags` is already emitted by core renderers.

## 2. Entities, render targets, and forms

Render a table by giving a `<tbody data-table="ENTITY">`. The core fills it (with an actions
column for ingredients/recipes/orders/users/customers/customerDeliveries) and re-applies filters.

Two kinds of add/edit forms:
- **Simple form** — `<form class="card form-stack" data-entity="ENTITY">` with `<input name="...">`
  fields. Core handles submit: validation (`required` fields), create OR update (if editing),
  audit, toast, re-render. Use for: `ingredients`, `users`, `customers`, `deliveries` (supplier),
  `writeoffs`, `recipeRules`, `modifierRules`.
- **Custom form** — add `data-custom-submit="true"`. Core renders the table and fills native
  fields on edit, but YOU bind submit in an inline script and call `CRM.upsert("ENTITY", obj)`.
  Use when the form has dynamic rows or computed fields: `recipes`, `orders`, `customerDeliveries`.
  Listen for the `crm:edit` event on the form to populate dynamic parts when the user clicks a
  row's "Редагувати": `form.addEventListener("crm:edit", e => { /* e.detail is the row */ });`

Helpers you can drop in:
- `<span data-result-count></span>` — core writes "Показано: N / M".
- `<p data-import-summary="ENTITY" hidden></p>` — core writes the CSV import created/updated/skipped summary.
- `<label class="check-row"><input type="checkbox" data-show-archived> Архівні</label>` — toggles archived rows.
- Export/import buttons: `<button data-export="ENTITY">` and `<label>...<input type="file" data-import="ENTITY" hidden></label>`.

## 3. window.CRM API (use in inline scripts)

```
CRM.read(entity) -> array            CRM.byId(entity, id) -> row
CRM.upsert(entity, obj) -> {obj,created}   (insert if no id/unknown id, else update; audits + re-renders)
CRM.update(entity, id, patch)        CRM.archive(entity, id, bool)   CRM.remove(entity, id)
CRM.renderEntity(entity)             CRM.audit(entity, id, action, detail)
CRM.money(v) -> "12,34 zł"           CRM.num(v)   CRM.formatDate(v)   CRM.formatDateTime(v)
CRM.settings() -> {currency, locale, ...}   CRM.saveSettings(patch)
CRM.session() -> {name,email} | null        CRM.logout()
CRM.computeRecipeCost(recipe) -> {total, perPortion, margin, marginPct}
CRM.setOrderStatus(orderId, status)  // logs history; deducts stock at "У виробництві", restocks at "Скасовано"
CRM.advanceDelivery(deliveryId)      // Заплановано→У дорозі→Доставлено/Невдало; reflects onto linked orders
CRM.dashboardData(period) -> {todayOrders, pendingDeliveries, lowCount, lowItems, leftoversValue, revenue, aov, ordersCount, series:[{date,orders,revenue}]}   // period "7d"|"30d"
CRM.reportData(period) -> dashboardData + {byRecipe:{name:revenue}, usage:[{item,plan,fact,unit}], wasteByReason:{}, wasteByItem:{}, delivery:{delivered,failed,total}}
CRM.exportReportCsv(name, rowsArray, headersArray)
CRM.lowStock() -> ingredients at/below min     CRM.snapshot(itemName) -> {amount, unit, display}
CRM.ORDER_STATUSES = ["Нове","Підтверджено","У виробництві","Готово","У доставці","Доставлено","Скасовано"]
CRM.DELIVERY_STATUSES = ["Заплановано","У дорозі","Доставлено","Невдало"]
CRM.toNumber(v)   CRM.parseQuantity("12 кг") -> {amount, unit}   CRM.uid(prefix)
```

## 4. Data shapes (localStorage; ids auto-assigned)

- ingredient: `{id, name, category, unit, stock, min, cost, supplier, archived?}`
- recipe: `{id, name, category, price, portions, instructions, items:[{ingredient, qty, unit}], archived?}`
- order: `{id, number, customerName, customerContact, orderDate, deliveryDate, items:[{recipe, qty, price}], total, notes, status, source, statusHistory:[{status, at}], stockDeducted?}`
- customer: `{id, name, contact, address, archived?}`
- customerDeliveries: `{id, orderLabel, orderIds:[id], driver, address, scheduledDate, window, status, outcomeNotes, outcomeAt?, statusHistory:[{status, at}], archived?}`
- writeoffs: `{id, item, qty, reason, comment, author, createdAt, before, after, status}`
- deliveries (SUPPLIER stock-in, keep): `{id, supplier, invoice, item, qty, expiry, postedAt}`
- users: `{id, name, email, access, status, archived?}`

## 5. Design-system classes (already in styles.css)

Layout: `.app-layout .sidebar .topbar .topbar-actions .content`. Cards: `.card .table-card .mini-card
.kpi-card .notice`. Heads: `.page-head .page-title .card-head .table-head`. Grids: `.grid.kpi
.grid.two .grid.three`. Forms: `.form-stack .form-row .field .check-row`. Buttons: `.btn .btn.primary
.btn.ghost .btn.danger .btn.xs`. Status/labels: `.status.ok/.warn/.danger/.info`, `.tag.success/...`,
`.badge`, `.eyebrow`, `.muted-line`, `.metric-label`, `.trend`/`.trend.down`. Data viz: `.chart`
(7-col) / `.chart.dynamic` (auto-fit) with `<span class="bar">`/`.bar.alt` (use inline `height:%`).
Board: `.kanban .column .order-card`. Other: `.segmented` (tabs), `.timeline .timeline-item`,
`.recipe-grid .recipe-item`, `.settings-layout .settings-menu`, `.list .list-row`, `.progress`,
`.filters`, `.item-rows .item-row`, `.cost-readout`.

## 6. Tabs / charts patterns

- Segmented tabs: `<div class="segmented"><button class="active" data-tab="x">..</button>..</div>` then
  inline JS toggles `.active` and shows/hides `[data-pane="x"]`. (No core helper — wire it in the page.)
- Bar chart: `<div class="chart dynamic">` + N `<span class="bar" style="height:NN%"></span>`. Build
  bars in inline JS from `CRM.dashboardData(period).series` (scale to the max value).
