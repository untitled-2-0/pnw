const currentPage = window.location.pathname.split("/").pop() || "index.html";

const initialData = {
  orders: [
    {
      externalId: "demo-1052",
      number: "1052",
      pizza: "Сирний шал x2",
      additionals: "Соус часниковий, подвійний сир",
      price: "73.98",
      parameters: "Із собою, без цибулі",
      status: "Нове",
      source: "Локально",
      syncedAt: ""
    },
    {
      externalId: "demo-1048",
      number: "1048",
      pizza: "Піца Гриль x1",
      additionals: "Гострий соус окремо",
      price: "36.99",
      parameters: "Зал, стіл 4",
      status: "В роботі",
      source: "Локально",
      syncedAt: ""
    },
    {
      externalId: "demo-1050",
      number: "1050",
      pizza: "Кальцоне x1",
      additionals: "Без додатків",
      price: "38.99",
      parameters: "Доставка, списано за рецептом",
      status: "Готово",
      source: "Локально",
      syncedAt: ""
    }
  ],
  ingredients: [
    { name: "Моцарела", category: "Сир", unit: "кг", stock: "22.5", min: "12", supplier: "Сир і молочні продукти" },
    { name: "Пепероні", category: "М'ясо", unit: "кг", stock: "5.8", min: "8", supplier: "М'ясний двір" },
    { name: "Томатний соус", category: "Соуси", unit: "л", stock: "14.2", min: "10", supplier: "Соуси Польща" }
  ],
  recipes: [
    { name: "Піца Гриль", price: "36.99", cost: "13.20", ingredients: "Тісто 1 шт; моцарела 140 г; ковбаса 90 г" },
    { name: "Куряча BBQ", price: "38.49", cost: "14.80", ingredients: "Тісто 1 шт; курка 110 г; соус BBQ 70 мл" }
  ],
  recipeRules: [
    { pizza: "Pizza Grill", ingredient: "Ser Mozzarella", qty: "0.14", unit: "кг", match: "pizza grill|гриль" },
    { pizza: "Pizza Grill", ingredient: "Ciasto ŚREDNIE 375 G", qty: "1", unit: "шт", match: "pizza grill|гриль" },
    { pizza: "Kurczak BBQ", ingredient: "Kurczak Filet", qty: "0.11", unit: "кг", match: "kurczak|chicken|кур" },
    { pizza: "Kurczak BBQ", ingredient: "Sos BBQ", qty: "0.07", unit: "л", match: "bbq" },
    { pizza: "Serowa", ingredient: "Ser Mozzarella", qty: "0.18", unit: "кг", match: "serowa|сир" }
  ],
  modifierRules: [
    { keyword: "подвійний сир|double cheese|2x ser|podwojny ser", ingredient: "Ser Mozzarella", mode: "add", qty: "0.10", note: "додає ще 100 г сиру" },
    { keyword: "+30%|plus 30|mega plus", ingredient: "Ser Mozzarella", mode: "multiply", qty: "0.30", note: "додає 30% до базового інгредієнта" },
    { keyword: "додаткова курка|extra chicken|dodatkowy kurczak", ingredient: "Kurczak Filet", mode: "add", qty: "0.12", note: "додає 120 г курки" },
    { keyword: "гострий соус|sos ostry", ingredient: "Sos Ostry", mode: "add", qty: "0.03", note: "додає 30 мл гострого соусу" }
  ],
  users: [
    { name: "Анастасія", email: "admin@pizza.test", access: "Повний доступ", status: "Активний" },
    { name: "Іра", email: "ira@pizza.test", access: "Склад і поставки", status: "Активний" }
  ],
  deliveries: [
    { supplier: "Сир і молочні продукти", invoice: "FV/2026/0518", item: "Моцарела", qty: "12 кг", expiry: "2026-05-21", postedAt: "" }
  ],
  writeoffs: [
    {
      item: "Ser Mozzarella",
      qty: "0.8 кг",
      reason: "Термін придатності",
      comment: "Партія MZ-18",
      author: "Іра",
      createdAt: "2026-05-18T12:10:00",
      before: "128",
      after: "127.2",
      status: "проведено"
    }
  ],
  dailyStock: [
    { item: "Ciasto MINI 260G", unit: "шт", start: "72", delivery: "0", predicted: "18", end: "51" },
    { item: "Ciasto MEGA 1000 G", unit: "шт", start: "39", delivery: "0", predicted: "3", end: "36" },
    { item: "Ciasto WYPAS 575 G", unit: "шт", start: "80", delivery: "0", predicted: "27", end: "53" },
    { item: "Ciasto ŚREDNIE 375 G", unit: "шт", start: "95", delivery: "0", predicted: "21", end: "74" },
    { item: "Ser Mozzarella", unit: "кг", start: "128", delivery: "0", predicted: "19.6", end: "108.4" },
    { item: "Sos Pomidorowy", unit: "л", start: "22.445", delivery: "0", predicted: "4.735", end: "17.71" },
    { item: "SOS CZOSNKOWY", unit: "л", start: "15", delivery: "0", predicted: "0", end: "15" },
    { item: "Sos Ostry", unit: "л", start: "7", delivery: "0", predicted: "1.195", end: "5.805" },
    { item: "Sos Serowy", unit: "л", start: "11.27", delivery: "0", predicted: "0.82", end: "10.45" },
    { item: "SZYNKA", unit: "кг", start: "28.93", delivery: "0", predicted: "1.94", end: "26.99" },
    { item: "BOCZEK", unit: "кг", start: "32.3", delivery: "0", predicted: "1.42", end: "30.88" },
    { item: "SALAMI", unit: "кг", start: "39.235", delivery: "0", predicted: "3.235", end: "36" },
    { item: "Kurczak Filet", unit: "кг", start: "5.305", delivery: "8", predicted: "3.605", end: "9.7" },
    { item: "CEBULA", unit: "кг", start: "9.145", delivery: "4", predicted: "1.145", end: "12" },
    { item: "PIECZARKI", unit: "кг", start: "13.91", delivery: "0", predicted: "1.66", end: "12.25" },
    { item: "PEPSI COLA 0.85L", unit: "шт", start: "76", delivery: "0", predicted: "0", end: "76" },
    { item: "Woda Gazowana", unit: "шт", start: "81", delivery: "0", predicted: "0", end: "81" }
  ],
  inventoryItems: [
    { name: "Ciasto MINI 260G", unit: "шт" },
    { name: "Ciasto MEGA 1000 G", unit: "шт" },
    { name: "Ciasto WYPAS 575 G", unit: "шт" },
    { name: "Ciasto ŚREDNIE 375 G", unit: "шт" },
    { name: "Ser Mozzarella", unit: "кг" },
    { name: "Sos Pomidorowy", unit: "л" },
    { name: "SOS CZOSNKOWY", unit: "л" },
    { name: "Sos Ostry", unit: "л" },
    { name: "Sos Serowy", unit: "л" },
    { name: "Rolada Ustrzycka", unit: "кг" },
    { name: "Ser Brzegi", unit: "кг" },
    { name: "Sos BBQ", unit: "л" },
    { name: "Żurawina", unit: "л" },
    { name: "Masło Rośline", unit: "кг" },
    { name: "SZYNKA", unit: "кг" },
    { name: "BOCZEK", unit: "кг" },
    { name: "SALAMI", unit: "кг" },
    { name: "KABANOSY", unit: "кг" },
    { name: "Kurczak Filet", unit: "кг" },
    { name: "CEBULA", unit: "кг" },
    { name: "PIECZARKI", unit: "кг" },
    { name: "PAPRYKA KOLOROWA", unit: "кг" },
    { name: "Ananas", unit: "кг" },
    { name: "Kukurydza", unit: "кг" },
    { name: "Oliwki Czarne", unit: "кг" },
    { name: "Papryka Jalapeno", unit: "кг" },
    { name: "Śmietana", unit: "кг" },
    { name: "Mąka kukurydziana", unit: "кг" },
    { name: "Wołowina Wegańska", unit: "кг" },
    { name: "Mieszanka Serów VEGE", unit: "кг" },
    { name: "Ser Chedar", unit: "кг" },
    { name: "Ser Lazur", unit: "кг" },
    { name: "Ser Feta", unit: "кг" },
    { name: "PEPSI COLA 0.85L", unit: "шт" },
    { name: "PEPSI MAX 0.85L", unit: "шт" },
    { name: "7UP 0.85L", unit: "шт" },
    { name: "MIRINDA 0.85L", unit: "шт" },
    { name: "Sok", unit: "шт" },
    { name: "Woda niegazowana", unit: "шт" },
    { name: "Woda Gazowana", unit: "шт" },
    { name: "DORITOS NACHO CHEESE 100 G", unit: "шт" },
    { name: "DORITOS HOT CORN 100 G", unit: "шт" },
    { name: "DORITOS NACHO CHEESE 180 G", unit: "кг" },
    { name: "CHEETOS SER 85 G", unit: "шт" },
    { name: "CHEETOS PIZZA 85 G", unit: "шт" },
    { name: "CHEETOS KETCHUP 85 G", unit: "шт" }
  ]
};

const orderApiSettingsKey = "pizza-crm:orders-api-settings";
const dailyStockDateKey = "pizza-crm:daily-stock-date";
const appLanguageKey = "pizza-crm:language";
let orderSyncTimer = null;
let dailyMode = "morning";
let dailyFilter = "all";

const translations = {
  pl: {
    "Адмінська CRM": "CRM administracyjny",
    "Адмін-панель": "Panel administracyjny",
    "Основна навігація": "Główna nawigacja",
    "Дашборд": "Dashboard",
    "Склад": "Magazyn",
    "Інгредієнти": "Składniki",
    "Рецепти": "Receptury",
    "Поставки": "Dostawy",
    "Замовлення": "Zamówienia",
    "Списання": "Odpisy",
    "Звіти": "Raporty",
    "Налаштування": "Ustawienia",
    "Пошук товару або інгредієнта": "Szukaj towaru lub składnika",
    "Пошук списання": "Szukaj odpisu",
    "Пошук замовлення": "Szukaj zamówienia",
    "Дата": "Data",
    "Закрити зміну": "Zamknij zmianę",
    "Перерахувати прогноз": "Przelicz prognozę",
    "Щоденний облік складу": "Dzienna ewidencja magazynu",
    "Склад зміни": "Magazyn zmiany",
    "Скинути демо": "Resetuj demo",
    "Позицій: 0": "Pozycji: 0",
    "Ранок: редагуємо тільки початок дня": "Rano: edytujemy tylko stan początkowy",
    "Ранок": "Rano",
    "Доставка": "Dostawa",
    "Закриття": "Zamknięcie",
    "Контроль": "Kontrola",
    "Всі": "Wszystkie",
    "Різниця": "Różnice",
    "Порожні": "Puste",
    "Нижче мінімуму": "Poniżej minimum",
    "Таблиця зміни": "Tabela zmiany",
    "Факт має пріоритет над прогнозом": "Stan faktyczny ma priorytet nad prognozą",
    "Товар": "Towar",
    "Од.": "Jedn.",
    "Початок дня": "Początek dnia",
    "Прогноз з ордерів": "Prognoza z zamówień",
    "Кінець зміни": "Koniec zmiany",
    "Факт витрата": "Zużycie faktyczne",
    "Статус": "Status",
    "Складська операція з аудитом": "Operacja magazynowa z audytem",
    "Обери товар зі списку, перевір залишок, побач наслідок списання і підтвердь операцію перед зміною складу.": "Wybierz towar z listy, sprawdź stan, zobacz efekt odpisu i potwierdź operację przed zmianą magazynu.",
    "Експорт Excel": "Eksport Excel",
    "Імпорт CSV/Excel": "Import CSV/Excel",
    "Журнал списань": "Dziennik odpisów",
    "Аудит увімкнено": "Audyt włączony",
    "Дата/час": "Data/godzina",
    "Інгредієнт": "Składnik",
    "Кількість": "Ilość",
    "Причина": "Powód",
    "Було → стало": "Było → będzie",
    "Автор": "Autor",
    "Додати списання": "Dodaj odpis",
    "Потребує підтвердження": "Wymaga potwierdzenia",
    "Додати свій товар...": "Dodaj własny towar...",
    "Введи свій товар": "Wpisz własny towar",
    "Термін придатності": "Termin ważności",
    "Брак кухні": "Błąd kuchni",
    "Помилка замовлення": "Błąd zamówienia",
    "Тест рецепту": "Test receptury",
    "Інвентаризаційна різниця": "Różnica inwentaryzacyjna",
    "Інше": "Inne",
    "Коментар": "Komentarz",
    "Партія, деталі браку або пояснення": "Partia, szczegóły błędu lub wyjaśnienie",
    "Поточний залишок": "Aktualny stan",
    "обери інгредієнт": "wybierz składnik",
    "Вплив на склад": "Wpływ na magazyn",
    "Списання одразу зменшить залишок після підтвердження.": "Odpis od razu zmniejszy stan po potwierdzeniu.",
    "Підтвердити і списати": "Potwierdź i odpisz",
    "Налаштування системи": "Ustawienia systemu",
    "Користувачі та доступ": "Użytkownicy i dostęp",
    "Додавай користувачів, імпортуй список із CSV і експортуй для Excel.": "Dodawaj użytkowników, importuj listę z CSV i eksportuj do Excela.",
    "Мова інтерфейсу": "Język interfejsu",
    "Зміни мову CRM для всіх екранів цього браузера.": "Zmień język CRM dla wszystkich ekranów w tej przeglądarce.",
    "Українська": "Ukraiński",
    "Польська": "Polski",
    "Англійська": "Angielski",
    "Користувачі": "Użytkownicy",
    "ПІБ": "Imię i nazwisko",
    "Електронна пошта": "E-mail",
    "Доступ": "Dostęp",
    "Додати користувача": "Dodaj użytkownika",
    "Поточна мова": "Aktualny język",
    "Повний доступ": "Pełny dostęp",
    "Склад і поставки": "Magazyn i dostawy",
    "Замовлення і списання": "Zamówienia i odpisy",
    "Звіти без редагування": "Raporty bez edycji",
    "Активний": "Aktywny",
    "Очікує запрошення": "Oczekuje zaproszenia",
    "Заблокований": "Zablokowany",
    "Новий користувач": "Nowy użytkownik",
    "Додати і оновити склад": "Dodaj i zaktualizuj magazyn",
    "Швидке приймання": "Szybkie przyjęcie",
    "Постачальник": "Dostawca",
    "Накладна": "Faktura",
    "Оприбуткувати все": "Przyjmij wszystko",
    "Шаблон CSV": "Szablon CSV",
    "Журнал поставок": "Dziennik dostaw"
  },
  en: {
    "Адмінська CRM": "Admin CRM",
    "Адмін-панель": "Admin panel",
    "Основна навігація": "Main navigation",
    "Дашборд": "Dashboard",
    "Склад": "Inventory",
    "Інгредієнти": "Ingredients",
    "Рецепти": "Recipes",
    "Поставки": "Deliveries",
    "Замовлення": "Orders",
    "Списання": "Write-offs",
    "Звіти": "Reports",
    "Налаштування": "Settings",
    "Пошук товару або інгредієнта": "Search item or ingredient",
    "Пошук списання": "Search write-off",
    "Пошук замовлення": "Search order",
    "Дата": "Date",
    "Закрити зміну": "Close shift",
    "Перерахувати прогноз": "Recalculate forecast",
    "Щоденний облік складу": "Daily inventory",
    "Склад зміни": "Shift inventory",
    "Скинути демо": "Reset demo",
    "Позицій: 0": "Items: 0",
    "Ранок: редагуємо тільки початок дня": "Morning: edit opening stock only",
    "Ранок": "Morning",
    "Доставка": "Delivery",
    "Закриття": "Closing",
    "Контроль": "Control",
    "Всі": "All",
    "Різниця": "Variance",
    "Порожні": "Empty",
    "Нижче мінімуму": "Below minimum",
    "Таблиця зміни": "Shift table",
    "Факт має пріоритет над прогнозом": "Actual stock has priority over forecast",
    "Товар": "Item",
    "Од.": "Unit",
    "Початок дня": "Opening",
    "Прогноз з ордерів": "Order forecast",
    "Кінець зміни": "Closing",
    "Факт витрата": "Actual usage",
    "Статус": "Status",
    "Складська операція з аудитом": "Audited inventory operation",
    "Обери товар зі списку, перевір залишок, побач наслідок списання і підтвердь операцію перед зміною складу.": "Select an item, check current stock, preview the write-off impact, and confirm before changing inventory.",
    "Експорт Excel": "Export Excel",
    "Імпорт CSV/Excel": "Import CSV/Excel",
    "Журнал списань": "Write-off log",
    "Аудит увімкнено": "Audit enabled",
    "Дата/час": "Date/time",
    "Інгредієнт": "Ingredient",
    "Кількість": "Quantity",
    "Причина": "Reason",
    "Було → стало": "Before → after",
    "Автор": "Author",
    "Додати списання": "Add write-off",
    "Потребує підтвердження": "Confirmation required",
    "Додати свій товар...": "Add custom item...",
    "Введи свій товар": "Enter custom item",
    "Термін придатності": "Expiration date",
    "Брак кухні": "Kitchen waste",
    "Помилка замовлення": "Order mistake",
    "Тест рецепту": "Recipe test",
    "Інвентаризаційна різниця": "Inventory variance",
    "Інше": "Other",
    "Коментар": "Comment",
    "Партія, деталі браку або пояснення": "Batch, waste details, or explanation",
    "Поточний залишок": "Current stock",
    "обери інгредієнт": "select ingredient",
    "Вплив на склад": "Inventory impact",
    "Списання одразу зменшить залишок після підтвердження.": "The write-off will reduce stock immediately after confirmation.",
    "Підтвердити і списати": "Confirm write-off",
    "Налаштування системи": "System settings",
    "Користувачі та доступ": "Users and access",
    "Додавай користувачів, імпортуй список із CSV і експортуй для Excel.": "Add users, import a CSV list, and export for Excel.",
    "Мова інтерфейсу": "Interface language",
    "Зміни мову CRM для всіх екранів цього браузера.": "Change CRM language for all screens in this browser.",
    "Українська": "Ukrainian",
    "Польська": "Polish",
    "Англійська": "English",
    "Користувачі": "Users",
    "ПІБ": "Full name",
    "Електронна пошта": "Email",
    "Доступ": "Access",
    "Додати користувача": "Add user",
    "Поточна мова": "Current language",
    "Повний доступ": "Full access",
    "Склад і поставки": "Inventory and deliveries",
    "Замовлення і списання": "Orders and write-offs",
    "Звіти без редагування": "Read-only reports",
    "Активний": "Active",
    "Очікує запрошення": "Pending invitation",
    "Заблокований": "Blocked",
    "Новий користувач": "New user",
    "Додати і оновити склад": "Add and update stock",
    "Швидке приймання": "Quick receiving",
    "Постачальник": "Supplier",
    "Накладна": "Invoice",
    "Оприбуткувати все": "Post all",
    "Шаблон CSV": "CSV template",
    "Журнал поставок": "Delivery log"
  }
};

function toast(message) {
  const toastNode = document.querySelector(".toast");
  if (!toastNode) return;
  toastNode.textContent = translateText(message);
  toastNode.classList.add("show");
  window.setTimeout(() => toastNode.classList.remove("show"), 2400);
}

function currentLanguage() {
  return localStorage.getItem(appLanguageKey) || "uk";
}

function translateText(text) {
  const lang = currentLanguage();
  if (lang === "uk") return text;
  return translations[lang]?.[text] || text;
}

function translateNodeText(node) {
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const original = child.textContent;
      const trimmed = original.trim();
      if (!trimmed) return;
      const translated = translateText(trimmed);
      if (translated !== trimmed) {
        child.textContent = original.replace(trimmed, translated);
      }
    } else if (child.nodeType === Node.ELEMENT_NODE && !["SCRIPT", "STYLE"].includes(child.tagName)) {
      translateNodeText(child);
    }
  });
}

function applyLanguage(root = document.body) {
  const lang = currentLanguage();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.value = lang;
  });
  if (lang === "uk" || !root) return;
  translateNodeText(root);
  root.querySelectorAll?.("[placeholder]").forEach((element) => {
    element.placeholder = translateText(element.placeholder);
  });
  root.querySelectorAll?.("[aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translateText(element.getAttribute("aria-label")));
  });
}

function storageKey(entity) {
  return `pizza-crm:${entity}`;
}

function readRows(entity) {
  const stored = localStorage.getItem(storageKey(entity));
  if (stored) return JSON.parse(stored);
  const rows = initialData[entity] || [];
  localStorage.setItem(storageKey(entity), JSON.stringify(rows));
  return rows;
}

function writeRows(entity, rows) {
  localStorage.setItem(storageKey(entity), JSON.stringify(rows));
}

function dailyStockKey(date) {
  return `pizza-crm:dailyStock:${date}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n;]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if ((char === "," || char === ";") && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "")) rows.push(row);
  return rows;
}

function objectFromForm(form) {
  return [...form.elements].reduce((data, field) => {
    if (!field.name || field.disabled) return data;
    data[field.name] = field.value.trim();
    return data;
  }, {});
}

function rowStatus(row, entity) {
  if (entity === "ingredients") {
    const stock = Number(row.stock);
    const min = Number(row.min);
    return stock <= min ? '<span class="status danger">низький залишок</span>' : '<span class="status ok">в нормі</span>';
  }
  if (entity === "orders") {
    const status = row.status || "Нове";
    const className = status === "Готово" ? "ok" : status === "В роботі" ? "warn" : "info";
    return `<span class="status ${className}">${escapeHtml(status)}</span>`;
  }
  return escapeHtml(row.status || "");
}

const renderers = {
  orders: (row) => `<tr>
    <td>#${escapeHtml(row.number)}</td>
    <td>${escapeHtml(row.pizza || row.items)}</td>
    <td>${escapeHtml(row.additionals || "-")}</td>
    <td>${escapeHtml(row.price || "0")} zł</td>
    <td>${escapeHtml(row.parameters || row.note || "-")}</td>
    <td>${rowStatus(row, "orders")}</td>
    <td>${escapeHtml(row.source || "Локально")}</td>
  </tr>`,
  ingredients: (row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.category)}</td><td>${escapeHtml(row.stock)} ${escapeHtml(row.unit)}</td><td>${escapeHtml(row.min)} ${escapeHtml(row.unit)}</td><td>${escapeHtml(row.supplier)}</td><td>${rowStatus(row, "ingredients")}</td></tr>`,
  recipes: (row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.price)} зл</td><td>${escapeHtml(row.cost)} зл</td><td>${escapeHtml(row.ingredients)}</td></tr>`,
  recipeRules: (row) => `<tr><td>${escapeHtml(row.pizza)}</td><td>${escapeHtml(row.ingredient)}</td><td>${escapeHtml(row.qty)} ${escapeHtml(row.unit)}</td><td>${escapeHtml(row.match)}</td></tr>`,
  modifierRules: (row) => `<tr><td>${escapeHtml(row.keyword)}</td><td>${escapeHtml(row.ingredient)}</td><td>${escapeHtml(row.mode)}</td><td>${escapeHtml(row.qty)}</td><td>${escapeHtml(row.note)}</td></tr>`,
  users: (row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.email)}</td><td>${escapeHtml(row.access)}</td><td><span class="status ok">${escapeHtml(row.status || "Активний")}</span></td></tr>`,
  deliveries: (row) => `<tr><td>${escapeHtml(row.supplier)}</td><td>${escapeHtml(row.invoice)}</td><td>${escapeHtml(row.item)}</td><td>${escapeHtml(row.qty)}</td><td>${escapeHtml(row.expiry)}</td><td>${row.postedAt ? '<span class="status ok">оприбутковано</span>' : '<span class="status warn">очікує</span>'}</td></tr>`,
  writeoffs: (row) => `<tr>
    <td>${escapeHtml(row.createdAt ? new Date(row.createdAt).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" }) : "-")}</td>
    <td>${escapeHtml(row.item)}</td>
    <td>${escapeHtml(row.qty)}</td>
    <td>${escapeHtml(row.reason)}${row.comment ? `, ${escapeHtml(row.comment)}` : ""}</td>
    <td>${escapeHtml(row.before || "-")} → ${escapeHtml(row.after || "-")}</td>
    <td>${escapeHtml(row.author)}</td>
    <td><span class="status ok">${escapeHtml(row.status || "проведено")}</span></td>
  </tr>`
};

function renderEntity(entity) {
  const tbody = document.querySelector(`[data-table="${entity}"]`);
  if (!tbody) return;
  const rows = readRows(entity);
  tbody.innerHTML = rows.map(renderers[entity]).join("");
  applyLanguage(tbody);
}

function exportEntity(entity) {
  const rows = readRows(entity);
  if (!rows.length) {
    toast("Немає даних для експорту");
    return;
  }
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(","))].join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${entity}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  toast("Експорт для Excel створено");
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function backupAllData() {
  const entities = ["orders", "ingredients", "recipes", "users", "deliveries", "writeoffs"];
  const backup = entities.reduce((data, entity) => {
    data[entity] = readRows(entity);
    return data;
  }, { savedAt: new Date().toISOString(), app: "Pizza na Wypasie CRM" });

  downloadJson(`pizza-crm-backup-${new Date().toISOString().slice(0, 10)}.json`, backup);
  toast("Локальний бекап завантажено");
}

async function importEntity(entity, file) {
  const text = await file.text();
  const parsed = parseCsv(text);
  const [headers, ...lines] = parsed;
  if (!headers || !lines.length) {
    toast("Файл порожній або має неправильний формат");
    return;
  }
  const imported = lines.map((line) => {
    return headers.reduce((row, header, index) => {
      row[header.trim()] = (line[index] || "").trim();
      return row;
    }, {});
  });
  const rows = [...readRows(entity), ...imported];
  writeRows(entity, rows);
  renderEntity(entity);
  toast(`Імпортовано рядків: ${imported.length}`);
}

function parseQuantity(value) {
  const text = String(value || "").replace(",", ".").trim();
  const match = text.match(/(-?\d+(?:\.\d+)?)\s*([^\d\s]+)?/);
  return {
    amount: match ? Number(match[1]) : 0,
    unit: match?.[2] || ""
  };
}

function sameText(left, right) {
  return String(left || "").trim().toLowerCase() === String(right || "").trim().toLowerCase();
}

function applyDeliveryToStock(delivery) {
  const { amount, unit } = parseQuantity(delivery.qty);
  if (!delivery.item || !amount) return false;

  const ingredients = readRows("ingredients");
  const index = ingredients.findIndex((ingredient) => sameText(ingredient.name, delivery.item));
  if (index >= 0) {
    const current = Number(String(ingredients[index].stock || "0").replace(",", "."));
    ingredients[index] = {
      ...ingredients[index],
      stock: String(Number((current + amount).toFixed(3))),
      unit: ingredients[index].unit || unit,
      supplier: delivery.supplier || ingredients[index].supplier
    };
  } else {
    ingredients.unshift({
      name: delivery.item,
      category: "Нове з поставки",
      unit: unit || "шт",
      stock: String(amount),
      min: "0",
      supplier: delivery.supplier || ""
    });
  }

  writeRows("ingredients", ingredients);
  renderEntity("ingredients");
  return true;
}

function getStockSnapshot(itemName) {
  const dailyRow = readDailyRows().find((row) => sameText(row.item, itemName));
  if (dailyRow) {
    return {
      source: "dailyStock",
      item: dailyRow.item,
      amount: toNumber(dailyRow.end),
      unit: dailyRow.unit || "",
      display: `${dailyRow.end || "0"} ${dailyRow.unit || ""}`.trim()
    };
  }

  const ingredient = readRows("ingredients").find((row) => sameText(row.name, itemName));
  if (ingredient) {
    return {
      source: "ingredients",
      item: ingredient.name,
      amount: toNumber(ingredient.stock),
      unit: ingredient.unit || "",
      display: `${ingredient.stock || "0"} ${ingredient.unit || ""}`.trim()
    };
  }

  return { source: "missing", item: itemName, amount: 0, unit: "", display: "немає на складі" };
}

function applyWriteoffToStock(writeoff) {
  const snapshot = getStockSnapshot(writeoff.item);
  const parsed = parseQuantity(writeoff.qty);
  if (!writeoff.item || !parsed.amount) return { ok: false, snapshot, after: snapshot.amount };

  const after = Math.max(snapshot.amount - parsed.amount, 0);
  const dailyRows = readDailyRows();
  const dailyIndex = dailyRows.findIndex((row) => sameText(row.item, writeoff.item));
  if (dailyIndex >= 0) {
    dailyRows[dailyIndex] = { ...dailyRows[dailyIndex], end: String(Number(after.toFixed(3))) };
    writeDailyRows(dailyRows);
    renderDailyStock();
  }

  const ingredients = readRows("ingredients");
  const ingredientIndex = ingredients.findIndex((row) => sameText(row.name, writeoff.item));
  if (ingredientIndex >= 0) {
    ingredients[ingredientIndex] = { ...ingredients[ingredientIndex], stock: String(Number(after.toFixed(3))) };
    writeRows("ingredients", ingredients);
    renderEntity("ingredients");
  }

  return { ok: true, snapshot, after };
}

function postPendingDeliveries() {
  const deliveries = readRows("deliveries");
  let posted = 0;
  const nextRows = deliveries.map((delivery) => {
    if (delivery.postedAt) return delivery;
    if (!applyDeliveryToStock(delivery)) return delivery;
    posted += 1;
    return { ...delivery, postedAt: new Date().toISOString() };
  });

  writeRows("deliveries", nextRows);
  renderEntity("deliveries");
  toast(posted ? `Оприбутковано позицій: ${posted}` : "Немає нових позицій для оприбуткування");
}

function toNumber(value) {
  const number = Number(String(value || "0").replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

function formatQty(value) {
  return String(Number(value.toFixed(3))).replace(".", ",");
}

function dailyActualUsed(row) {
  return toNumber(row.start) + toNumber(row.delivery) - toNumber(row.end);
}

function dailyVariance(row) {
  return dailyActualUsed(row) - toNumber(row.predicted);
}

function isBlankDailyRow(row) {
  return ["start", "delivery", "end"].some((field) => String(row[field] ?? "").trim() === "");
}

function dailyRowIssue(row) {
  if (isBlankDailyRow(row)) return "empty";
  if (toNumber(row.end) < 3 && ["кг", "л", "шт"].includes(String(row.unit).toLowerCase())) return "low";
  if (Math.abs(dailyVariance(row)) > 0.25) return "variance";
  return "ok";
}

function dailyRowHint(row) {
  const issue = dailyRowIssue(row);
  if (issue === "empty") return "заповни початок, доставку і кінець зміни";
  if (issue === "low") return "нижче робочого запасу, перевір замовлення постачальнику";
  if (issue === "variance") return "перевір рецепт, списання або скасовані замовлення";
  return "";
}

function dailyInputState(field) {
  const editableByMode = {
    morning: ["start"],
    delivery: ["delivery"],
    closing: ["end"],
    control: []
  };
  return {
    readonly: field === "predicted" || !editableByMode[dailyMode].includes(field),
    forecast: field === "predicted"
  };
}

function dailyCellValue(value) {
  const text = String(value ?? "").trim();
  return text === "" ? "" : text;
}

function dailyDisplayQty(value, unit) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${formatQty(value)} ${unit || ""}`.trim();
}

function selectedDailyDate() {
  const input = document.querySelector("[data-daily-date]");
  const stored = localStorage.getItem(dailyStockDateKey);
  return input?.value || stored || new Date().toISOString().slice(0, 10);
}

function readDailyRows(date = selectedDailyDate()) {
  const stored = localStorage.getItem(dailyStockKey(date));
  if (stored) return JSON.parse(stored);

  const baseRows = readRows("dailyStock");
  localStorage.setItem(dailyStockKey(date), JSON.stringify(baseRows));
  return baseRows;
}

function writeDailyRows(rows, date = selectedDailyDate()) {
  localStorage.setItem(dailyStockKey(date), JSON.stringify(rows));
  if (date === new Date().toISOString().slice(0, 10)) {
    writeRows("dailyStock", rows);
  }
}

function hydrateDailyDate() {
  const input = document.querySelector("[data-daily-date]");
  if (!input) return;
  input.value = selectedDailyDate();
}

function renderDailyStock() {
  const tbody = document.querySelector("[data-daily-stock-table]");
  if (!tbody) return;
  hydrateDailyDate();
  const rows = readDailyRows();
  const filteredRows = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => {
      const issue = dailyRowIssue(row);
      if (dailyFilter === "all") return true;
      if (dailyFilter === "variance") return issue === "variance";
      if (dailyFilter === "empty") return issue === "empty";
      if (dailyFilter === "low") return issue === "low";
      return true;
    });

  tbody.innerHTML = filteredRows.map(({ row, index }) => {
    const actual = dailyActualUsed(row);
    const variance = dailyVariance(row);
    const issue = dailyRowIssue(row);
    const status = issue === "empty"
      ? '<span class="status info">не заповнено</span>'
      : issue === "low"
        ? '<span class="status danger">нижче мінімуму</span>'
        : issue === "variance"
          ? '<span class="status warn">перевірити</span>'
          : '<span class="status ok">сходиться</span>';
    const startState = dailyInputState("start");
    const deliveryState = dailyInputState("delivery");
    const predictedState = dailyInputState("predicted");
    const endState = dailyInputState("end");
    return `<tr>
      <td>${escapeHtml(row.item)}</td>
      <td>${escapeHtml(row.unit)}</td>
      <td><input class="table-input" placeholder="—" data-daily-field="start" data-daily-index="${index}" value="${escapeHtml(dailyCellValue(row.start))}" ${startState.readonly ? "readonly" : ""} /></td>
      <td><input class="table-input" placeholder="—" data-daily-field="delivery" data-daily-index="${index}" value="${escapeHtml(dailyCellValue(row.delivery))}" ${deliveryState.readonly ? "readonly" : ""} /></td>
      <td><input class="table-input forecast" placeholder="—" data-daily-field="predicted" data-daily-index="${index}" value="${escapeHtml(dailyCellValue(row.predicted))}" readonly /></td>
      <td><input class="table-input" placeholder="—" data-daily-field="end" data-daily-index="${index}" value="${escapeHtml(dailyCellValue(row.end))}" ${endState.readonly ? "readonly" : ""} /></td>
      <td>${isBlankDailyRow(row) ? "—" : dailyDisplayQty(actual, row.unit)}</td>
      <td>${isBlankDailyRow(row) ? "—" : dailyDisplayQty(variance, row.unit)}</td>
      <td>${status}${dailyRowHint(row) ? `<small>${escapeHtml(dailyRowHint(row))}</small>` : ""}</td>
    </tr>`;
  }).join("");
  updateDailySummary(rows);
  updateDailyControls();
}

function updateDailySummary(rows) {
  const node = document.querySelector("[data-daily-summary]");
  if (!node) return;
  const counts = rows.reduce((acc, row) => {
    acc[dailyRowIssue(row)] += 1;
    return acc;
  }, { ok: 0, variance: 0, empty: 0, low: 0 });
  node.textContent = `Позицій: ${rows.length}. Різниця: ${counts.variance}. Порожні: ${counts.empty}. Нижче мінімуму: ${counts.low}.`;
}

function saveDailyCell(input) {
  const rows = readDailyRows();
  const index = Number(input.dataset.dailyIndex);
  const field = input.dataset.dailyField;
  if (!rows[index] || !field) return;
  rows[index][field] = input.value.trim();
  writeDailyRows(rows);
  renderDailyStock();
}

function closeDailyShift() {
  const currentDate = selectedDailyDate();
  const nextDate = new Date(`${currentDate}T00:00:00`);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateText = nextDate.toISOString().slice(0, 10);
  const currentRows = readDailyRows(currentDate);
  const emptyCount = currentRows.filter(isBlankDailyRow).length;
  const varianceCount = currentRows.filter((row) => dailyRowIssue(row) === "variance").length;
  const confirmed = window.confirm(`Закрити зміну ${currentDate} і перенести кінець на завтра?\nПорожні рядки: ${emptyCount}\nРядки з різницею: ${varianceCount}`);
  if (!confirmed) {
    toast("Закриття зміни скасовано");
    return;
  }

  const rows = currentRows.map((row) => ({
    ...row,
    start: row.end || "0",
    delivery: "",
    predicted: "",
    end: row.end || "0"
  }));
  writeDailyRows(rows, nextDateText);
  localStorage.setItem(dailyStockDateKey, nextDateText);
  const input = document.querySelector("[data-daily-date]");
  if (input) input.value = nextDateText;
  renderDailyStock();
  toast("Кінець зміни перенесено на початок наступного дня");
}

function updateDailyControls() {
  document.querySelectorAll("[data-daily-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.dailyMode === dailyMode);
  });
  document.querySelectorAll("[data-daily-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.dailyFilter === dailyFilter);
  });
  const modeLabel = document.querySelector("[data-daily-mode-label]");
  if (modeLabel) {
    const labels = {
      morning: "Ранок: редагуємо тільки початок дня",
      delivery: "Доставка: редагуємо тільки поставку",
      closing: "Закриття: редагуємо тільки кінець зміни",
      control: "Контроль: перегляд різниць без редагування"
    };
    modeLabel.textContent = labels[dailyMode];
  }
}

function setDailyMode(mode) {
  dailyMode = mode;
  renderDailyStock();
}

function setDailyFilter(filter) {
  dailyFilter = filter;
  renderDailyStock();
}

function fillPredictedFromOrders() {
  const orders = readRows("orders");
  const rows = readDailyRows();
  const recipeRules = readRows("recipeRules");
  const modifierRules = readRows("modifierRules");
  const usage = new Map();

  orders
    .filter((order) => !String(order.status || "").toLowerCase().includes("скас"))
    .forEach((order) => {
      const text = `${order.pizza || ""} ${order.additionals || ""} ${order.parameters || ""}`.toLowerCase();

      recipeRules.forEach((rule) => {
        const matcher = new RegExp(rule.match, "i");
        if (!matcher.test(text)) return;
        usage.set(rule.ingredient, (usage.get(rule.ingredient) || 0) + toNumber(rule.qty));
      });

      modifierRules.forEach((rule) => {
        const matcher = new RegExp(rule.keyword, "i");
        if (!matcher.test(text)) return;
        const current = usage.get(rule.ingredient) || 0;
        if (rule.mode === "multiply") {
          usage.set(rule.ingredient, current + current * toNumber(rule.qty));
        } else {
          usage.set(rule.ingredient, current + toNumber(rule.qty));
        }
      });
    });

  const nextRows = rows.map((row) => ({
    ...row,
    predicted: String(Number((usage.get(row.item) || toNumber(row.predicted)).toFixed(3)))
  }));

  writeDailyRows(nextRows);
  renderDailyStock();
  toast("Підказку по витраті оновлено з ордерів і модифікаторів");
}

function changeDailyDate(date) {
  localStorage.setItem(dailyStockDateKey, date);
  renderDailyStock();
  toast(`Показуємо склад за ${date}`);
}

function downloadDeliveryTemplate() {
  const csv = [
    "supplier,invoice,item,qty,expiry",
    "Сир і молочні продукти,FV/2026/0519,Моцарела,12 кг,2026-05-21",
    "Warzywa fresh,FV/2026/0520,Печериці,4 кг,2026-05-20"
  ].join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "delivery-import-template.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  toast("Шаблон CSV завантажено");
}

function populateInventoryItemSelects() {
  document.querySelectorAll("[data-inventory-item-select]").forEach((select) => {
    if (select.dataset.ready === "true") return;
    const selected = select.dataset.selected || "Ser Mozzarella";
    const options = readRows("inventoryItems")
      .map((item) => `<option value="${escapeHtml(item.name)}"${item.name === selected ? " selected" : ""}>${escapeHtml(item.name)} (${escapeHtml(item.unit)})</option>`)
      .join("");
    select.innerHTML = `${options}<option value="__custom__">Додати свій товар...</option>`;
    select.dataset.ready = "true";
  });
}

function toggleCustomInventoryItem(select) {
  const field = select.closest(".field");
  const customInput = field?.querySelector("[data-custom-inventory-item]");
  if (!customInput) return;
  const custom = select.value === "__custom__";
  select.disabled = custom;
  customInput.hidden = !custom;
  customInput.disabled = !custom;
  if (custom) {
    customInput.focus();
  }
}

function selectedWriteoffItem(form) {
  const custom = form.querySelector("[data-custom-inventory-item]:not(:disabled)")?.value.trim();
  const selected = form.querySelector("[data-inventory-item-select]")?.value;
  return custom || (selected === "__custom__" ? "" : selected) || "";
}

function updateWriteoffImpact(form) {
  const item = selectedWriteoffItem(form);
  const qty = form.querySelector("[data-writeoff-qty]")?.value || "";
  const snapshot = getStockSnapshot(item);
  const parsed = parseQuantity(qty);
  const after = Math.max(snapshot.amount - parsed.amount, 0);
  const unit = snapshot.unit || parsed.unit || "";

  const currentNodes = form.querySelectorAll("[data-current-stock]");
  const afterNode = form.querySelector("[data-after-stock]");
  const warningNode = form.querySelector("[data-writeoff-warning]");
  currentNodes.forEach((node) => {
    const value = item ? snapshot.display : "обери інгредієнт";
    if ("value" in node) node.value = value;
    else node.textContent = value;
  });
  if (afterNode) afterNode.textContent = item ? `${formatQty(after)} ${unit}`.trim() : "-";
  if (warningNode) {
    warningNode.textContent = parsed.amount > snapshot.amount
      ? "Кількість списання більша за поточний залишок. Потрібна додаткова перевірка."
      : "Списання одразу зменшить залишок після підтвердження.";
  }
}

function hydrateWriteoffForms() {
  document.querySelectorAll("[data-writeoff-form]").forEach((form) => updateWriteoffImpact(form));
}

function loadOrderApiSettings() {
  const defaults = {
    endpoint: "",
    workday: new Date().toISOString().slice(0, 10),
    autoSync: false
  };
  const stored = localStorage.getItem(orderApiSettingsKey);
  return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
}

function saveOrderApiSettings(settings) {
  localStorage.setItem(orderApiSettingsKey, JSON.stringify(settings));
}

function readOrderApiSettingsFromPage() {
  const endpoint = document.querySelector("[data-api-endpoint]")?.value.trim() || "";
  const workday = document.querySelector("[data-api-workday]")?.value || new Date().toISOString().slice(0, 10);
  const autoSync = Boolean(document.querySelector("[data-auto-sync-orders]")?.checked);
  const settings = { endpoint, workday, autoSync };
  saveOrderApiSettings(settings);
  return settings;
}

function hydrateOrderApiSettings() {
  const settings = loadOrderApiSettings();
  const endpointInput = document.querySelector("[data-api-endpoint]");
  const workdayInput = document.querySelector("[data-api-workday]");
  const autoSyncInput = document.querySelector("[data-auto-sync-orders]");
  if (endpointInput) endpointInput.value = settings.endpoint;
  if (workdayInput) workdayInput.value = settings.workday;
  if (autoSyncInput) autoSyncInput.checked = settings.autoSync;
  updateSyncMeta("Очікує синхронізації");
  setupOrderAutoSync(settings.autoSync);
}

function updateSyncMeta(message) {
  const node = document.querySelector("[data-sync-meta]");
  if (node) node.textContent = message;
}

function demoApiOrders(workday) {
  return [
    {
      id: `center-${workday}-201`,
      order_id: "201",
      pizza: "Pizza Grill x1",
      additionals: ["sos czosnkowy", "podwojny ser"],
      price: 42.99,
      parameters: { channel: "центр", workday, payment: "card" },
      status: "new"
    },
    {
      id: `center-${workday}-202`,
      order_id: "202",
      pizza: "Pizza Weganska Wegetarianska x1",
      additionals: ["oliwki", "jalapeno"],
      price: 38.49,
      parameters: { channel: "центр", workday, deliveryTime: "18:30" },
      status: "accepted"
    }
  ];
}

function statusFromApi(status) {
  const normalized = String(status || "").toLowerCase();
  if (["done", "ready", "completed", "gotowe", "готово"].includes(normalized)) return "Готово";
  if (["accepted", "progress", "in_progress", "cooking", "w trakcie", "в роботі"].includes(normalized)) return "В роботі";
  return "Нове";
}

function textFromApiValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value && typeof value === "object") {
    return Object.entries(value).map(([key, item]) => `${key}: ${item}`).join(", ");
  }
  return String(value ?? "");
}

function normalizeApiOrder(order, workday) {
  const pizza = order.pizza || order.pizzas || order.items || order.product || "Піца";
  const additionals = order.additionals || order.addons || order.extras || order.additional || "";
  const price = order.price ?? order.total ?? order.amount ?? 0;
  const parameters = order.parameters || order.params || order.other_parameters || order.notes || order.comment || "";
  const externalId = String(order.id || order.order_id || order.number || crypto.randomUUID());

  return {
    externalId,
    number: String(order.order_id || order.number || order.id || externalId).replace(/^#/, ""),
    pizza: textFromApiValue(pizza),
    additionals: textFromApiValue(additionals) || "-",
    price: Number(price).toFixed(2),
    parameters: textFromApiValue(parameters) || `Робочий день: ${workday}`,
    status: statusFromApi(order.status),
    source: "API центр",
    syncedAt: new Date().toISOString()
  };
}

function upsertOrders(incoming) {
  const rows = readRows("orders");
  const byKey = new Map(rows.map((row, index) => [row.externalId || row.number, index]));
  let created = 0;
  let updated = 0;

  incoming.forEach((order) => {
    const key = order.externalId || order.number;
    if (byKey.has(key)) {
      rows[byKey.get(key)] = { ...rows[byKey.get(key)], ...order };
      updated += 1;
    } else {
      rows.unshift(order);
      created += 1;
    }
  });

  writeRows("orders", rows);
  renderEntity("orders");
  return { created, updated };
}

async function fetchOrdersFromApi(settings) {
  const endpoint = settings.endpoint.replace("{date}", encodeURIComponent(settings.workday));
  if (!endpoint || endpoint.includes("example")) return demoApiOrders(settings.workday);

  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`API відповіло статусом ${response.status}`);
  const payload = await response.json();
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.orders)) return payload.orders;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
}

async function syncOrdersFromApi() {
  const settings = readOrderApiSettingsFromPage();
  updateSyncMeta("Синхронізуємо замовлення...");

  try {
    const apiOrders = await fetchOrdersFromApi(settings);
    const normalized = apiOrders.map((order) => normalizeApiOrder(order, settings.workday));
    const result = upsertOrders(normalized);
    const stamp = new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
    updateSyncMeta(`Останній синк ${stamp}: нових ${result.created}, оновлено ${result.updated}`);
    toast(`API синк готовий: +${result.created}, оновлено ${result.updated}`);
  } catch (error) {
    updateSyncMeta(`Помилка API: ${error.message}`);
    toast("Не вдалось синхронізувати API");
  }
}

function setupOrderAutoSync(enabled) {
  if (orderSyncTimer) {
    window.clearInterval(orderSyncTimer);
    orderSyncTimer = null;
  }
  if (!enabled) return;
  orderSyncTimer = window.setInterval(syncOrdersFromApi, 60000);
}

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => toast(button.dataset.toast));
});

document.querySelectorAll("[data-route]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = button.dataset.route;
  });
});

document.querySelectorAll(".topbar-actions").forEach((actions) => {
  if (actions.querySelector("[data-backup-all]")) return;
  const button = document.createElement("button");
  button.className = "btn ghost";
  button.type = "button";
  button.dataset.backupAll = "true";
  button.textContent = "Зберегти локально";
  actions.append(button);
});

document.querySelectorAll("[data-entity]").forEach((form) => {
  const entity = form.dataset.entity;
  renderEntity(entity);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rows = readRows(entity);
    const row = objectFromForm(form);
    if (entity === "writeoffs") {
      const impact = getStockSnapshot(row.item);
      const parsed = parseQuantity(row.qty);
      const after = Math.max(impact.amount - parsed.amount, 0);
      const confirmed = window.confirm(`Підтвердити списання ${row.qty} для ${row.item}?\nБуло: ${impact.display}\nСтане: ${formatQty(after)} ${impact.unit || parsed.unit}`);
      if (!confirmed) {
        toast("Списання скасовано");
        return;
      }
      const result = applyWriteoffToStock(row);
      row.createdAt = new Date().toISOString();
      row.before = `${formatQty(result.snapshot.amount)} ${result.snapshot.unit || parsed.unit}`.trim();
      row.after = `${formatQty(result.after)} ${result.snapshot.unit || parsed.unit}`.trim();
      row.status = result.ok ? "проведено" : "не проведено";
    }
    if (entity === "deliveries" && form.dataset.updateStock === "true" && applyDeliveryToStock(row)) {
      row.postedAt = new Date().toISOString();
    }
    rows.unshift(row);
    writeRows(entity, rows);
    renderEntity(entity);
    toast(entity === "deliveries" && row.postedAt ? "Поставку додано і склад оновлено" : entity === "writeoffs" ? "Списання проведено і склад оновлено" : "Запис додано");
    if (entity === "writeoffs") updateWriteoffImpact(form);
  });
});

document.querySelectorAll("[data-export]").forEach((button) => {
  button.addEventListener("click", () => exportEntity(button.dataset.export));
});

document.querySelectorAll("[data-import]").forEach((input) => {
  input.addEventListener("change", () => {
    if (input.files?.[0]) importEntity(input.dataset.import, input.files[0]);
    input.value = "";
  });
});

document.querySelectorAll("[data-reset]").forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem(storageKey(button.dataset.reset));
    renderEntity(button.dataset.reset);
    toast("Демо-дані відновлено");
  });
});

document.querySelectorAll("[data-backup-all]").forEach((button) => {
  button.addEventListener("click", backupAllData);
});

document.querySelectorAll("[data-post-deliveries]").forEach((button) => {
  button.addEventListener("click", postPendingDeliveries);
});

document.querySelectorAll("[data-delivery-template]").forEach((button) => {
  button.addEventListener("click", downloadDeliveryTemplate);
});

populateInventoryItemSelects();
hydrateWriteoffForms();

document.querySelectorAll("[data-inventory-item-select]").forEach((select) => {
  select.addEventListener("change", () => {
    toggleCustomInventoryItem(select);
    const form = select.closest("form");
    if (form?.matches("[data-writeoff-form]")) updateWriteoffImpact(form);
  });
});

renderDailyStock();

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-daily-field]")) saveDailyCell(event.target);
  if (event.target.matches("[data-daily-date]")) changeDailyDate(event.target.value);
  if (event.target.matches("[data-writeoff-qty], [data-custom-inventory-item]")) {
    const form = event.target.closest("[data-writeoff-form]");
    if (form) updateWriteoffImpact(form);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-writeoff-qty], [data-custom-inventory-item]")) {
    const form = event.target.closest("[data-writeoff-form]");
    if (form) updateWriteoffImpact(form);
  }
});

document.querySelectorAll("[data-close-shift]").forEach((button) => {
  button.addEventListener("click", closeDailyShift);
});

document.querySelectorAll("[data-daily-mode]").forEach((button) => {
  button.addEventListener("click", () => setDailyMode(button.dataset.dailyMode));
});

document.querySelectorAll("[data-daily-filter]").forEach((button) => {
  button.addEventListener("click", () => setDailyFilter(button.dataset.dailyFilter));
});

document.querySelectorAll("[data-predict-usage]").forEach((button) => {
  button.addEventListener("click", fillPredictedFromOrders);
});

document.querySelectorAll("[data-sync-orders]").forEach((button) => {
  button.addEventListener("click", syncOrdersFromApi);
});

document.querySelectorAll("[data-api-endpoint], [data-api-workday], [data-auto-sync-orders]").forEach((field) => {
  field.addEventListener("change", () => {
    const settings = readOrderApiSettingsFromPage();
    setupOrderAutoSync(settings.autoSync);
    updateSyncMeta(settings.autoSync ? "Авто-синк увімкнено: кожні 60 секунд" : "Налаштування API збережено");
  });
});

hydrateOrderApiSettings();
