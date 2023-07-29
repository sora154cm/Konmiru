
// ~食材追加のフォーム追加や削除に伴う編集処理開始~
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
  newLabel.textContent = `食材(${formCount}):`;
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
  // すべての食材inputを取得
  let ingredientInputs = document.querySelectorAll('.ingredient-input');
  // 空の食材inputがないことを確認
  for (let i = 0; i < ingredientInputs.length; i++) {
    // 空の食材inputがあればアラートを出して処理を終了
    if (ingredientInputs[i].value == '') {
      alert('食材を一つ以上入力してください');
      return;
    }
    // ここで各食材に対して createIngredient を呼び出す
    createIngredient(userId, recipeId, ingredientInputs[i].value);
  }
  // フォーム送信のデフォルトの動作を再開
  event.target.form.submit();
});

function deleteIngredient(ingredientId) {
  // 対象となる要素を取得
  var targetElement = document.getElementById('ingredient_' + ingredientId);

  // 対象の要素が存在する場合、その要素を親要素から削除
  if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
  }
}

// 食材の追加を行う関数
function createIngredient(user_id, recipe_id, ingredient_name) {
  fetch(`/users/${user_id}/recipes/${recipe_id}/create_ingredient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredient_name: ingredient_name })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Ingredient created with ID:', data.id);
  })
  .catch(error => console.error('Error:', error));
}

// 食材の削除を行う関数
function deleteIngredientAjax(user_id, recipe_id, ingredient_id) {
  fetch(`/users/${user_id}/recipes/${recipe_id}/delete_ingredient`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredient_id: ingredient_id })
  })
  .then(() => {
    console.log('Ingredient deleted with ID:', ingredient_id);
  })
  .catch(error => console.error('Error:', error));
}


// ~食材追加のフォーム追加や削除に伴う編集処理終了~