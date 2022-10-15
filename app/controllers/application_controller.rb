class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :authenticate
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  private

  def authenticate
    return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
  end


  def render_unprocessable_entity_response(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

end