Rails.application.routes.draw do
  
  # 一番最初のページ
  root 'homes#top'
  # ホームページ
  get '/index', to: 'homes#index'
  
  # 新規登録関連のルーティング
  get '/signup', to: 'users#new'
  post '/users', to: 'users#create'
  # ログイン関連のルーティング
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
  # ユーザーとレシピページ一覧のルーティング
  get 'users/all', 'users#index'

  # ユーザ関連のルーティング
  resources :users, only: [:show, :edit, :update] do
    collection do
      get :all
    end
    member do
      # 特定のレシピ(id)に対するレシピ結果をルーティング
      get :result_current
      get :result_all
    end
    # レシピ関連のルーティング(ユーザー関連の中にネスト)
    resources :recipes, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
      post :create_ingredient, on: :member
      delete :delete_ingredient, on: :member
    end

  end

end
