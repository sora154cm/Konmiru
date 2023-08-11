class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :login_key
      t.string :password_hash
      t.string :user_name
      t.string :profile_image

      t.timestamps
    end
  end
end
