-- ~/.config/nvim/lua/plugins/treesitter.lua

require('nvim-treesitter').setup({
  install_dir = vim.fn.stdpath('data') .. '/site',
})

vim.api.nvim_create_autocmd('FileType', {
  callback = function(args)
    local ok = pcall(vim.treesitter.start, args.buf)
    if not ok then
      return
    end

    vim.bo[args.buf].indentexpr = "v:lua.require'nvim-treesitter'.indentexpr()"
  end,
})
