return {
  {
    'nvimdev/dashboard-nvim',
    event = 'VimEnter',
    opts = {
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
    },
    dependencies = { { 'nvim-tree/nvim-web-devicons' } },
  },
}
-- vim: ts=4 sts=4 sw=4 et
