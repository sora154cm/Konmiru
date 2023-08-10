class ApplicationController < ActionController::Base
  # 全てのコントローラーにおいてアクション実行前にset_current_userを行う
  before_action :set_current_user

  # 現在ログインしているユーザーを定義
  def set_current_user
    # session[:user_id]はloginアクションで定義済
    @current_user = User.find_by(id: session[:user_id])
  end

end
