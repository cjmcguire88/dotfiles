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

  require 'plugins/treesitter',

  require 'plugins/catppuccin',

  require 'plugins/windsurf',

  require 'plugins/lualine',
}

-- vim: ts=2 sts=2 sw=2 et
