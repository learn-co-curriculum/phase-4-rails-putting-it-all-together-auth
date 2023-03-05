class AddUserReferenceToLogs < ActiveRecord::Migration[6.1]
  def change
    add_reference :logs, :user, foreign_key: true
  end
end
