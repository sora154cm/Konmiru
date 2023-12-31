document.addEventListener('DOMContentLoaded', function() {
  // HTMLからIDを取得
  window.userId = document.getElementById('user_id').value;
  window.recipeId = document.getElementById('recipe_id').value;

  // 選択した食材の要素を削除する関数を定義
  window.deleteIngredient = function(ingredientId) {
    var ingredientDiv = document.getElementById(`ingredient_${ingredientId}`);
    ingredientDiv.remove();
  };

  // ~食材追加のフォーム追加や削除に伴う編集処理開始~
  function createNewIngredient(formCount) {
    // フォームを作成
    const newForm = document.createElement('input');
    newForm.type = 'text';
    // 食材のname属性の追加
    newForm.name = 'ingredients[]';  
    // ingredient-inputクラスを付与
    newForm.classList.add('ingredient-input'); 
    // プレースホルダーを追加
    newForm.placeholder = "食材名を入力";
    // ラベルを作成
    const newLabel = document.createElement('label');
    // label要素を食材()となるように定義
    newLabel.textContent = `食材(${formCount})`;

    // 新しい削除ボタンを作成
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    // 削除ボタンにdelete-ingredient-buttonクラスを付与
    deleteButton.classList.add('delete-ingredient-button');  
    deleteButton.type = 'button';  // フォーム送信を防ぐためにボタンのタイプを指定
    deleteButton.addEventListener('click', (event) => {
      newFormContainer.remove();
    });

    // 新しいフォームと削除ボタンを含むための(div)を作成
    const newFormContainer = document.createElement('div');
    // ここでingredient-name-fieldクラスを追加
    newFormContainer.classList.add('ingredient-name-field');
    // 作成した(div)の中に子要素として作成したフォーム、ラベル、削除ボタンを入れる
    newFormContainer.appendChild(newLabel);
    newFormContainer.appendChild(newForm);
    // 最初のフォームでなければ削除ボタンも追加
    if (formCount !== 1) {
      newFormContainer.appendChild(deleteButton);
    }
    // さらにingredient-listクラスの中に子要素として入れる
    document.querySelector('.ingredient-list').appendChild(newFormContainer);
  }

  // 食材を追加ボタンを押すとフォームが追加
  document.addEventListener('click', function(event) {
    if (event.target.matches('.add-ingredient-button')) {
      // .ingredient-input要素の数に+1をした要素の数を取得
      const formCount = document.querySelectorAll('.ingredient-input').length + 1;
      createNewIngredient(formCount);
    }
  });

  // Submitボタンをクリックしたときの動作を定義
  document.getElementById('submit-button').addEventListener('click', (event) => {
    // フォーム送信のデフォルトの動作を一旦停止
    event.preventDefault();

    //食材入力時に空であればアラートを出す
    // すべての食材inputを取得
    let ingredientInputs = document.querySelectorAll('.ingredient-input');
    // 空の食材inputがないことを確認
    for (let i = 0; i < ingredientInputs.length; i++) {
      // 空の食材inputがあればアラートを出して処理を終了
      if (ingredientInputs[i].value == '') {
        alert('入力されてない食材名があります');
        return;
      }
    }
    // フォーム送信のデフォルトの動作を再開
    event.target.form.submit();
  });
  // ~食材追加のフォーム追加や削除に伴う編集処理終了~
});