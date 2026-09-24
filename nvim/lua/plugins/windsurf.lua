-- ~/.config/nvim/lua/plugins/windsurf.lua

vim.g.codeium_disable_bindings = 1

vim.keymap.set('i', '<C-g>', '<Cmd>CodeiumToggle<CR>', {
  silent = true,
})

local function codeium_call(fn, ...)
  if vim.fn.exists('*' .. fn) == 1 then
    return vim.fn[fn](...)
  end
end

vim.keymap.set('i', '<C-h>', function()
  return codeium_call('codeium#Clear')
end, { expr = true, silent = true })

vim.keymap.set('i', '<C-j>', function()
  return codeium_call('codeium#AcceptNextWord')
end, { expr = true, silent = true })

vim.keymap.set('i', '<C-k>', function()
  return codeium_call('codeium#AcceptNextLine')
end, { expr = true, silent = true })

vim.keymap.set('i', '<C-l>', function()
  return codeium_call('codeium#Accept')
end, { expr = true, silent = true })

vim.keymap.set('i', '<C-p>', function()
  return codeium_call('codeium#CycleCompletions', -1)
end, { expr = true, silent = true })

vim.keymap.set('i', '<C-n>', function()
  return codeium_call('codeium#CycleCompletions', 1)
end, { expr = true, silent = true })
