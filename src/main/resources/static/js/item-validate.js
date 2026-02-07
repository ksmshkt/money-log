/**
 * item フォームの入力値を検証する
 * @returns {boolean} true: OK / false: NG
 */
export function validateItemForm() {
  const name = document.getElementById("name").value.trim();
  const cost = document.getElementById("cost").value;

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

  return true;
}