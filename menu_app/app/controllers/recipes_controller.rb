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
    @recipe = Recipe.new
    @recipe = @user.recipes.build
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      params[:ingredients].each do |ingredient_name|
        # 食材が既に存在するかチェック
        ingredient = Ingredient.find_or_create_by(ingredient_name: ingredient_name)
        # レシピと食材を関連付け
        RecipeIngredient.create(recipe: @recipe, ingredient: ingredient)
      end
      flash[:notice] = "レシピ登録ができました!"
      redirect_to user_recipe_path(@recipe.user, @recipe)
    else
      render :new
    end
  end

  def show
    @user = User.find(params[:user_id])
    @recipe = Recipe.find(params[:id])
  end

  def edit
    @user = User.find(params[:user_id])
    @recipe = Recipe.find(params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      @recipe.ingredients.each_with_index do |ingredient, index|
        ingredient.update(ingredient_name: params[:ingredients][index])
      end
      flash[:notice] = "レシピ編集が完了しました!"
      redirect_to user_recipe_path(@recipe.user, @recipe)
    else
      render :edit
    end
  end
  

  private

  def recipe_params
    params.require(:recipe).permit(:recipe_name, :recipe_image, :recipe_process, :user_id)
  end
end
