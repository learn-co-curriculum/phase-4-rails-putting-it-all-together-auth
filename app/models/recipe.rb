class Recipe < ApplicationRecord
    belongs_to :user 
    
    validates :title, presence:true
    validates :instructions, presence:true, length: {minimum:50}
end
