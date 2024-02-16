Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # resources :hotels
      # resources :room_bookings
      get 'room_bookings/index'
      post 'room_bookings/create'
      get 'room_bookings/show/:id', to: 'room_bookings#show'
      patch 'room_bookings/update/:id', to: 'room_bookings#show'
      delete 'room_bookings/destroy/:id', to: 'room_bookings#destroy'

      get 'hotels/index'
      get 'hotels/show/:id', to: 'hotels#show'
    end
  end
  root 'home#show'
  get '/*path' => 'home#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
