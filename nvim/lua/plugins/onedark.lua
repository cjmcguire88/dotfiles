-- ~/.config/nvim/lua/plugins/onedark.lua

require('onedark').setup({
  style = 'warmer',
  transparent = false,
  term_colors = true,
  ending_tildes = false,
  cmp_itemkind_reverse = false,
  toggle_style_key = nil,
  toggle_style_list = { 'dark', 'darker', 'cool', 'deep', 'warm', 'warmer', 'light' },
  code_style = {
    comments = 'italic',
    keywords = 'italic',
    functions = 'none',
    strings = 'none',
    variables = 'bold',
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
  highlights = {
    ['@lsp.type.keyword'] = { fg = '#f39c12', fmt = 'bold' },
    ['@lsp.type.builtinType'] = { fg = '#f9e2af' },
    ['@lsp.type.property'] = { fg = '#a6e3a1' },
    ['@lsp.type.function'] = { fg = '#89b4fa' },
    ['@lsp.type.method'] = { fg = '#89dceb' },
    ['@lsp.type.enum'] = { fg = '#f5c2e7' },
    ['@lsp.type.enumMember'] = { fg = '#fab387' },
    ['@lsp.type.variable'] = { fg = '#f38ba8', fmt = 'bold' },
    ['@lsp.type.parameter'] = { fg = '#edfefe' },
    ['@lsp.type.number'] = { fg = '#a6e3a1' },
  },
  diagnostics = {
    darker = true,
    undercurl = true,
    background = true,
  },
})

vim.cmd.colorscheme('onedark')

-- vim: ts=4 sw=4 et sts=4
