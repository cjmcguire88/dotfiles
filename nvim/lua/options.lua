--     ▗ ▘
-- ▛▌▛▌▜▘▌▛▌▛▌▛▘
-- ▙▌▙▌▐▖▌▙▌▌▌▄▌
--   ▌

vim.o.number = true -- Make line numbers default
vim.o.relativenumber = true -- You can also add relative line numbers, to help with jumping.

vim.o.mouse = 'nv' -- Enable mouse mode, can be useful for resizing splits for example!

vim.o.showmode = false -- Don't show the mode, since it's already in the status line

vim.schedule(function() --  Schedule the setting after `UiEnter` because it can increase startup-time.
  vim.o.clipboard = 'unnamedplus' -- Sync clipboard between OS and Neovim.
end)

vim.o.breakindent = true -- Enable break indent

vim.o.undofile = true -- Save undo history

vim.o.ignorecase = true -- Case-insensitive searching
vim.o.smartcase = true -- UNLESS \C or one or more capital letters in the search term

vim.o.signcolumn = 'yes' -- Always show the sign column

vim.o.updatetime = 250 -- Decrease update time

vim.o.timeoutlen = 300 -- Decrease mapped sequence wait time

vim.o.splitright = true -- Configure how new splits should be opened
vim.o.splitbelow = true

vim.o.tabstop = 4 -- Tab width 4 spaces
vim.o.softtabstop = 4 -- Backspace width 4 spaces
vim.o.shiftwidth = 4 -- Indent width 4 spaces
vim.o.expandtab = true -- Convert tabs to spaces

vim.o.list = true -- Whitespace
vim.opt.listchars = { tab = '» ', trail = '·', nbsp = '␣' }

vim.o.inccommand = 'split' -- Preview substitutions live, as you type!

vim.o.cursorline = true -- Show which line your cursor is on

vim.o.scrolloff = 10 -- Minimal number of screen lines to keep above and below the cursor.

vim.o.hlsearch = true -- Highlight search results
vim.o.incsearch = true -- Incremental search

vim.o.wildmenu = true -- Wildmenu

vim.o.confirm = true -- Raise a dialog asking if you wish to save the current file(s)

-- vim: ts=2 sts=2 sw=2 et
