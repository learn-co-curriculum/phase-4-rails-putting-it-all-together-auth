class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description

  has_many :logs
end
