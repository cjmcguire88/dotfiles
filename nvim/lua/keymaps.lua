-- ▌
-- ▙▘█▌▌▌▛▛▌▀▌▛▌▛▘
-- ▛▖▙▖▙▌▌▌▌█▌▙▌▄▌
--     ▄▌     ▌

-- Clear highlights on search when pressing <Esc> in normal mode
vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>')

-- Diagnostic keymaps
vim.keymap.set('n', '<leader>q', vim.diagnostic.setloclist, { desc = 'Open diagnostic [Q]uickfix list' })

-- Exit terminal mode in the builtin terminal with <Esc> <Esc>
vim.keymap.set('t', '<Esc><Esc>', '<C-\\><C-n>', { desc = 'Exit terminal mode' })

--  Use CTRL+<hjkl> to switch between windows
vim.keymap.set('n', '<C-H>', '<C-w><C-h>', { desc = 'Move focus to the left window' })
vim.keymap.set('n', '<C-L>', '<C-w><C-l>', { desc = 'Move focus to the right window' })
vim.keymap.set('n', '<C-J>', '<C-w><C-j>', { desc = 'Move focus to the lower window' })
vim.keymap.set('n', '<C-K>', '<C-w><C-k>', { desc = 'Move focus to the upper window' })

-- Switch between tabs with Ctrl+Shift+<hjkl>
vim.keymap.set('n', '<C-h>', ':tabprevious<CR>', { desc = 'Move to previous tab' })
vim.keymap.set('n', '<C-l>', ':tabnext<CR>', { desc = 'Move to next tab' })
vim.keymap.set('n', '<C-j>', ':tabprevious<CR>', { desc = 'Move to previous tab' })
vim.keymap.set('n', '<C-k', ':tabnext<CR>', { desc = 'Move to next tab' })

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
