const overlay = document.getElementById("modalOverlay");
const form = document.getElementById("itemForm");
const deleteBtn = document.getElementById("deleteBtn");
const closeBtn = document.getElementById("closeModalBtn");
const spentAtInput = document.getElementById("spentAt");

export const openModal = () => overlay.style.display = "flex";
export const closeModal = () => overlay.style.display = "none";

// 閉じる（×）
closeBtn.addEventListener("click", () => closeModal());

// 背景クリックで閉じる
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// モーダル表示（追加時）
export const showAddModal = () => {
  form.reset();
  deleteBtn.style.display = "none";
  spentAtInput.value = new Date().toISOString().split("T")[0];
  openModal();
};

// モーダル表示（編集時）
export const showEditModal = (row) => {
  const { id, name, cost, spentAt, categoryId } = row.dataset;

  form.id.value = id;
  form.name.value = name;
  form.cost.value = cost;
  form.spentAt.value = spentAt;
  form.categoryId.value = categoryId;

  deleteBtn.style.display = "inline-block";
  openModal();
};

export { form, deleteBtn };