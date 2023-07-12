class SessionsController < ApplicationController
  def new
    
  end

  def login
    user = User.find_by(login_key: params[:session][:login_key])

    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      redirect_to user
    else
      flash.now[:danger] = 'Invalid login key/password combination'
      render 'new'
    end
  end

  def logout
    session.delete(:user_id)
    redirect_to root_url
  end

end
