class RecipesController < ApplicationController
  before_action :authenticate_user

  # ログインしていなかったらログイン画面にリダイレクトする
  def authenticate_user
    if @current_user == nil
      flash[:notice] = "ログインが必要です"
      redirect_to(login_path)
    end
  end
  
  def new
    @user = User.find(params[:user_id])
    @recipe = @user.recipes.build
  end

  def create
    @recipe = Recipe.new(recipe_params)
    respond_to do |format|
      if @recipe.save
        flash[:notice] = "レシピ登録が完了しました!"
        format.html { redirect_to user_recipe_path(@recipe.user, @recipe) }
        format.json { render json: { url: user_recipe_path(@recipe.user, @recipe) }, status: :created, location: @recipe }
      else
        format.html { render 'new' }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end
  
  private
  def recipe_params
    params.require(:recipe).permit(:user_id, :recipe_name, :recipe_image, :recipe_process, ingredients_attributes: [:id, :name, :_destroy])
  end
end
