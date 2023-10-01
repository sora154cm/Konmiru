// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
Turbo.session.drive = false

document.addEventListener('DOMContentLoaded', function() {
  // ～～画像選択に伴う処理開始～～
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
  // ～～画像選択に伴う処理終了～～
});