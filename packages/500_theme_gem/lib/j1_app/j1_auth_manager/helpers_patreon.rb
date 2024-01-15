# ------------------------------------------------------------------------------
# ~/lib/j1_app/j1_auth_manager/omniauth/strategies/helpers_patreon.rb
#
# Provides helper methods for the patreon omniauth strategy
#
# Product/Info:
# https://jekyll.one
#
# Copyright (C) 2023, 2024 Juergen Adams
#
# J1 Theme is licensed under the MIT License
# See: https://github.com/jekyll-one-org/j1-template/blob/main/LICENSE.md
#
# ------------------------------------------------------------------------------
# NOTES
#
# ------------------------------------------------------------------------------
module J1App
  module PatreonHelpers

    # The authenticated user object
    #
    # Supports a variety of methods, name, full_name, email, etc
    def patreon_user
      warden.user
    end

  end
end