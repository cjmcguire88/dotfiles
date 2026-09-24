-- ~/.config/nvim/lua/plugins/zen.lua

require('zen-mode').setup({
  window = {
    backdrop = 0.75,
    width = 120,
    height = 1,

    options = {
      signcolumn = 'no',
      cursorline = false,
    },
  },

  plugins = {
    options = {
      enabled = true,
      ruler = false,
      showcmd = false,
      laststatus = 0,
    },

    twilight = {
      enabled = true,
    },

    gitsigns = {
      enabled = false,
    },

    tmux = {
      enabled = false,
    },

    todo = {
      enabled = false,
    },
  },
})
