document.addEventListener("turbo:load", function() {
  const ingredientSearchForm = document.getElementById('ingredient_search_form');
  const ingredientNameField = document.getElementById('ingredient_name');

  ingredientSearchForm.addEventListener('submit', function(event) {
    if (ingredientNameField.value.trim() === "") {
      event.preventDefault(); // 送信を阻止
      alert('食材名を入れて検索してください'); // ポップアップで警告を表示
    }
  });
});