-- ▌
-- ▙▘█▌▌▌▛▛▌▀▌▛▌▛▘
-- ▛▖▙▖▙▌▌▌▌█▌▙▌▄▌
--     ▄▌     ▌

vim.keymap.set('n', '<F2>', 'gg0i#!/usr/bin/env bash<CR><Esc>', { desc = 'Insert shebang' })

vim.keymap.set('n', '<leader>n', ':enew<CR>', { desc = '[N]ewfile' })

vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>', { desc = 'Clear search highlights' })

vim.keymap.set('n', '<leader>q', vim.diagnostic.setloclist, { desc = 'Open diagnostic [Q]uickfix list' })

vim.keymap.set('t', '<Esc><Esc>', '<C-\\><C-n>', { desc = 'Exit terminal mode' })

vim.keymap.set('n', '<M-h>', '<C-w><C-h>', { desc = 'Move focus to the left window' })
vim.keymap.set('n', '<M-l>', '<C-w><C-l>', { desc = 'Move focus to the right window' })
vim.keymap.set('n', '<M-j>', '<C-w><C-j>', { desc = 'Move focus to the lower window' })
vim.keymap.set('n', '<M-k>', '<C-w><C-k>', { desc = 'Move focus to the upper window' })

vim.keymap.set('n', '<C-h>', ':tabprevious<CR>', { desc = 'Move to previous tab' })
vim.keymap.set('n', '<C-l>', ':tabnext<CR>', { desc = 'Move to next tab' })
vim.keymap.set('n', '<C-j>', ':tabprevious<CR>', { desc = 'Move to previous tab' })
vim.keymap.set('n', '<C-k>', ':tabnext<CR>', { desc = 'Move to next tab' })

vim.keymap.set('n', '<leader>z', ':ZenMode<CR>', { desc = '[Z]en mode' })
vim.keymap.set('n', '<leader>m', ':Mason<CR>', { desc = '[M]ason' })
vim.keymap.set('n', '<leader>l', ':Lazy<CR>', { desc = '[L]azy' })
vim.keymap.set('n', '<leader>d', ':Dashboard<CR>', { desc = '[D]ashboard' })

vim.keymap.set('n', 'gq', ':LspStop<CR>', { desc = 'LSP [Q}uit' })
vim.keymap.set('n', 'gs', ':LspStart<CR>', { desc = 'LSP [S]tart' })

-- [[ Basic Autocommands ]]

-- Highlight when yanking (copying) text
vim.api.nvim_create_autocmd('TextYankPost', {
  desc = 'Highlight when yanking (copying) text',
  group = vim.api.nvim_create_augroup('kickstart-highlight-yank', { clear = true }),
  callback = function()
    vim.hl.on_yank()
  end,
})

-- vim: ts=2 sts=2 sw=2 et
