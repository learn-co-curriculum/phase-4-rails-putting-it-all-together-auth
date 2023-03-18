class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :image_url, :bio

  has_many :logs
  has_many :exercises, through: :logs
end
