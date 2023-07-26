class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def all
    @user = User.all
    @all_recipe = Recipe.all
  end
  

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(login_key: params[:login_key], password: params[:password])

    if @user.save
      flash[:notice] = "ユーザー登録が完了しました!あなたのIDは #{@user.login_key} です。"
      redirect_to root_path
    else
      # Turboはリダイレクトを期待しているため
      # リダイレクト後にエラーメッセージを表示するためにフラッシュメッセージの方法をとる必要がある
      flash[:alert] = @user.errors.full_messages
      redirect_to signup_path
    end
  end

  def result
    @ingredient_name = params[:ingredient_name]
    @ingredient = Ingredient.find_by(ingredient_name: @ingredient_name)
      
    if @ingredient
      # N+1問題を解消するため、includesメソッドを使用
      @recipes = @ingredient.recipes.includes(:user, :recipe_image_attachment)
    else
      @recipes = []
      flash[:alert] = "該当する食材が見つかりませんでした"
    end
  end

end
