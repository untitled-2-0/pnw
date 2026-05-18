Rails.application.routes.draw do
  root "prototype#login"

  get "login", to: "prototype#login"
  get "forgot-password", to: "prototype#forgot_password"
  get "dashboard", to: "prototype#dashboard"
  get "inventory", to: "prototype#inventory"
  get "ingredients", to: "prototype#ingredients"
  get "recipes", to: "prototype#recipes"
  get "deliveries", to: "prototype#deliveries"
  get "orders", to: "prototype#orders"
  get "write-offs", to: "prototype#write_offs"
  get "reports", to: "prototype#reports"
  get "admin", to: "prototype#admin"
  get "alerts", to: "prototype#alerts"
  get "profile", to: "prototype#profile"
end
