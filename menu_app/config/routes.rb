Rails.application.routes.draw do
  #トップページ
  root 'homes#top'
  
  # 新規登録関連のルーティング
  get '/signup', to: 'users#new'
  post '/users', to: 'users#create'
  # ログイン関連のルーティング
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
end
