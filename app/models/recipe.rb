class Recipe < ApplicationRecord
    validates :title, presence: true
    validates :instructions, length: {minimum: 50}
    belongs_to :user
end
