class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.integer :user_id
      t.string :title
      t.text :instructions
      t.integer :minutes_to_complete
      
      t.timestamps
    end
  end
end