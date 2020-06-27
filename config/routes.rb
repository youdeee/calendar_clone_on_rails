# frozen_string_literal: true

Rails.application.routes.draw do
  scope :app do
    resource :calendar, only: %i(show)
  end
  devise_for :users
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
  root to: "home#index"
end
