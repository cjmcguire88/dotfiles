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

require 'options' -- [[ Setting options ]]

require 'keymaps' -- [[ Basic Keymaps ]]

require 'lazy-bootstrap' -- [[ Install `lazy.nvim` plugin manager ]]

require 'lazy-plugins' -- [[ Configure and install plugins ]]

-- vim: ts=2 sts=2 sw=2 et
