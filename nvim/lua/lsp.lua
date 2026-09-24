-------------------------------------------------------------------------------
-- LSP
--
-- Neovim 0.12 native LSP configuration.
--
-- LSP servers themselves are installed outside of Neovim (e.g. pacman/AUR).
-- nvim-lspconfig supplies server definitions.
-- blink.cmp supplies completion capabilities.
-- conform.nvim handles formatting.
-------------------------------------------------------------------------------

local capabilities = vim.lsp.protocol.make_client_capabilities()

-- blink.cmp adds the completion capabilities that LSP servers need.
local ok, blink = pcall(require, 'blink.cmp')
if ok then
  capabilities = blink.get_lsp_capabilities(capabilities)
end

-------------------------------------------------------------------------------
-- Diagnostics
-------------------------------------------------------------------------------

vim.diagnostic.config {
  severity_sort = true,

  float = {
    border = 'rounded',
    source = 'if_many',
  },

  signs = {
    text = {
      [vim.diagnostic.severity.ERROR] = '󰅚',
      [vim.diagnostic.severity.WARN] = '󰀪',
      [vim.diagnostic.severity.INFO] = '󰋽',
      [vim.diagnostic.severity.HINT] = '󰌶',
    },
  },

  underline = true,

  virtual_text = {
    spacing = 4,
    source = 'if_many',
  },
}

-------------------------------------------------------------------------------
-- LSP attach
-------------------------------------------------------------------------------

vim.api.nvim_create_autocmd('LspAttach', {
  group = vim.api.nvim_create_augroup('user-lsp-attach', {
    clear = true,
  }),

  callback = function(event)
    local client = vim.lsp.get_client_by_id(event.data.client_id)
    local bufnr = event.buf

    if not client then
      return
    end

    ---------------------------------------------------------------------------
    -- Keymaps
    ---------------------------------------------------------------------------

    local map = function(mode, lhs, rhs, desc)
      vim.keymap.set(mode, lhs, rhs, {
        buffer = bufnr,
        desc = 'LSP: ' .. desc,
      })
    end

    -- Navigation
    map('n', 'grn', vim.lsp.buf.rename, 'Rename')
    map('n', 'grr', vim.lsp.buf.references, 'References')
    map('n', 'gri', vim.lsp.buf.implementation, 'Implementation')
    map('n', 'gd', vim.lsp.buf.definition, 'Definition')
    map('n', 'gD', vim.lsp.buf.declaration, 'Declaration')

    -- Information
    map('n', 'K', vim.lsp.buf.hover, 'Hover Documentation')
    map('n', '<C-k>', vim.lsp.buf.signature_help, 'Signature Help')

    -- Code actions
    map({ 'n', 'x' }, 'gra', vim.lsp.buf.code_action, 'Code Action')

    -- Workspace
    map('n', 'gW', vim.lsp.buf.workspace_symbol, 'Workspace Symbols')

    -- Diagnostics
    map('n', '<leader>q', vim.diagnostic.setloclist, 'Diagnostics to Location List')
    map('n', '[d', vim.diagnostic.goto_prev, 'Previous Diagnostic')
    map('n', ']d', vim.diagnostic.goto_next, 'Next Diagnostic')
    map('n', '<leader>e', vim.diagnostic.open_float, 'Show Diagnostic')

    ---------------------------------------------------------------------------
    -- Inlay hints
    ---------------------------------------------------------------------------

    if client:supports_method('textDocument/inlayHint', bufnr) then
      vim.lsp.inlay_hint.enable(true, {
        bufnr = bufnr,
      })
    end

    ---------------------------------------------------------------------------
    -- Document highlighting
    ---------------------------------------------------------------------------

    if client:supports_method('textDocument/documentHighlight', bufnr) then
      local highlight_group = vim.api.nvim_create_augroup('user-lsp-highlight-' .. bufnr, { clear = true })

      vim.api.nvim_create_autocmd({ 'CursorHold', 'CursorHoldI' }, {
        buffer = bufnr,
        group = highlight_group,
        callback = vim.lsp.buf.document_highlight,
      })

      vim.api.nvim_create_autocmd({ 'CursorMoved', 'CursorMovedI' }, {
        buffer = bufnr,
        group = highlight_group,
        callback = vim.lsp.buf.clear_references,
      })
    end
  end,
})

-------------------------------------------------------------------------------
-- Server configuration
--
-- These names must correspond to servers supported by nvim-lspconfig.
--
-- The servers themselves should be installed through the system package
-- manager rather than Mason.
-------------------------------------------------------------------------------

local servers = {
  clangd = {},
  lua_ls = {},
  pyright = {},
  rust_analyzer = {},
  bashls = {},
  zls = {},
}

-------------------------------------------------------------------------------
-- Apply common configuration to each server
-------------------------------------------------------------------------------

for server, config in pairs(servers) do
  config.capabilities = capabilities

  vim.lsp.config(server, config)
end

-------------------------------------------------------------------------------
-- Enable servers
-------------------------------------------------------------------------------

for server in pairs(servers) do
  vim.lsp.enable(server)
end

-------------------------------------------------------------------------------
-- vim: ts=2 sts=2 sw=2 et
-------------------------------------------------------------------------------
