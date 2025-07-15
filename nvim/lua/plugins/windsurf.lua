return {
  {
    'Exafunction/windsurf.vim',
    config = function()
      vim.keymap.set('i', '<C-g>', ':CodeiumToggle<CR>', { expr = true, silent = true })
      vim.keymap.set('i', '<c-h>', function()
        return vim.fn['codeium#Clear']()
      end, { expr = true, silent = true })
      vim.keymap.set('i', '<c-j>', function()
        return vim.fn['codeium#AcceptNextWord']()
      end, { expr = true, silent = true })
      vim.keymap.set('i', '<c-k>', function()
        return vim.fn['codeium#AcceptNextLine']()
      end, { expr = true, silent = true })
      vim.keymap.set('i', '<C-l>', function()
        return vim.fn['codeium#Accept']()
      end, { expr = true, silent = true })
      vim.keymap.set('i', '<C-p>', function()
        return vim.fn['codeium#CycleCompletions'](-1)
      end, { expr = true, silent = true })
      vim.keymap.set('i', '<C-n>', function()
        return vim.fn['codeium#CycleCompletions'](1)
      end, { expr = true, silent = true })
    end,
  },
}
