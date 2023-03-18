class ExercisesController < ApplicationController
  def index
    exercises = Exercise.all
    render json: exercises.to_json, status: :ok
  end

  def show
    exercise = Exercise.find(params[:id])
    render json: exercise
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
    params.permit(:id, :title, :description)
  end
end
