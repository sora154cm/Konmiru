class HomesController < ApplicationController

  # ページにアクセスする前にauthenticate_userを実行
  before_action :authenticate_user

  # ログインしていなかったらログイン画面にリダイレクトする
  def authenticate_user
    if @current_user == nil
      flash[:notice] = "ログインが必要です"
      redirect_to login_path
    end
  end

  def top
    @users =User.all
    # N+1問題を解消
    @current_user.recipes = @current_user.recipes.with_attached_recipe_image
  end
  
end
