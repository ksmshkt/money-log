import { validateItemForm } from "./item-validate.js";
import { addItem, updateItem, deleteItem } from "./item-api.js";
import { form, deleteBtn, showAddModal, showEditModal, closeModal } from "./item-modal.js";

const monthPicker = document.getElementById("monthPicker");
const listView = document.getElementById("list-view");
const summaryView = document.getElementById("summary-view");
const tabButtons = document.querySelectorAll(".tab-btn");
let chartInstance;
const costInput = document.getElementById("cost");

document.querySelectorAll(".quick-cost button").forEach(btn => {
  btn.addEventListener("click", () => {
    const add = Number(btn.dataset.add);
    costInput.value = Number(costInput.value || 0) + add;
  });
});


// カレンダー年月選択時
if (monthPicker) {
  monthPicker.addEventListener("change", () => {
    const [year, month] = monthPicker.value.split("-");

    const url = `/money-log/items?year=${year}&month=${parseInt(month)}`;
    window.location.href = url;
  });
}

// テーブルクリック（編集時）
document.getElementById("items-body").addEventListener("click", e => {
  const row = e.target.closest('[data-item]');
  if (!row) return;

  showEditModal(row);
});

// 追加ボタン押下時
document.getElementById("itemAdd").addEventListener("click", () => {
  showAddModal();
});

// フォーム送信
form.addEventListener("submit", async function(e) {
  e.preventDefault();

  if (!validateItemForm()) return;

  const data = {
    id: form.id.value.trim(),
    name: form.name.value,
    cost: form.cost.value,
    spentAt: form.spentAt.value,
    categoryId: form.categoryId.value
  };

  if (data.id) {
    await updateItem(data.id, data);
  } else {
    await addItem(data);
  }

  closeModal();
});

// 削除ボタン押下時
deleteBtn.addEventListener("click", async () => {
  const id = form.id.value;
  if (!id) return;
  if (!confirm("本当に削除しますか？")) return;

  await deleteItem(id);
  closeModal();
});

// テーブルに要素追加
export function appendItem(item) {
  const [year, month] = monthPicker.value.split("-");

    const itemDate = new Date(item.spentAt);
    const itemYear = itemDate.getFullYear();
    const itemMonth = itemDate.getMonth() + 1;

    if (itemYear != year || itemMonth != month) {
      return;
    }

　items.unshift(item);

  const tbody = document.getElementById('items-body');
  const tr = document.createElement('tr');

  tr.dataset.item = '';
  tr.dataset.id = item.id;
  tr.dataset.name = item.name;
  tr.dataset.cost = item.cost;
  tr.dataset.spentAt = item.spentAt;
  tr.dataset.categoryId = item.categoryId;

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.cost}</td>
    <td>${item.spentAt}</td>
    <td>
      <span class="category-badge"
            style="background-color: ${item.categoryColor}">
        ${item.categoryName}
      </span>
    </td>
  `;

  tbody.prepend(tr);

  updateChart(items);
}

// テーブルに要素更新
export function updateRow(item) {
  const row = document.querySelector(`#items-body tr[data-id='${item.id}']`);
  if (!row) return;

  const tds = row.querySelectorAll('td');
  tds[0].textContent = item.name;
  tds[1].textContent = item.cost;
  tds[2].textContent = item.spentAt;
  tds[3].innerHTML = `
    <span class="category-badge"
          style="background-color: ${item.categoryColor}">
      ${item.categoryName}
    </span>
  `;

  row.dataset.name = item.name;
  row.dataset.cost = item.cost;
  row.dataset.spentAt = item.spentAt;
  row.dataset.categoryId = item.categoryId;

  const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
  }

    updateChart(items);
}

// テーブル要素削除
export function removeRow(id) {
  const row = document.querySelector(`#items-body tr[data-id='${id}']`);
  if (row) row.remove();

  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items.splice(index, 1);
  }

    updateChart(items);
}

// タブ切り替え時
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;

    if (tab === "list") {
      listView.style.display = "block";
      summaryView.style.display = "none";
    }

    if (tab === "summary") {
      listView.style.display = "none";
      summaryView.style.display = "block";

      if (!chartInstance) {
        createChart(items);
      }
    }

  });

});

// カテゴリ別集計
function buildCategorySummaries(items) {
  const map = {};

  items.forEach(item => {
    if (!map[item.categoryId]) {
      map[item.categoryId] = {
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        categoryColor: item.categoryColor,
        totalCost: 0
      };
    }
    map[item.categoryId].totalCost += item.cost;
  });

  return Object.values(map);
}

// グラフ作成
function createChart(items) {
  const summaries = buildCategorySummaries(items);
  const ctx = document.getElementById("categoryChart");

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: summaries.map(c => c.categoryName),
      datasets: [{
        data: summaries.map(c => c.totalCost),
        backgroundColor: summaries.map(c => c.categoryColor)
      }]
    },
    options: {
      responsive: true,
          maintainAspectRatio: false, // 親の高さ・幅に合わせる
          layout: {
            padding: {
              left: 0,
              right: 0
            }
          }
    }
  });
}

// グラフ更新
function updateChart(items) {
  if (!chartInstance) return;

  const summaries = buildCategorySummaries(items);

  chartInstance.data.labels =
    summaries.map(c => c.categoryName);

  chartInstance.data.datasets[0].data =
    summaries.map(c => c.totalCost);

  chartInstance.data.datasets[0].backgroundColor =
    summaries.map(c => c.categoryColor);

  chartInstance.update();
}