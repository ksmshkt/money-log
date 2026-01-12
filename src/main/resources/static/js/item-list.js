const overlay = document.getElementById("modalOverlay");

// 開く
document.getElementById("itemAdd").addEventListener("click", () => {
  overlay.style.display = "flex";
});

// 閉じる（×）
document.getElementById("closeModalBtn").addEventListener("click", () => {
  overlay.style.display = "none";
});

// 背景クリックで閉じる
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

document.getElementById("itemForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    cost: document.getElementById("cost").value,
  };

  await registerItem(data);

  closeModal();
});

async function registerItem(data) {
  const res = await fetch('/api/items/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const item = await res.json();

  // 既存の items に追加
  // items.push(newItem);

  // テーブル再描画
  // renderTable();
}