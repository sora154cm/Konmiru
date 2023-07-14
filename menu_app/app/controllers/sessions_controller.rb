class SessionsController < ApplicationController

  def new
    
  end

  def login
    user = User.find_by(login_key: params[:login_key])
    # 一致するユーザーをデータベースから見つけられたら
    # 引数として与えられたパスワードがユーザーのパスワードと一致するかどうかを確認
    if user && user.authenticate(params[:password])
      # sessionを通じて、user_idキーにログインしたユーザーのIDを保存する
      session[:user_id] = user.id
      flash[:notice] = "ログインができました!"
      redirect_to root_path
    else
      flash[:danger] = 'ログインIDまたはパスワードが間違っています'
      # 本当はレンダリングを使いたいが、Turboはリダイレクトを期待しているためリダイレクト
      redirect_to login_path
    end
  end
  
  def logout
    # sessionオブジェクトから:user_id（ログインしているユーザーのID）を削除
    # ログインユーザーのセッションを解除
    session.delete(:user_id)
    flash[:notice] = "ログアウトしました！"
    redirect_to login_path
  end
end
