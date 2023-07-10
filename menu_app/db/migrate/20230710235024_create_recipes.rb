class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.integer :user_id
      t.string :recipe_name
      t.string :recipe_image
      t.text :recipe_process

      t.timestamps
    end
    add_foreign_key :recipes, :users
    add_index :recipes, :user_id
  end
end
