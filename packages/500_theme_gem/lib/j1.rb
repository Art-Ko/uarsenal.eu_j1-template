$LOAD_PATH.unshift File.dirname(__FILE__) # For use/testing when no gem is installed

# Require all of the Ruby files in the given directory.
#
# path - The String relative path from here to the directory.
# Returns nothing.
def require_all(path)
  glob = File.join(File.dirname(__FILE__), path, '*.rb')
  Dir[glob].sort.each do |f|
    require f
  end
end

# rubygems
require 'rubygems'

# stdlib
require 'pathutil'
require 'forwardable'
require 'fileutils'
require 'time'
require 'English'
require 'pathname'
require 'logger'
require 'set'

module J1
  # internal requires
  autoload :External,            'j1/external'
  autoload :LogAdapter,          'j1/log_adapter'
  autoload :LogHelper,           'j1/log_helper'
  autoload :Utils,               'j1/utils'
  autoload :VERSION,             "j1/version"

  # extensions
  require 'j1/command'

  class << self
    # Public: Tells you which J1 environment you are building in so you can skip tasks
    # if you need to.  This is useful when doing expensive compression tasks on css and
    # images and allows you to skip that when working in development.

    def env
      ENV['JEKYLL_ENV'] || 'development'
    end

    # Public: Generate a J1 configuration Hash by merging the default
    # options with anything in _config.yml, and adding the given options on top.
    #
    # override - A Hash of config directives that override any options in both
    #            the defaults and the config file.
    #            See J1::Configuration::DEFAULTS for a
    #            list of option names and their defaults.
    #
    # Returns the final configuration Hash.
    #
    def configuration(override = {})
      config = Configuration.new
      override = Configuration[override].stringify_keys
      unless override.delete('skip_config_files')
        config = config.read_config_files(config.config_files(override))
      end

      # Merge DEFAULTS < _config.yml < override
      Configuration.from(Utils.deep_merge_hashes(config, override)).tap do |obj|
        set_timezone(obj['timezone']) if obj['timezone']
      end
    end

    # Public: Set the TZ environment variable to use the timezone specified
    #
    # timezone - the IANA Time Zone
    #
    # Returns nothing
    # rubocop:disable Style/AccessorMethodName
    #
    def set_timezone(timezone)
      ENV['TZ'] = timezone
    end
    # rubocop:enable Style/AccessorMethodName

    # Public: Fetch the logger instance for this J1 process.
    #
    # Returns the LogAdapter instance
    #
    def logger
      @logger ||= LogAdapter.new(LogHelper.new, (ENV['J1_LOG_LEVEL'] || :info).to_sym)
    end

    # Public: Set the log writer.
    #         New log writer must respond to the same methods
    #         as Ruby's interal Logger.
    #
    # writer - the new Logger-compatible log transport
    #
    # Returns the new logger
    #
    def logger=(writer)
      @logger = LogAdapter.new(writer, (ENV['J1_LOG_LEVEL'] || :info).to_sym)
    end

    # Public: An array of sites
    #
    # Returns the J1 sites created
    #
    def sites
      @sites ||= []
    end

    # Public: Ensures the questionable path is prefixed with the base directory
    #         and prepends the questionable path with the base directory if false.
    #
    # base_directory - the directory with which to prefix the questionable path
    # questionable_path - the path we're unsure about, and want prefixed
    #
    # Returns the sanitized path
    #
    def sanitized_path(base_directory, questionable_path)
      return base_directory if base_directory.eql?(questionable_path)

      questionable_path.insert(0, '/') if questionable_path.start_with?('~')
      clean_path = File.expand_path(questionable_path, '/')

      return clean_path if clean_path.eql?(base_directory)

      if clean_path.start_with?(base_directory.sub(/\z/, '/'))
        clean_path
      else
        clean_path.sub!(%r{\A\w:/}, '/')
        File.join(base_directory, clean_path)
      end
    end
  end
end

require_all 'j1/commands'
