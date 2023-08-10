class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def login
    @user = User.find_by(login_key: params[:login_key])
  
    # ユーザーが存在する場合
    if @user 
      # パスワードが正しい場合
      if @user.authenticate(params[:password])
        session[:user_id] = @user.id
        flash[:notice] = "ログインができました!"
        redirect_to root_path
        return
      else
        # パスワードが間違っている場合のエラーメッセージ
        @user.errors.add(:password, 'パスワードが間違っています。')
      end
    else
      # ユーザーが存在しない場合のエラーメッセージ
      @user = User.new
      @user.errors.add(:login_key, 'ログインIDが間違っています。')
    end
  
    render :new, status: :unprocessable_entity
  end
    
  
  def logout
    # sessionオブジェクトから:user_id（ログインしているユーザーのID）を削除
    # ログインユーザーのセッションを解除
    session.delete(:user_id)
    flash[:notice] = "ログアウトしました！"
    redirect_to login_path
  end
end
