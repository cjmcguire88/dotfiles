-- ~/.config/nvim/lua/custom/plugins/catppuccin.lua
return {
  { -- Catppuccin colorscheme
    'catppuccin/nvim',
    name = 'catppuccin',
    priority = 1000, -- Load before other start plugins
    config = function()
      ---@diagnostic disable-next-line: missing-fields
      require('catppuccin').setup {
        flavour = 'auto', -- latte, frappe, macchiato, mocha
        background = { -- :h background
          light = 'latte',
          dark = 'mocha',
        },
        transparent_background = false, -- Disables setting the background color
        show_end_of_buffer = false, -- Hides '~' characters after the end of buffers
        term_colors = false, -- Sets terminal colors (e.g., `g:terminal_color_0`)
        dim_inactive = {
          enabled = false, -- Dims the background color of inactive window
          shade = 'dark',
          percentage = 0.15, -- Percentage of the shade to apply
        },
        no_italic = false, -- Enable italics
        no_bold = false, -- Enable bold
        no_underline = false, -- Enable underline
        styles = { -- Handles the styles of general highlight groups
          comments = { 'italic' }, -- Italicize comments
          conditionals = { 'italic' }, -- Italicize conditionals
          loops = {},
          functions = {},
          keywords = {},
          strings = {},
          variables = {},
          numbers = {},
          booleans = {},
          properties = {},
          types = {},
          operators = {},
        },
        color_overrides = {
          all = { -- Applies to all flavors
            base = '#202124', -- Set background color to #202124
            mantle = '#333333', -- Optional: Set mantle (used in some UI elements) to match
            -- crust = '#202124', -- Optional: Set crust (used in some edge cases) to match
          },
        },
        custom_highlights = {},
        default_integrations = true,
        integrations = {
          cmp = true,
          gitsigns = true,
          nvimtree = true,
          treesitter = true,
          notify = false,
          mini = {
            enabled = true,
            indentscope_color = '',
          },
          mason = true,
          which_key = true,
          indent_blankline = {
            enabled = true,
            colored_indent_levels = false,
          },
        },
      }

      -- Load the colorscheme here
      vim.cmd.colorscheme 'catppuccin'
    end,
  },
}
-- vim: ts=2 sts=2 sw=2 et
