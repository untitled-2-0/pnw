export const meta = {
  name: 'rebuild-pages',
  description: 'Rebuild/create each CRM page to satisfy the SRS, wiring to the finished core (window.CRM). Disjoint files per agent.',
  phases: [{ title: 'Build', detail: 'one agent per page, writing only its own file(s)' }],
}

const ROOT = 'C:\\Users\\mykha\\Documents\\pizzanw'
const ISO = 'an ISO timestamp produced by the browser Date object'

const CTX = `
You build pages for a CLIENT-ONLY static prototype "Pizza na Wypasie CRM" (Ukrainian UI, no backend).

STEP 1 — read these before writing (they define everything):
- ${ROOT}\\docs\\prototype-contract.md  (page skeleton, CANONICAL NAV to paste verbatim, window.CRM API, data shapes, conventions, CSS classes)
- ${ROOT}\\ingredients.html  and  ${ROOT}\\admin.html  (working reference pages — copy their structure/style)

HARD RULES:
- DO NOT edit src/app.js or src/styles.css — they are COMPLETE. Only Write your assigned page file(s).
- Paste the CANONICAL sidebar nav from the contract on every page, identical across pages (it includes Клієнти=customers.html and Доставки=customer-deliveries.html, and Поставки=deliveries.html as supplier stock-in).
- Reuse existing CSS classes; match the look of ingredients.html / admin.html. Do NOT invent a new visual style.
- Page-specific logic goes in ONE inline <script> placed AFTER the app.js script tag, using window.CRM. Guard with: if(!window.CRM)return;
- Everything in Ukrainian. Keep it a clickable localStorage prototype — no real network calls.
- The core auto-handles: active nav, auth gate, logout button + user chip injection, .search filtering, [data-filter] selects, [data-show-archived], row action buttons, and generic form submit (create/edit/validation/audit) for [data-entity] forms WITHOUT data-custom-submit. Do not duplicate these.
- For complex forms (recipes/orders/customerDeliveries) set data-custom-submit="true", bind your own submit that calls CRM.upsert(entity,obj), and listen for the "crm:edit" event on the form to repopulate dynamic parts when a row's Редагувати is clicked. For timestamps in your inline browser script, use ${ISO}.
- When a page ALREADY exists with working data-* hooks, READ it first and PRESERVE every existing hook; change only what your task requires.
- Verify your inline JS is syntactically valid and the HTML is well-formed before finishing.

Return the JSON summary.
`

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    page: { type: 'string' },
    files: { type: 'array', items: { type: 'string' } },
    acsCovered: { type: 'array', items: { type: 'string' } },
    usesInlineScript: { type: 'boolean' },
    notes: { type: 'string' },
    coreGapsNeeded: { type: 'string', description: 'anything you needed from the core that was missing, or "none"' },
  },
  required: ['page', 'files', 'acsCovered', 'usesInlineScript', 'notes', 'coreGapsNeeded'],
}

const MODULES = [
  {
    key: 'dashboard',
    label: 'dashboard.html',
    spec: `Rebuild ${ROOT}\\dashboard.html (data-driven). Satisfy DASH-1..4:
- DASH-1: KPI cards in a .grid.kpi computed from CRM.dashboardData(period): "Замовлення сьогодні" (todayOrders), "Доставки в очікуванні" (pendingDeliveries), "Низький залишок" (lowCount), "Вартість залишків/списань" (CRM.money(leftoversValue)). You may ALSO keep "Виторг" and "Середній чек" (revenue, aov) as extra cards.
- DASH-2: a .segmented period control [Сьогодні|7 днів|30 днів] PLUS a custom range (two date inputs); on change, recompute KPIs and redraw a .chart.dynamic bar chart of revenue/orders over the series (scale bars to max). Provide both a revenue and an orders chart (or one chart with a toggle). The toggles MUST actually update the numbers/bars.
- DASH-3: an alerts .notice panel listing real low-stock items (CRM.lowStock()) and any delayed customer deliveries (customerDeliveries with scheduledDate before today and status not Доставлено/Невдало), each linking to the relevant page (ingredients.html / customer-deliveries.html).
- DASH-4: quick-action buttons "Нове замовлення"->orders.html, "Додати інгредієнт"->ingredients.html, "Новий рецепт"->recipes.html.
- Keep a "Топ-5 піц" panel computed from orders if you like (extra). Remove any hardcoded user chip in the topbar (the core injects one). Use the canonical nav.`,
  },
  {
    key: 'recipes',
    label: 'recipes.html',
    spec: `Rebuild ${ROOT}\\recipes.html. Satisfy REC-1..5 (READ the current file first; KEEP the "Базові правила рецептів" data-entity="recipeRules" and "Правила модифікаторів" data-entity="modifierRules" sections and their tables as-is — they are valuable extras).
- The "Активні піци" table: <tbody data-table="recipes"> with thead: Піца, Категорія, Ціна, Собівартість/порція, Маржа, Порції, Склад, Дії (8 columns — the core renderer outputs these incl. actions).
- Recipe form: data-custom-submit="true". Fields: name (required), category, price (required), portions, instructions (textarea), and a DYNAMIC ingredient list (.item-rows of .item-row): each row = ingredient <select> populated from CRM.read('ingredients') names + qty input + unit input + remove button; plus an "Додати інгредієнт" button to add rows. (REC-1)
- Show a live .cost-readout that recomputes on any change using CRM.computeRecipeCost({price,portions,items}) showing Собівартість, Собівартість/порція, Маржа (value + %). (REC-2)
- On submit: build {name,category,price,portions,instructions,items:[{ingredient,qty,unit}]} and CRM.upsert('recipes',obj); reset the dynamic rows. Listen for "crm:edit" to repopulate name/category/price/portions/instructions AND rebuild the dynamic item rows from the edited recipe's items (REC-3 edit). Duplicate + archive come from the core row actions (REC-3). (REC-4 stock deduction is handled by orders via the core; REC-5 breakdown = the populated form + the Склад column.)`,
  },
  {
    key: 'orders',
    label: 'orders.html',
    spec: `Rebuild ${ROOT}\\orders.html. Satisfy ORD-1..5 (READ current file first; KEEP the "API синхронізація" card and its data-api-*/data-sync-orders/data-auto-sync-orders hooks as an extra feature).
- Orders table: <tbody data-table="orders"> with thead: №, Клієнт, Позиції, Сума, Дата, Доставка, Статус, Джерело, Дії (9 cols; core renderer outputs these incl. Деталі + actions).
- Order form: data-custom-submit="true". Fields: number (prefill next number), customer <select> from CRM.read('customers') PLUS an "+ Новий клієнт" option that reveals name/contact inputs, orderDate (date, default today), deliveryDate (date), DYNAMIC line items (.item-rows): recipe <select> from CRM.read('recipes') + qty; auto-fill each item price from the recipe.price; show a live total = sum of price*qty. notes (textarea). status <select> = CRM.ORDER_STATUSES. (ORD-1, ORD-2)
- On submit: if new customer typed, CRM.upsert('customers',{name,contact,address}); build {number, customerName, customerContact, orderDate, deliveryDate, items:[{recipe,qty,price}], total, notes, status, source:'Локально'} and CRM.upsert('orders',obj). Listen for "crm:edit" to repopulate including line items.
- Filters: a <select data-filter> of statuses (Усі + CRM.ORDER_STATUSES) and search (auto). (ORD-4)
- ORD-3 cancel: provide a way to cancel an order requiring a reason (window.prompt) -> CRM.setOrderStatus(id,'Скасовано') (the core restocks). Edit is via core row action.
- ORD-5: listen for the "crm:order-detail" event (core dispatches it when "Деталі" is clicked) and render a detail panel showing the order, a status .timeline from statusHistory, the linked customer delivery (search CRM.read('customerDeliveries') for orderIds incl. this id), and buttons to advance status via CRM.setOrderStatus(id, nextStatus).`,
  },
  {
    key: 'customers',
    label: 'customers.html (NEW)',
    spec: `Create ${ROOT}\\customers.html (new page; canonical nav with Клієнти active). Satisfy the Customer entity (ORD-1/section 12).
- Table: <tbody data-table="customers"> with thead: Імʼя, Контакт, Адреса, Замовлень, Дії (core renderer outputs these incl. count + actions).
- Simple form data-entity="customers": name (required), contact, address. (Core handles create/edit/validate/audit/archive.)
- Add search (placeholder "Пошук клієнта"), a [data-show-archived] toggle, and [data-result-count]. Page head title "Клієнти".`,
  },
  {
    key: 'customerDeliveries',
    label: 'customer-deliveries.html (NEW)',
    spec: `Create ${ROOT}\\customer-deliveries.html (new page; canonical nav with Доставки active). Satisfy DEL-1..4 (CUSTOMER delivery fulfilment — distinct from supplier "Поставки").
- Table: <tbody data-table="customerDeliveries"> thead: Замовлення, Курʼєр, Адреса, Дата/вікно, Статус, Дії (core renderer outputs these incl. "Далі ->" advance + actions).
- Form: data-custom-submit="true". Fields: order <select> from CRM.read('orders') (label "#number — customerName"); driver (Курʼєр) input; address input (auto-fill from the order's customer address when an order is picked, but editable); scheduledDate (date); window (time-window <select>: 12:00-14:00, 14:00-16:00, 16:00-18:00, 18:00-20:00, 20:00-22:00); status <select> = CRM.DELIVERY_STATUSES (default Заплановано). On submit build {orderLabel:'#'+number, orderIds:[orderId], driver, address, scheduledDate, window, status, statusHistory:[{status, at: ${ISO}}]} and CRM.upsert('customerDeliveries',obj). (DEL-1)
- DEL-2 status workflow: the core "Далі ->" action calls CRM.advanceDelivery (Заплановано->У дорозі->Доставлено/Невдало) and reflects status onto the linked order. Also offer a "Невдало" button per row in your board (call CRM.update('customerDeliveries',id,{status:'Невдало', outcomeAt: ${ISO}})).
- DEL-3 board: render a .kanban with one .column per status (Заплановано / У дорозі / Доставлено / Невдало); each .order-card shows order label, driver, address, date+window. Add a date input filter and a driver <select data-filter> and a status <select data-filter>.
- DEL-4 outcome: provide an outcome notes input + "Зберегти результат" that does CRM.update with outcomeNotes+outcomeAt; failed deliveries can be rescheduled via the core edit (changing scheduledDate). Build the board in an inline script that re-renders on changes (re-read CRM.read('customerDeliveries') and rebuild the board after action clicks).`,
  },
  {
    key: 'reports',
    label: 'reports.html',
    spec: `Rebuild ${ROOT}\\reports.html. Satisfy RPT-1..5 using CRM.reportData(period).
- A .segmented period control [7 днів|30 днів] + custom date range; recompute on change.
- WORKING tabs (.segmented with data-tab buttons + [data-pane] sections; inline JS toggles .active and shows the matching pane). Tabs:
  1) Виторг (RPT-1): orders count, revenue, average order value (aov) as KPI cards + a revenue bar chart from series + a "за рецептом" breakdown table from reportData.byRecipe.
  2) Використання (RPT-2): ingredient plan-vs-fact table from reportData.usage (item, plan, fact, різниця).
  3) Маржа: table of recipes with price, cost/portion, margin from CRM.read('recipes')+CRM.computeRecipeCost.
  4) Втрати (RPT-3): waste by reason and by item (value) from reportData.wasteByReason/wasteByItem.
  5) Доставки (RPT-4): delivered vs failed counts + on-time rate from reportData.delivery.
- RPT-5: an export button per visible report calling CRM.exportReportCsv(name, rowsArray, headers) with the current data. Keep the topbar PDF/Excel buttons but make Excel call a real CSV export of the active tab.`,
  },
  {
    key: 'writeoffs',
    label: 'write-offs.html',
    spec: `Edit ${ROOT}\\write-offs.html. READ the current file FIRST and PRESERVE every existing hook exactly: data-writeoff-form, data-entity="writeoffs", data-inventory-item-select, data-custom-inventory-item, data-writeoff-qty, data-current-stock, data-after-stock, data-writeoff-warning, data-export/data-import="writeoffs", data-table="writeoffs", and the impact-preview UI. Only make these changes:
- Update the sidebar to the CANONICAL nav.
- STK-2: add an explicit date field <input type="date" name="date"> (default today) to the write-off form, and add reasons "Надлишок" (surplus) and "Повернення" (returned) to the reason <select> (keep existing reasons).
- STK-3: add a small "Втрати за період" panel — a period <select> (7/30 днів) and a computed total leftover VALUE over that period (sum parseQuantity(qty).amount * ingredient cost for writeoffs whose createdAt is within the period). Compute in an inline script using CRM.read('writeoffs') and CRM.read('ingredients'); update on period change.
- Do not break the existing confirm-before-write-off flow (handled by core).`,
  },
  {
    key: 'inventory',
    label: 'inventory.html',
    spec: `Edit ${ROOT}\\inventory.html. READ the current file FIRST and PRESERVE all data-daily-* hooks and the daily-stock workspace exactly (data-daily-stock-table, data-daily-date, data-daily-mode, data-daily-filter, data-close-shift, data-predict-usage, data-daily-summary, data-daily-mode-label, etc.). ONLY change: update the sidebar to the CANONICAL nav, and update any "Поставки" quick link/button to point to deliveries.html. Do not alter the daily-stock logic or markup hooks.`,
  },
  {
    key: 'deliveries',
    label: 'deliveries.html (supplier)',
    spec: `Edit ${ROOT}\\deliveries.html (this is SUPPLIER goods-receiving = stock-in, STK-4 — KEEP it that way). READ the current file FIRST and PRESERVE all hooks: data-entity="deliveries", data-update-stock, data-post-deliveries, data-delivery-template, data-table="deliveries", data-export/data-import="deliveries". ONLY change: update the sidebar to the CANONICAL nav; clarify the page heading/eyebrow that this is "Поставки від постачальників (приймання на склад)"; optionally add <p data-import-summary="deliveries" hidden></p>. Do not change the receiving logic.`,
  },
  {
    key: 'alerts',
    label: 'alerts.html',
    spec: `Rebuild ${ROOT}\\alerts.html as a data-driven notifications screen (NOTIF-1), using the standard layout + CANONICAL nav. In an inline script build alert cards from real data:
- Low stock: CRM.lowStock() -> card per item with "Створити замовлення постачальнику"->deliveries.html.
- Прострочення/термін: supplier deliveries (CRM.read('deliveries')) with expiry within 3 days of today -> card with "Списати"->write-offs.html.
- Невдалі доставки: CRM.read('customerDeliveries') status Невдало -> card ->customer-deliveries.html.
- Нові замовлення: CRM.read('orders') status Нове -> card ->orders.html.
- A "Налаштування сповіщень" card reading CRM.settings() (in-app/email/push/quiet hours) with a "Тестове сповіщення" button (data-toast). Keep a "Назад"->dashboard.html link.`,
  },
  {
    key: 'profile',
    label: 'profile.html',
    spec: `Rebuild ${ROOT}\\profile.html with the standard layout + CANONICAL nav. Show the current session (CRM.session(): name, email, loginAt via CRM.formatDateTime), a demo "Змінити пароль" form (data-toast on submit, no real effect), a language <select data-language-select>, and a "Вийти" button (data-logout). Keep it simple.`,
  },
  {
    key: 'auth',
    label: 'login.html + forgot-password.html',
    spec: `Two files:
1) Create ${ROOT}\\login.html as a copy of ${ROOT}\\index.html (READ index.html first and replicate it) so links to login.html resolve (currently 404). Keep the same .auth-form form (the core intercepts submit to set the session and go to dashboard.html).
2) Edit ${ROOT}\\forgot-password.html: READ it first, keep the auth layout, ensure the reset form (a) has an email field, (b) on submit does event.preventDefault + a toast "Лист для відновлення надіслано" (inline script or data-toast), and (c) has a link back to index.html ("Повернутись до входу"). It must remain reachable without login (it is a public page).`,
  },
]

phase('Build')

const results = await parallel(
  MODULES.map((m) => () =>
    agent(`${CTX}\n\n=== YOUR PAGE: ${m.label} ===\n${m.spec}`, {
      label: `build:${m.key}`,
      phase: 'Build',
      schema: SCHEMA,
    })
  )
)

return results.filter(Boolean)
