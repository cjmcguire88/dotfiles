return {
  {
    'nvimdev/dashboard-nvim',
    event = 'VimEnter',
    config = function()
      require('dashboard').setup {
        theme = 'hyper',
        config = {
          week_header = {
            enable = true,
          },
          shortcut = {
            {
              desc = '󰊳 Update',
              group = '@property',
              action = 'Lazy update',
              key = 'u',
            },
            {
              desc = '󰈞 Telescope',
              group = 'Label',
              action = 'Telescope find_files',
              key = 'f',
            },
            {
              desc = '󱃖 LSP',
              group = 'DiagnosticHint',
              action = 'Mason',
              key = 'a',
            },
            {
              desc = ' File Browser',
              group = 'Number',
              action = 'Yazi cwd',
              key = 'd',
            },
          },
        },
      }
    end,
    dependencies = { { 'nvim-tree/nvim-web-devicons' } },
  },
}
