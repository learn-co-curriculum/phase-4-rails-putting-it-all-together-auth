class SessionsController < ApplicationController
    before_action :authenticate
    skip_before_action :authenticate, only: [:create]
    


    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: {errors: ["Invalid Email or Password"]}, status: :unauthorized
        end
    end


    def destroy
        session.delete :user_id
        head :no_content
    end

end
