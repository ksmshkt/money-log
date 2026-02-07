import { validateItemForm } from "./item-validate.js";

const overlay = document.getElementById("modalOverlay");
const form = document.getElementById("itemForm");
const openModal = () => overlay.style.display = "flex";
const closeModal = () => overlay.style.display = "none";

// 閉じる（×）
document.getElementById("closeModalBtn").addEventListener("click", () => {
  closeModal();
});

// 背景クリックで閉じる
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
　　　closeModal();
  }
});

// モーダル表示（追加時）
document.getElementById("itemAdd").addEventListener("click", e => {
  form.reset();
  openModal();
})

// モーダル表示（編集時）
document.getElementById("items-body").addEventListener("click", e => {
  const row = e.target.closest('[data-item]');
  if (!row) return;

  const { id, name, cost } = row.dataset;

  form.id.value = id;
  form.name.value = name;
  form.cost.value = cost;

  openModal();
})

// フォーム送信時
document.getElementById("itemForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  if (!validateItemForm()) return;

  const data = {
    id: document.getElementById("id").value.trim(),
    name: document.getElementById("name").value,
    cost: document.getElementById("cost").value,
  };

  if (data.id) {
      await updateItem(data.id, data);
    } else {
      await addItem(data);
    }

    closeModal();
});

// 追加API呼び出し
async function addItem(data) {
  const res = await fetch('/expenses-manager/api/items/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
      alert('登録失敗');
      return;
    }

  const item = await res.json();
  appendItem(item);
}

// 更新API呼び出し
async function updateItem(id, data) {
  const res = await fetch(`/expenses-manager/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    alert('更新失敗');
    return;
  }

  const item = await res.json();
  updateRow(item);
}

// 追加した項目を一覧に追加
const appendItem = item => {
  const tbody = document.getElementById('items-body');
  const tr = document.createElement('tr');

  tr.dataset.item = '';
  tr.dataset.id = item.id;
  tr.dataset.name = item.name;
  tr.dataset.cost = item.cost;

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.cost}</td>
    <td>${item.createdAt}</td>
  `;

  tbody.prepend(tr);
};

// 更新した項目の表示反映
function updateRow(item) {
  const row = document.querySelector(`#items-body tr[data-id='${item.id}']`);
  if (!row) return;

  const tds = row.querySelectorAll('td');
  tds[0].textContent = item.name;
  tds[1].textContent = item.cost;
  tds[2].textContent = item.createdAt;

  row.dataset.name = item.name;
  row.dataset.cost = item.cost;
}