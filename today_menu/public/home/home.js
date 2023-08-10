const form = document.getElementById('ingredient_search_form');
const ingredientNameInput = document.getElementById('ingredient_name');

form.addEventListener('submit', function(event) {
  if (ingredientNameInput.value.trim() === "") {
    event.preventDefault(); // 送信を阻止
    alert('食材名を入れて検索してください'); // ポップアップで警告を表示
  }
});