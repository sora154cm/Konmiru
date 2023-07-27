class Recipe < ApplicationRecord
  has_one_attached :recipe_image

  belongs_to :user
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  # レシピの登録や編集時にレシピ名の空白は許可しない
  validates :recipe_name, presence: true
  
  # フォームで食材を複数登録できるように設定
  accepts_nested_attributes_for :ingredients, allow_destroy: true
end
