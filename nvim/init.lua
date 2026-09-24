-- ███╗   ██╗███████╗ ██████╗ ██╗   ██╗██╗███╗   ███╗
-- ████╗  ██║██╔════╝██╔═══██╗██║   ██║██║████╗ ████║
-- ██╔██╗ ██║█████╗  ██║   ██║██║   ██║██║██╔████╔██║
-- ██║╚██╗██║██╔══╝  ██║   ██║╚██╗ ██╔╝██║██║╚██╔╝██║
-- ██║ ╚████║███████╗╚██████╔╝ ╚████╔╝ ██║██║ ╚═╝ ██║
-- ╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝     ╚═╝

--                  ▘  ▘▗   ▜
--                  ▌▛▌▌▜▘  ▐ ▌▌▀▌
--                  ▌▌▌▌▐▖▗ ▐▖▙▌█▌

vim.g.mapleader = ' ' -- Set <space> as the leader key
vim.g.maplocalleader = ' '

vim.g.have_nerd_font = true -- Set to true if you have a Nerd Font installed and selected in the terminal

require 'options'
require 'keymaps'
require 'plugins'
require 'lsp'

-- vim: ts=2 sts=2 sw=2 et
