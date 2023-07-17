class RecipesController < ApplicationController
  def new
    @user = User.find(params[:user_id])
    @recipe = @user.recipes.build
  end

  def create
    
  end
  

end
