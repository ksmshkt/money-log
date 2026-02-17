/**
 * item フォームの入力値を検証する
 * @returns {boolean} true: OK / false: NG
 */
export function validateItemForm() {
  const name = document.getElementById("name").value.trim();
  const cost = document.getElementById("cost").value;
  const spentAt = document.getElementById("spentAt").value;
  const categoryId = document.getElementById("categoryId").value;

  if (!name) {
    alert("item を入力してください");
    return false;
  }

  if (name.length > 255) {
    alert("item は255文字以内で入力してください");
    return false;
  }

  if (!cost) {
    alert("cost を入力してください");
    return false;
  }

  if (Number(cost) < 0) {
    alert("cost は0以上の数値を入力してください");
    return false;
  }

  if (!spentAt) {
    alert("spentAt を入力してください");
    return false;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(spentAt)) {
    alert("作成日は yyyy-MM-dd 形式で入力してください");
    return false;
  }

  if (!categoryId) {
    alert("category を選択してください");
    return false;
  }

  return true;
}