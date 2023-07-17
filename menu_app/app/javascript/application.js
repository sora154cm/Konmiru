//= require jquery
//= require jquery_ujs

import "@hotwired/turbo-rails"
import "controllers"

import { Turbo } from "@hotwired/turbo-rails"
Turbo.session.drive = false

// レシピ登録ページの画像選択をひらく
$(document).ready(function() {
  $('.image').on('click', function() {
    $('#recipe_image').click();
  });

  // ファイルが選択されたら、選択された画像をプレビュー表示
  $('#recipe_image').on('change', function(display) {
    let reader = new FileReader();
    reader.onload = function(display) {
      $('.image').attr('src', display.target.result);
    }
    reader.readAsDataURL(display.target.files[0]);
  });

});


//JavaScriptの処理をDOMContentLoadedイベントに紐づけて、HTMLの読み込みが終わってからJavaScriptが実行
document.addEventListener('DOMContentLoaded', (event) => {

  function createNewIngredient(formCount) {
    const newForm = document.createElement('input');
    newForm.type = 'text';

    newForm.classList.add('ingredient-input');  // 新しいinputにclassを追加

    const newLabel = document.createElement('label');
    newLabel.textContent = `食材(${formCount})：`;

    // 新しい削除ボタンを作成
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.classList.add('delete-ingredient-button');  // 削除ボタンにclassを追加
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      newFormContainer.remove();
    });
    // 新しいフォームと削除ボタンを含むコンテナを作成
    const newFormContainer = document.createElement('div');
    newFormContainer.appendChild(newLabel);
    newFormContainer.appendChild(newForm);
    newFormContainer.appendChild(deleteButton);

    document.querySelector('.ingredient-addition').appendChild(newFormContainer);
  }

  // 食材を追加ボタンを押すとフォームが追加
  document.querySelector('.add-ingredient-button').addEventListener('click', () => {
    const formCount = document.querySelectorAll('.ingredient-input').length + 1;
    createNewIngredient(formCount);
  });
});


