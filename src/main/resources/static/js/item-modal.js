const overlay = document.getElementById("modalOverlay");
const categorySelect = document.getElementById("categoryId");
const categoryPreview = document.getElementById("categoryPreview");
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

// カテゴリ選択時の色同期
const updateCategoryPreview = () => {
  const selectedOption = categorySelect.selectedOptions[0];
  const color = selectedOption?.dataset.color;
  categoryPreview.style.backgroundColor = color || "#ccc";
}

categorySelect.addEventListener("change", updateCategoryPreview);

// モーダル表示（追加時）
export const showAddModal = () => {
  form.reset();
  categoryPreview.style.backgroundColor = "#ccc";
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
  categorySelect.value = row.dataset.categoryId;

  updateCategoryPreview();

  deleteBtn.style.display = "inline-block";
  openModal();
};

export { form, deleteBtn };