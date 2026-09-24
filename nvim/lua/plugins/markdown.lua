-- ~/.config/nvim/lua/plugins/markdown.lua

require('render-markdown').setup({
  enabled = true,
  render_modes = { 'n', 'v' },

  conceal = {
    enabled = false,
  },

  heading = {
    enabled = true,
  },

  code = {
    enabled = true,
  },

  bullet = {
    enabled = true,
  },
})

-- vim: ts=4 sts=4 sw=4 et
