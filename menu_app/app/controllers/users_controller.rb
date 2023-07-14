class UsersController < ApplicationController

  def new
    @user = User.new
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
end
