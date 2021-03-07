# ------------------------------------------------------------------------------
# ~/config.ru
# Provides run-time information for the (Rack) Application
#
# Transforms J1 into a Web Application based on Rack and 
# Sinatra using the OmniAuth software stack managed by Warden 
# for authentication to create secured static J1 based web 
# sites.
#
# Product/Info:
# https://jekyll.one
#
# Copyright (C) 2021 Juergen Adams
#
# J1 Template is licensed under the MIT License.
# See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
# ------------------------------------------------------------------------------
# NOTE: This rackup config is used for the J1 development system only
# ------------------------------------------------------------------------------

# load base|app gem
# ------------------------------------------------------------------------------
require_relative '../500_template_gem/lib/j1_app'

# run the app
# ------------------------------------------------------------------------------
run J1App.site

