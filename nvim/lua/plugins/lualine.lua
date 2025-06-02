-- ~/.config/nvim/lua/custom/plugins/lualine.lua
return {
  {
    'nvim-lualine/lualine.nvim',
    dependencies = { 'nvim-tree/nvim-web-devicons' },
    event = 'VeryLazy', -- Load after most plugins for performance
    opts = {
      options = {
        theme = 'catppuccin', -- Match your Catppuccin theme
        component_separators = { left = '', right = '' },
        section_separators = { left = '', right = '' },
        disabled_filetypes = { statusline = { 'dashboard', 'alpha' } },
        globalstatus = true, -- Single statusline for all windows
        refresh = {
          statusline = 500, -- Update statusline every 1000 ms
          tabline = 1000, -- Update tabline every 1000 ms
          winbar = 1000, -- Update winbar every 1000 ms
        },
      },
      sections = {
        lualine_a = { 'mode' },
        lualine_b = { 'branch', 'diff', 'diagnostics' },
        lualine_c = { { 'filename', path = 1 } }, -- Show relative path
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
      extensions = { 'nvim-tree', 'lazy' }, -- Support for NvimTree and Lazy
    },
  },
}
-- vim: ts=2 sts=2 sw=2 et
