Rails.application.routes.draw do
  # root to: 'users#index'
  # root to: 'users#create'
  resources :users, only: [:index, :create, :show]
  resources :games, only: [:index, :create]
end
