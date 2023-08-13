class RecipesController < ApplicationController
  protect_from_forgery except: [:create, :update]
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
    if @recipe.save
      params[:ingredients].each_with_index do |ingredient_name, index|
        # 食材が既に存在するかチェック
        ingredient = Ingredient.find_or_create_by(ingredient_name: ingredient_name)
        # レシピと食材を関連付け、positionフィールドを設定
        RecipeIngredient.create(recipe: @recipe, ingredient: ingredient, position: index)
      end
      flash[:notice] = "レシピ登録ができました!"
      redirect_to user_recipe_path(@recipe.user, @recipe)
    else
      flash[:alert] = @recipe.errors.full_messages
      redirect_to new_user_recipe_path
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    # 先に子の関係となるデータを削除
    @recipe.recipe_ingredients.destroy_all
    @recipe.destroy
    flash[:notice] = "レシピの削除が完了しました!"
    redirect_to index_path
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
      @recipe.recipe_ingredients.order(:position).each_with_index do |recipe_ingredient, index|
        ingredient = recipe_ingredient.ingredient
        if params[:ingredients][index].blank?
          # 先に関連付けられている RecipeIngredient を削除
          recipe_ingredient.destroy
        else
          # 食材が既に存在するかチェックし、なければ作成
          ingredient = Ingredient.find_or_create_by(ingredient_name: params[:ingredients][index])
          recipe_ingredient.update(ingredient: ingredient, position: index) # positionとingredientの更新
        end
      end

      # 新規に追加された食材の処理
      if params[:ingredients].length > @recipe.recipe_ingredients.count
        params[:ingredients][@recipe.recipe_ingredients.count..-1].each_with_index do |ingredient_name, index|
          # 食材が既に存在するかチェックし、なければ作成
          ingredient = Ingredient.find_or_create_by(ingredient_name: ingredient_name)
          # レシピと食材を関連付け、positionフィールドを設定
          RecipeIngredient.create(recipe: @recipe, ingredient: ingredient, position: @recipe.recipe_ingredients.count + index)
        end
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
