class Recipe < ApplicationRecord
  has_one_attached :recipe_image

  belongs_to :user
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  
  # フォームで食材を複数登録できるように設定
  accepts_nested_attributes_for :ingredients, allow_destroy: true
end
