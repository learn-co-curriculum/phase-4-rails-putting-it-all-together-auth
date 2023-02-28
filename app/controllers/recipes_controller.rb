class RecipesController < ApplicationController
    before_action :authorize

    def index
        render json: Recipe.all, include: :user, status: :created
    end

    # def create
    #     recipe = Recipe.create!(title: params[:title], instructions: params[:instructions], minutes_to_complete: params[:minutes_to_complete], user_id: session[:user_id])
    #     render json: recipe, status: :created
    # rescue ActiveRecord::RecordInvalid => invalid
    #     render json: { errors: [invalid.record.errors] }, status: :unprocessable_entity
    # end
    def create
        user = User.find_by(id: session[:user_id])
        recipe = user.recipes.create(recipe_params)
  
        if recipe.valid?
           recipe.save
           render json: recipe, include: :user, status: :created
        else
           render json: {errors: recipe.errors.full_messages}, status: :unprocessable_entity
        end
  
    end


    private
    
    def authorize
        return render json: { errors: ["Unauthorized"] }, status: :unauthorized unless session.include? :user_id
    end

    def recipe_params
        params.permit(:title, :instructions, :minutes_to_complete)
    end
end
