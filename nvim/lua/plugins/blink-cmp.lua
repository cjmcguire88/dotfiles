-- ~/.config/nvim/lua/plugins/blink-cmp.lua
require('blink.cmp').setup({
  keymap = {
    preset = 'default',
    ['<S-Tab>'] = { 'select_prev', 'fallback' },
    ['<Tab>'] = { 'select_next', 'fallback' },
  },

  appearance = {
    nerd_font_variant = 'mono',
  },

  completion = {
    documentation = {
      auto_show = true,
      auto_show_delay_ms = 500,
    },
  },

  sources = {
    default = {
      'lsp',
      'path',
      'snippets',
    },
  },

  snippets = {
    preset = 'luasnip',
  },

  fuzzy = {
    implementation = 'prefer_rust_with_warning',
  },

  signature = {
    enabled = true,
  },
})

-- vim: ts=2 sts=2 sw=2 et
