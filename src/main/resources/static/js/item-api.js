import { appendItem, updateRow, removeRow } from "./item.js";

// 追加
export async function addItem(data) {
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

// 更新
export async function updateItem(id, data) {
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

// 削除
export async function deleteItem(id) {
  const res = await fetch(`/money-log/api/items/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    alert('削除失敗');
    return;
  }

  removeRow(id);
}