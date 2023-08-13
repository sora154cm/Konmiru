class UsersController < ApplicationController
  before_action :authenticate_user, except: [:create, :new]

  # ログインしていなかったらログイン画面にリダイレクトする
  def authenticate_user
    if @current_user == nil
      flash[:notice] = "ログインが必要です"
      redirect_to(login_path)
    end
  end

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
      # ユーザー登録後、そのユーザーをログイン状態にする
      session[:user_id] = @user.id  
      flash[:notice] = "ユーザー登録が完了しました! あなたのIDは #{@user.login_key} です。"
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
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

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      # 成功した場合の処理
      flash[:notice] = "プロフィール編集が完了しました"
      redirect_to user_path(@user)
    else
      # 失敗した場合の処理
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:user_name, :profile_image)
  end

end
