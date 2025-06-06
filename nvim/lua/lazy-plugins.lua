--   ▜     ▘
-- ▛▌▐ ▌▌▛▌▌▛▌▛▘
-- ▙▌▐▖▙▌▙▌▌▌▌▄▌
-- ▌     ▄▌

--  To check the current status of your plugins, run
--    :Lazy
--  To update plugins you can run
--    :Lazy update
--
require('lazy').setup {
  'NMAC427/guess-indent.nvim', -- Detect tabstop and shiftwidth automatically

  require 'plugins/gitsigns',

  require 'plugins/which-key',

  require 'plugins/telescope',

  require 'plugins/lspconfig',

  require 'plugins/conform',

  require 'plugins/blink-cmp',

  require 'plugins/todo-comments',

  require 'plugins/mini',

  require 'plugins/undo',

  require 'plugins/treesitter',

  require 'plugins/onedark',

  require 'plugins/windsurf',

  require 'plugins/lualine',

  require 'plugins/dashboard',

  require 'plugins/yazi',

  require 'plugins/colorizer',

  require 'plugins/orgmode',

  require 'plugins/zen',

  require 'plugins/twilight',
}

-- vim: ts=2 sts=2 sw=2 et
