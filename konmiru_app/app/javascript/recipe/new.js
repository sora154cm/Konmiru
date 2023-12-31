document.addEventListener('DOMContentLoaded', function() {

  // ~食材追加のフォーム追加や削除に伴う処理開始~
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
    deleteButton.addEventListener('click', (event) => {
      newFormContainer.remove();
    });
    // 新しいフォームと削除ボタンを含むための(div)を作成
    const newFormContainer = document.createElement('div');
    // 作成した(div)にingredient-name-fieldクラスを追加
    newFormContainer.classList.add('ingredient-name-field');
    // 作成した(div)の中に子要素として作成したフォーム、ラベル、削除ボタンを入れる
    newFormContainer.appendChild(newLabel);
    newFormContainer.appendChild(newForm);
    // 最初のフォームでなければ削除ボタンも追加
    if (formCount !== 1) {
      newFormContainer.appendChild(deleteButton);
    }
    // さらに.ingredient-listクラスの中に子要素として入れる
    document.querySelector('.ingredient-list').appendChild(newFormContainer);
  }

  // 食材を追加ボタンを押すとフォームが追加
  document.querySelector('.add-ingredient-button').addEventListener('click', () => {
    // .ingredient-input要素の数に+1をした要素の数を取得
    const formCount = document.querySelectorAll('.ingredient-input').length + 1;
    createNewIngredient(formCount);
  });

  // Submitボタンをクリックしたときの動作を定義
  document.getElementById('submit-button').addEventListener('click', (event) => {
    // フォーム送信のデフォルトの動作を一旦停止
    event.preventDefault();

    // 食材入力時に空であればアラートを出す
    // すべての食材inputを取得
    let ingredientInputs = document.querySelectorAll('.ingredient-input');
    // 空の食材inputがないことを確認
    for (let i = 0; i < ingredientInputs.length; i++) {
      // 空の食材inputがあればアラートを出す
      if (ingredientInputs[i].value == '') {
        alert('入力されてない食材名があります');
        return; // リターンにより処理を中断
      }
    }
    // フォーム送信のデフォルトの動作を再開
    event.target.form.submit();
  });
  // ページが読み込まれたときに最初のフォームを表示
  createNewIngredient(1);
  // ~食材追加のフォーム追加や削除に伴う処理終了~
});

