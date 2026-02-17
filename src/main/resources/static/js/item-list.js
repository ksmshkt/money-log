import { validateItemForm } from "./item-validate.js";

const overlay = document.getElementById("modalOverlay");
const form = document.getElementById("itemForm");
const openModal = () => overlay.style.display = "flex";
const closeModal = () => overlay.style.display = "none";
const deleteBtn = document.getElementById("deleteBtn");

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
  deleteBtn.style.display = "none";
  document.getElementById("spentAt").value = new Date().toISOString().split("T")[0];
  openModal();
})

// モーダル表示（編集時）
document.getElementById("items-body").addEventListener("click", e => {
  const row = e.target.closest('[data-item]');
  if (!row) return;

  const { id, name, cost, spentAt, categoryId } = row.dataset;

  form.id.value = id;
  form.name.value = name;
  form.cost.value = cost;
  form.spentAt.value = spentAt;
  form.categoryId.value = categoryId;

  deleteBtn.style.display = "inline-block";
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
    spentAt: document.getElementById("spentAt").value,
    categoryId: form.categoryId.value
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
  const res = await fetch('/money-log/api/items/add', {
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
  const res = await fetch(`/money-log/api/items/${id}`, {
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

// 削除API呼び出し
deleteBtn.addEventListener("click", async () => {
  const id = form.id.value;
  if (!id) return;

  if (!confirm("本当に削除しますか？")) return;

  const res = await fetch(`/money-log/api/items/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      alert('削除失敗');
      return;
    }

  removeRow(id);
  closeModal();
});

// 追加した項目を一覧に追加
const appendItem = item => {
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
    <td>${item.categoryName}</td>
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
  tds[2].textContent = item.spentAt;
  tds[3].textContent = item.categoryName;

  row.dataset.name = item.name;
  row.dataset.cost = item.cost;
  row.dataset.spentAt = item.spentAt;
  row.dataset.spentAt = item.categoryId;
}

// 画面から行を削除
function removeRow(id) {
  const row = document.querySelector(`#items-body tr[data-id='${id}']`);
  if (row) {
    row.remove();
  }
}