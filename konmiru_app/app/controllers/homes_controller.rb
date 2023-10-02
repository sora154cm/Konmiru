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
    # N+1問題を解消
    @current_user_recipes = @current_user.recipes.with_attached_recipe_image.page(params[:page]).per(8) 
    # .page(params[:page]).per(8)#により 1ページあたり8項目表示
  end

  def top
    
  end
  
end
