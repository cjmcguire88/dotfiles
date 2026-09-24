-- ~/.config/nvim/lua/plugins/mini.lua

require('mini.ai').setup({
  n_lines = 500,
})

require('mini.surround').setup()

require('mini.align').setup()

-- vim: ts=2 sts=2 sw=2 et
