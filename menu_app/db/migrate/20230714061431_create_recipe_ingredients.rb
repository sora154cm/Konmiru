class CreateRecipeIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_ingredients, id: false do |t|
      t.references :recipe, foreign_key: true
      t.references :ingredient, foreign_key: true
    end
  end
end
