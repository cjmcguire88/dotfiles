-- ~/.config/nvim/lua/plugins/twilight.lua

require('twilight').setup({
  dimming = {
    alpha = 0.25,
    color = { 'Normal', '#edfefe' },
    term_bg = '#000000',
    inactive = false,
  },

  context = 10,
  treesitter = true,

  expand = {
    'function',
    'method',
    'table',
    'if_statement',
  },

  exclude = {},
})
