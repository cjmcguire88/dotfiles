--   ▜     ▘
-- ▛▌▐ ▌▌▛▌▌▛▌▛▘
-- ▙▌▐▖▙▌▙▌▌▌▌▄▌
-- ▌     ▄▌
--
-- vim.pack handles installation, updates, removal, and the lockfile.
-- Plugin-specific configuration lives in lua/plugins/*.lua.
--
-- To remove a plugin from the configuration, comment out its entry below.
-- Once removed, use :packdel <plugin> to remove its files if desired.

local gh = function(repo)
  return 'https://github.com/' .. repo
end

vim.pack.add {
  gh 'NMAC427/guess-indent.nvim',
  gh 'nvim-telescope/telescope.nvim',
  gh 'nvim-lua/plenary.nvim',
  gh 'folke/which-key.nvim',
  gh 'echasnovski/mini.nvim',
  gh 'lewis6991/gitsigns.nvim',
  gh 'kdheepak/lazygit.nvim',
  gh 'stevearc/conform.nvim',
  gh 'Saghen/blink.cmp',
  gh 'Saghen/blink.lib',
  gh 'L3MON4D3/LuaSnip',
  gh 'nvim-treesitter/nvim-treesitter',
  gh 'nvim-lualine/lualine.nvim',
  gh 'folke/noice.nvim',
  gh 'MunifTanjim/nui.nvim',
  gh 'navarasu/onedark.nvim',
  gh 'glepnir/dashboard-nvim',
  gh 'folke/todo-comments.nvim',
  gh 'mikavilpas/yazi.nvim',
  gh 'catgoose/nvim-colorizer.lua',
  gh 'folke/zen-mode.nvim',
  gh 'folke/twilight.nvim',
  gh 'MeanderingProgrammer/render-markdown.nvim',
  gh 'Exafunction/windsurf.vim',

  -- Removed/replaced by native Neovim 0.12 functionality:
  -- gh('mbbill/undotree'),

  -- Mason is no longer needed with the new LSP setup:
  -- gh('mason-org/mason.nvim'),
  -- gh('mason-org/mason-lspconfig.nvim'),
  -- gh('WhoIsSethDaniel/mason-tool-installer.nvim'),
}

-- Plugin configuration
require 'plugins.gitsigns'
require 'plugins.which-key'
require 'plugins.telescope'
require 'plugins.conform'
require 'plugins.blink-cmp'
require 'plugins.todo-comments'
require 'plugins.mini'
require 'plugins.noice'
require 'plugins.lazygit'
require 'plugins.treesitter'
require 'plugins.onedark'
require 'plugins.windsurf'
require 'plugins.lualine'
require 'plugins.dashboard'
require 'plugins.yazi'
require 'plugins.colorizer'
require 'plugins.zen'
require 'plugins.twilight'
require 'plugins.markdown'

-- vim: ts=2 sts=2 sw=2 et
