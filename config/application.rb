require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module PizzaNaWypasieCrm
  class Application < Rails::Application
    config.load_defaults 7.1
    config.eager_load_paths << Rails.root.join("extras")
    config.generators.system_tests = nil
  end
end
