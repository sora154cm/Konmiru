// Submitボタンの取得
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', function(e) {
  // ユーザー名のinputフィールドを取得
  const userNameField = document.querySelector('.profile-name-field');
  // ユーザー名が空かどうかチェック
  if (userNameField.value.trim() === "") {
      // デフォルトのsubmit動作を停止
      e.preventDefault();
      // アラートを表示
      alert('ユーザー名を入力してください');
  }
});