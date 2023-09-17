class RecipesController < ApplicationController
  protect_from_forgery except: [:create, :update]
  before_action :authenticate_user

  # ログインしていなかったらログイン画面にリダイレクトする
  def authenticate_user
    if @current_user == nil
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
      # ingredient_nameは食材名、indexはその順序（0から始まる）params[:ingredients]は["食材1","食材2"]
      # 飛んできた配列データをもとにレシピと食材の関係性を中間テーブルに記録
      params[:ingredients].each_with_index do |ingredient_name, index|
        # 食材が既に存在するかチェック(重複した食材名が複数追加されないようにする)
        ingredient = Ingredient.find_or_create_by(ingredient_name: ingredient_name)
        # レシピと食材を関連付け、position(順番)フィールドを設定。
        # recipe:とingredient:はモデルで定義したところから
        RecipeIngredient.create(recipe: @recipe, ingredient: ingredient, position: index)
      end
      flash[:success] = "レシピ登録ができました!"
      redirect_to user_recipe_path(@recipe.user, @recipe)
    else
      # レンダリング後のリロード時にPOSTリクエストを行うのでレンダリングは使わない
      flash[:error] = "レシピ名を入力してください"
      redirect_to new_user_recipe_path(@current_user)
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    # 先に子の関係となるデータを削除
    @recipe.recipe_ingredients.destroy_all
    @recipe.destroy
    flash[:delete] = "レシピの削除が完了しました!"
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
    # レンダリング使用の為、edit ビューに戻る場合のために@user = User.find(params[:user_id])は必要
    @user = User.find(params[:user_id])
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

      flash[:edit] = "レシピ編集が完了しました!"
      redirect_to user_recipe_path(@recipe.user, @recipe)
    else
      # レンダリング後のリロード時にPOSTリクエストを行うのでレンダリングは使わない
      flash[:error] = "レシピ名を入力してください"
      redirect_to edit_user_recipe_path
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:recipe_name, :recipe_image, :recipe_process, :user_id)
  end
end
