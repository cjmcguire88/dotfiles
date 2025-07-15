return {
  {
    'navarasu/onedark.nvim',
    priority = 1000,
    opts = {
      style = 'warmer',
      transparent = false,
      term_colors = true,
      ending_tildes = false,
      cmp_itemkind_reverse = false,
      toggle_style_key = nil,
      toggle_style_list = { 'dark', 'darker', 'cool', 'deep', 'warm', 'warmer', 'light' },
      code_style = {
        comments = 'italic',
        keywords = 'none',
        functions = 'none',
        strings = 'none',
        variables = 'none',
      },
      lualine = {
        transparent = false,
      },
      colors = {
        fg = '#edfefe',
        blue = '#89b4fa',
        cyan = '#89dceb',
        green = '#a6e3a1',
        orange = '#fab387',
        red = '#f38ba8',
        pink = '#eba0ac',
        yellow = '#f9e2af',
      },
      highlights = {},
      diagnostics = {
        darker = true,
        undercurl = true,
        background = true,
      },
    },
    config = function(_, opts)
      require('onedark').setup(opts)
      vim.cmd.colorscheme 'onedark'
    end,
  },
}
-- vim: ts=4 sw=4 et sts=4
