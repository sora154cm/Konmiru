import "@hotwired/turbo-rails"
import "controllers"

//= require jquery
//= require jquery_ujs

// ~レシピ登録ページの画像選択に伴う処理開始~

// HTML要素がまだ読み込まれていない可能性があるので。すべてのHTMLがロードされた後に実行
document.addEventListener('DOMContentLoaded', function() {
  // .imageクラスを持つすべての要素を選択
  let imageElems = document.querySelectorAll('.image');
  // 選択した各.image要素に対して処理
  imageElems.forEach(function(imageElem) {
    // .image要素がクリックされたときの動作を定義
    imageElem.addEventListener('click', function() {
      // #recipe_imageのIDを持つ要素を選択
      let recipeImageElem = document.getElementById('recipe_image');
      // #recipe_imageをクリック
      // image" 要素をクリックしたときに、"#recipe_image" 要素のクリックイベントを発生させる
      recipeImageElem.click();
    });
  });


  // ファイルが選択されたら、選択された画像を表示
  // #recipe_imageのIDを持つ要素を選択
  let recipeImageElem = document.getElementById('recipe_image');
  // ファイル選択フォームの内容が変更（新しくファイルが選択）されたときの動作を定義
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

});
// ~レシピ登録ページの画像選択に伴う処理終了~

// ~食材追加のフォーム追加や削除に伴う処理開始~
// JavaScriptの処理をDOMContentLoadedイベントに紐づけて、HTMLの読み込みが終わってからJavaScriptが実行
document.addEventListener('DOMContentLoaded', (event) => {

  function createNewIngredient(formCount) {
    // フォームを作成
    const newForm = document.createElement('input');
    newForm.type = 'text';
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
});
// ~食材追加のフォーム追加や削除に伴う処理終了~






