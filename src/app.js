const currentPage = window.location.pathname.split("/").pop() || "index.html";

const initialData = {
  orders: [
    { number: "1052", type: "Із собою", items: "Сирний шал x2", status: "Нове", note: "Без цибулі" },
    { number: "1048", type: "Зал", items: "Піца Гриль x1", status: "В роботі", note: "Гострий соус окремо" },
    { number: "1050", type: "Доставка", items: "Кальцоне x1", status: "Готово", note: "Списано за рецептом" }
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
  users: [
    { name: "Анастасія", email: "admin@pizza.test", access: "Повний доступ", status: "Активний" },
    { name: "Іра", email: "ira@pizza.test", access: "Склад і поставки", status: "Активний" }
  ],
  deliveries: [
    { supplier: "Сир і молочні продукти", invoice: "FV/2026/0518", item: "Моцарела", qty: "12 кг", expiry: "2026-05-21" }
  ],
  writeoffs: [
    { item: "Моцарела партія MZ-18", qty: "0.8 кг", reason: "Термін придатності", author: "Олег" }
  ]
};

function toast(message) {
  const toastNode = document.querySelector(".toast");
  if (!toastNode) return;
  toastNode.textContent = message;
  toastNode.classList.add("show");
  window.setTimeout(() => toastNode.classList.remove("show"), 2400);
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
    const className = row.status === "Готово" ? "ok" : row.status === "В роботі" ? "warn" : "info";
    return `<span class="status ${className}">${escapeHtml(row.status)}</span>`;
  }
  return escapeHtml(row.status || "");
}

const renderers = {
  orders: (row) => `<tr><td>#${escapeHtml(row.number)}</td><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.items)}</td><td>${rowStatus(row, "orders")}</td><td>${escapeHtml(row.note)}</td></tr>`,
  ingredients: (row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.category)}</td><td>${escapeHtml(row.stock)} ${escapeHtml(row.unit)}</td><td>${escapeHtml(row.min)} ${escapeHtml(row.unit)}</td><td>${escapeHtml(row.supplier)}</td><td>${rowStatus(row, "ingredients")}</td></tr>`,
  recipes: (row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.price)} зл</td><td>${escapeHtml(row.cost)} зл</td><td>${escapeHtml(row.ingredients)}</td></tr>`,
  users: (row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.email)}</td><td>${escapeHtml(row.access)}</td><td><span class="status ok">${escapeHtml(row.status || "Активний")}</span></td></tr>`,
  deliveries: (row) => `<tr><td>${escapeHtml(row.supplier)}</td><td>${escapeHtml(row.invoice)}</td><td>${escapeHtml(row.item)}</td><td>${escapeHtml(row.qty)}</td><td>${escapeHtml(row.expiry)}</td></tr>`,
  writeoffs: (row) => `<tr><td>${escapeHtml(row.item)}</td><td>${escapeHtml(row.qty)}</td><td>${escapeHtml(row.reason)}</td><td>${escapeHtml(row.author)}</td></tr>`
};

function renderEntity(entity) {
  const tbody = document.querySelector(`[data-table="${entity}"]`);
  if (!tbody) return;
  const rows = readRows(entity);
  tbody.innerHTML = rows.map(renderers[entity]).join("");
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
    rows.unshift(objectFromForm(form));
    writeRows(entity, rows);
    renderEntity(entity);
    toast("Запис додано");
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
