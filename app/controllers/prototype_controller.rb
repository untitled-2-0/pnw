class PrototypeController < ApplicationController
  before_action :set_navigation

  def login
    render layout: "auth"
  end

  def forgot_password
    render layout: "auth"
  end

  def dashboard; end
  def inventory; end
  def ingredients; end
  def recipes; end
  def deliveries; end
  def orders; end
  def write_offs; end
  def reports; end
  def admin; end
  def alerts; end
  def profile; end

  private

  def set_navigation
    @nav_items = [
      ["DB", "Дашборд", dashboard_path],
      ["SK", "Склад", inventory_path],
      ["IN", "Інгредієнти", ingredients_path],
      ["RC", "Рецепти", recipes_path],
      ["DL", "Поставки", deliveries_path],
      ["OR", "Замовлення", orders_path],
      ["WO", "Списання", write_offs_path],
      ["RP", "Звіти", reports_path],
      ["ST", "Налаштування", admin_path]
    ]
  end
end
