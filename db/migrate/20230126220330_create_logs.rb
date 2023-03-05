class CreateLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :logs do |t|
      t.string :log_date
      t.string :repetition_type
      t.integer :repetition_count
      t.timestamps
    end
  end
end
