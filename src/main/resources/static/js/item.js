import { validateItemForm } from "./item-validate.js";
import { addItem, updateItem, deleteItem } from "./item-api.js";
import { form, deleteBtn, showAddModal, showEditModal, closeModal } from "./item-modal.js";

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
}

// テーブル要素削除
export function removeRow(id) {
  const row = document.querySelector(`#items-body tr[data-id='${id}']`);
  if (row) row.remove();
}