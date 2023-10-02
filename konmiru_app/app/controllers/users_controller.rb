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
    @all_recipe = Recipe.all.page(params[:page]).per(8)
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
      redirect_to index_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def result_all
    # ユーザーやレシピ情報の取得
    @user = User.all
    @all_recipe = Recipe.all
    # ユーザーが入力または送信した食材名を、HTTPリクエストのparamsから取得
    @ingredient_name = params[:ingredient_name]
    # @ingredient_nameと一致するingredient_nameを持つレコードを検索
    @ingredient = Ingredient.find_by(ingredient_name: @ingredient_name)
        
    if @ingredient
      # N+1問題を解消するため、includesメソッドを使用
      @recipes = @ingredient.recipes.includes(:user, :recipe_image_attachment).page(params[:page]).per(8)
    end
  end

  def result_current
    # ユーザーが入力または送信した食材名を、HTTPリクエストのparamsから取得
    @ingredient_name = params[:ingredient_name]
  
    # ログインしているユーザーが作成したレシピの中で、指定された食材を使用しているレシピを検索
    # @ingredient_nameに一致する食材を使用しているレシピを絞り込む
     # includesメソッド使用で@recipes内の各レシピに関連付けられた情報(ユーザー・画像等)を一度のクエリで事前読み込み
    @recipes = @current_user.recipes.joins(:recipe_ingredients => :ingredient)
                                 .where(ingredients: { ingredient_name: @ingredient_name }) 
                                 .includes(:user, :recipe_image_attachment)
                                 .page(params[:page]).per(8)
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
