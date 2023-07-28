document.addEventListener('turbo:load', function() {
  // ~食材追加のフォーム追加や削除に伴う処理開始~
  function createNewIngredient(formCount) {
    // フォームを作成
    const newForm = document.createElement('input');
    newForm.type = 'text';
    // s食材のname属性の追加
    newForm.name = 'ingredients[]';  
    // ingredient-inputクラスを付与
    newForm.classList.add('ingredient-input'); 
    // ラベルを作成
    const newLabel = document.createElement('label');
    // label要素を食材():となるように定義
    newLabel.textContent = `食材(${formCount})：`;
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
    // 作成した(div)の中に子要素として作成したフォーム、ラベル、削除ボタンを入れる
    newFormContainer.appendChild(newLabel);
    newFormContainer.appendChild(newForm);
    newFormContainer.appendChild(deleteButton);
    // さらにingredient-additionクラスの中に子要素として入れる
    document.querySelector('.ingredient-addition').appendChild(newFormContainer);
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
    // すべての食材inputを取得
    let ingredientInputs = document.querySelectorAll('.ingredient-input');
    // 空の食材inputがないことを確認
    for (let i = 0; i < ingredientInputs.length; i++) {
      // 空の食材inputがあればアラートを出して処理を終了
      if (ingredientInputs[i].value == '') {
        alert('食材が空欄です！');
        return;
      }
    }
    // フォーム送信のデフォルトの動作を再開
    event.target.form.submit();
  });
  // ~食材追加のフォーム追加や削除に伴う処理終了~
});
