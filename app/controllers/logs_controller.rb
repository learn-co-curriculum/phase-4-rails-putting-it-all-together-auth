class LogsController < ApplicationController
  def index
    logs = Log.where(user_id: current_user.id)
    res = []

    logs.each do |log|
      exercise = log.exercise

      res << {
        title: exercise.title,
        description: exercise.description,
        repetition_type: log.repetition_type,
        repetition_count: log.repetition_count,
        log_date: log.log_date,
      }
    end

    render json: res.to_json
  end

  def show
    render json: @log.to_json
  end

  def update
    @log.update(**logs_params)
  end

  def create
    Log.create(user_id: current_user.id, log_date: DateTime.now, **logs_params)
  end

  def destroy
    @log.destroy
  end
  
  private

  def log
    @log = Log.find(params[:id])
  end

  def logs_params
    params.permit(:log_date, :repetition_type, :repetition_count, :exercise_id)
  end
end
