-- ~/.config/nvim/lua/plugins/noice.lua

require('noice').setup({
  lsp = {
    override = {
      ['vim.lsp.util.convert_input_to_markdown_lines'] = true,
      ['vim.lsp.util.stylize_markdown'] = true,
      ['cmp.entry.get_documentation'] = true,
    },
  },
})

-- vim: ts=2 sts=2 sw=2 et
