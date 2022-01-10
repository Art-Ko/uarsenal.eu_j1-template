# frozen_string_literal: true

module J1
  module Commands
    class Site < Command
      #noinspection MissingYardParamTag
      class << self

        def init_with_program(prog)
          prog.command(:site) do |c|
            c.description 'Run the website of a J1 project'
            c.syntax 'site'
            c.action do |args, options|
              J1::Commands::Site.process(args, options)
            end
          end
        end

        def process(args, options = {})
          if J1::Utils::is_project?
            J1.logger.info "SITE: Starting up your site ..."
            process = J1::Utils::Exec2.run('SITE','npm', 'run', 'j1-site')
          else
            raise SystemExit
          end
        end

      end
    end
  end
end
