class LogsController < ApplicationController
  def index
    logs = Log.where(user_id: current_user.id)
    res = []

    logs.each do |log|
      exercise = log.exercise

      res << {
        id: log.id,
        title: exercise.title,
        exercise_id: exercise.id,
        description: exercise.description,
        repetition_type: log.repetition_type,
        repetition_count: log.repetition_count,
        log_date: log.log_date,
      }
    end

    render json: res.to_json
  end

  def show
    log = Log.find(params[:id])
    exercise = log.exercise

    render json: {
      id: log.id,
      exercise_id: exercise.id,
      title: exercise.title,
      description: exercise.description,
      repetition_type: log.repetition_type,
      repetition_count: log.repetition_count,
      log_date: log.log_date,
    }
  end

  def update
    Log.find(params[:id]).update(log_date: DateTime.now, **logs_params)
  end

  def create
    Log.create(user_id: current_user.id, log_date: DateTime.now, **logs_params)
  end

  def destroy
    log.destroy

    render :index
  end

  private

  def log
    Log.find(params[:id])
  end

  def logs_params
    params.permit(:repetition_type, :repetition_count, :exercise_id)
  end
end
