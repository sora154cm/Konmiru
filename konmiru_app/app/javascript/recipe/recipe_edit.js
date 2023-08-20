document.addEventListener("turbo:load", function() {

  // ~画像選択に伴う処理開始~
  // .imageクラスを持つすべての要素を選択
  let imageElems = document.querySelectorAll('.image');
  // 選択した各.image要素に対して処理
  imageElems.forEach(function(imageElem) {
    // .image要素がクリックされたときの動作を定義
    imageElem.addEventListener('click', function() {
      // #recipe_imageのIDを持つ要素を選択
      let recipeImageElem = document.getElementById('recipe_image');
      if(recipeImageElem) {
        // #recipe_imageをクリック
        // image" 要素をクリックしたときに、"#recipe_image" 要素のクリックイベントを発生させる
        recipeImageElem.click();
      }
    });
  });
  // ファイルが選択されたら、選択された画像を表示
  // #recipe_imageのIDを持つ要素を選択
  let recipeImageElem = document.getElementById('recipe_image');
  // ファイル選択フォームの内容が変更（新しくファイルが選択）されたときの動作を定義
  if(recipeImageElem) {
    recipeImageElem.addEventListener('change', function(event) {
      // 選択したファイルの読み込みを行うためにFileReaderオブジェクトを作成
      let reader = new FileReader();
      // ファイルが読み込まれたときの動作を定義
      reader.onload = function(e) {
        // ".image" クラスを持つすべての要素を選択
        let imageElems = document.querySelectorAll('.image');
        // 選択した各.image要素に対して以下の処理を行う
        imageElems.forEach(function(imageElem) {
          // 選択したファイルのDataURL(Base64形式の文字列)を.image要素のsrc属性にセット
          imageElem.src = e.target.result;
        });
      };
      // 選択したファイルをDataURLとして読み込み
      reader.readAsDataURL(event.target.files[0]);
    });
  };
  // ~画像選択に伴う処理終了~

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