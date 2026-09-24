-- ~/.config/nvim/lua/custom/plugins/lualine.lua
require('lualine').setup({
  options = {
    theme = 'onedark',
    component_separators = { left = '', right = '' },
    section_separators = { left = '', right = '' },
    disabled_filetypes = {
      statusline = { 'dashboard', 'alpha' },
    },
    globalstatus = true,
    refresh = {
      statusline = 500,
      tabline = 1000,
      winbar = 1000,
    },
  },

  sections = {
    lualine_a = { 'mode' },
    lualine_b = {
      'branch',
      'diff',
      '%3{codeium#GetStatusString()}',
    },
    lualine_c = {
      { 'filename', path = 1 },
    },
    lualine_x = { 'encoding', 'fileformat', 'filetype' },
    lualine_y = { 'progress' },
    lualine_z = { 'location' },
  },

  inactive_sections = {
    lualine_a = {},
    lualine_b = {},
    lualine_c = { 'filename' },
    lualine_x = { 'location' },
    lualine_y = {},
    lualine_z = {},
  },

  extensions = { 'nvim-tree', 'lazy' },
})

-- vim: ts=2 sts=2 sw=2 et
-- vim: ts=2 sts=2 sw=2 et
