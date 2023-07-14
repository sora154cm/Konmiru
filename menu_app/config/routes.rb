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

  # ユーザ関連のルーティング
  resources :users, only: [:show, :edit, :update] do
    # 特定のユーザー(id)に対するマイページをルーティング
    member do
      get :my_page
    end
    # レシピ関連のルーティング(ユーザー関連の中にネスト)
    resources :recipes, only: [:index, :show, :new, :create, :edit, :update] do
      # 特定のレシピ(id)に対するレシピ結果をルーティング
      member do
        get :result
      end
    end

  end

end
