class AddExerciseReferenceToLogs < ActiveRecord::Migration[6.1]
  def change
    add_reference :logs, :exercise, foreign_key: true
  end
end
