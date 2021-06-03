require "rails_helper"

RSpec.describe User, type: :model do
  it "can be created successfully with valid data" do
    user = User.create(username: "test_user", password: "sup3r-secret", image_url: "https://via.placeholder.com/150", bio: "bio")
    expect(user).to be_valid
  end

  it "has many recipes" do
    expect(User.new).to respond_to(:recipes)
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_uniqueness_of(:username) }
  end

  describe "authenticate" do
    it "returns the user if credentials match" do
      user = User.create(username: "test_user", password: "sup3r-secret", image_url: "https://via.placeholder.com/150", bio: "bio")
      expect(user.authenticate("sup3r-secret")).to eq(user)
    end
    
    it "returns false if credentials don't match" do
      user = User.create(username: "test_user", password: "sup3r-secret", image_url: "https://via.placeholder.com/150", bio: "bio")
      expect(user.authenticate("nope")).to be(false)
    end
  end
end
