-- ~/.config/nvim/lua/plugins/yazi.lua

vim.g.loaded_netrwPlugin = 1

require('yazi').setup({
    open_for_directories = true,

    keymaps = {
        show_help = '<F1>',
    },
})

vim.keymap.set({ 'n', 'v' }, '\\', '<Cmd>Yazi<CR>', {
    desc = 'Open yazi at the current file',
})

vim.keymap.set('n', '<leader>cw', '<Cmd>Yazi cwd<CR>', {
    desc = "Open the file manager in nvim's working directory",
})

vim.keymap.set('n', '<C-Up>', '<Cmd>Yazi toggle<CR>', {
    desc = 'Resume the last yazi session',
})
