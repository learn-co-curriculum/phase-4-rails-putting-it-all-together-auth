require "rails_helper"

RSpec.describe Recipe, type: :model do
  it "can be created with valid data" do
    user = User.create(username: "test_user", password: "sup3r-secret", image_url: "https://via.placeholder.com/150", bio: "bio")
    recipe = Recipe.new(
      user_id: user.id,
      title: "Rice", 
      instructions: "Measure 1 cup of rice in bowl of rice cooker. Wash rice. Fill with water to level indicated by manufacturer. Put bowl in rice cooker. Press 'Cook'. Enjoy!",
      minutes_to_complete: 10
    )
    expect(recipe).to be_valid
  end
  
  describe "validations" do
    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_length_of(:instructions).is_at_least(50) }
  end
end
