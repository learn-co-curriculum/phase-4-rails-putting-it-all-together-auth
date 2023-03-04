class ExercisesController < ApplicationController
  def index
    exercises = Exercise.all
    render json: exercises.to_json, status: :ok
  end

  def show
    render json: exercise.to_json
  end

  def update
    @exercise.update(**exercise_params)
  end

  def create
    Exercise.create(**exercise_params)
  end

  def destroy
    @exercise.destroy
  end

  private

  def exercise
    @exercise = Exercise.find(params[:id])
  end

  def exercise_params
    params.permit(:title, :description)
  end
end
