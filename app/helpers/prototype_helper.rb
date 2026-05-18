module PrototypeHelper
  def nav_active?(path)
    current_page?(path) ? "active" : nil
  end
end
