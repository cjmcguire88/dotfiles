-- ~/.config/nvim/lua/plugins/conform.lua

require('conform').setup({
  notify_on_error = false,

  format_on_save = function(bufnr)
    local disable_filetypes = { c = true, cpp = true }

    if disable_filetypes[vim.bo[bufnr].filetype] then
      return nil
    end

    return {
      timeout_ms = 500,
      lsp_format = 'fallback',
    }
  end,

  formatters_by_ft = {
    asm = { 'asmfmt' },
    bash = { 'shellharden', 'shfmt', stop_after_first = true },
    clang = { 'clang_format' },
    cmake = { 'cmakelang' },
    css = { 'prettier' },
    html = { 'prettier' },
    javascript = { 'prettier' },
    json = { 'prettier' },
    lua = { 'stylua' },
    python = { 'isort', 'black' },
    rust = { 'rustfmt' },
    sh = { 'shfmt' },
    typescript = { 'prettier' },
    yaml = { 'prettier' },
  },
})

vim.keymap.set('n', '<leader>f', function()
  require('conform').format({
    async = true,
    lsp_format = 'fallback',
  })
end, { desc = '[F]ormat buffer' })

-- vim: ts=2 sts=2 sw=2 et
