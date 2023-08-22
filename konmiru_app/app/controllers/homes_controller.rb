class HomesController < ApplicationController

  # ページにアクセスする前にauthenticate_userを実行(indexアクションのみ指定)
  before_action :authenticate_user, only: [:index]

  # ログインしていなかったらログイン画面にリダイレクトする
  def authenticate_user
    if @current_user == nil
      redirect_to login_path
    end
  end

  def index
    @users =User.all
    # N+1問題を解消
    @current_user.recipes = @current_user.recipes.with_attached_recipe_image
    @recipe = Recipe.first
  end

  def top
    
  end
  
end
