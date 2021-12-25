" ███╗   ██╗███████╗ ██████╗ ██╗   ██╗██╗███╗   ███╗
" ████╗  ██║██╔════╝██╔═══██╗██║   ██║██║████╗ ████║
" ██╔██╗ ██║█████╗  ██║   ██║██║   ██║██║██╔████╔██║
" ██║╚██╗██║██╔══╝  ██║   ██║╚██╗ ██╔╝██║██║╚██╔╝██║
" ██║ ╚████║███████╗╚██████╔╝ ╚████╔╝ ██║██║ ╚═╝ ██║
" ╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝     ╚═╝

" 01001101 01101001 01101110 01101001 01000010 01100101 01100001 01110011 01110100

""" Vim-Plug
call plug#begin()

" Aesthetics
Plug 'nekonako/xresources-nvim' " Neovim colorscheme based on your xresources color
Plug 'mhinz/vim-startify'  " This plugin provides a start screen for Vim and Neovim.
Plug 'kaicataldo/material.vim', { 'branch': 'main' } " A port of the Material color scheme for Vim/Neovim.
Plug 'rakr/vim-one' " Light and dark vim colorscheme, shamelessly stolen from atom.
Plug 'vim-airline/vim-airline' " Lean & mean status/tabline for vim that's light as air.
Plug 'vim-airline/vim-airline-themes' " The official theme repository for vim-airline
Plug 'junegunn/goyo.vim' " Distraction-free writing in Vim.
Plug 'NLKNguyen/papercolor-theme' " Inspired by Google's Material Design.
Plug 'zaki/zazen' " Zazen vim color scheme (a personalized version of zenesque)
Plug 'raphamorim/lucario' " The best colorful flat theme for your favorite editor and terminal emulator.

" Functionalities
Plug 'neoclide/coc.nvim', {'branch': 'release'} " Make your Vim/Neovim as smart as VSCode.
Plug 'tpope/vim-surround' " Quoting/parenthesizing made simple
Plug 'tpope/vim-sensible' " Defaults everyone can agree on
Plug 'tpope/vim-commentary' " Comment stuff out
Plug 'preservim/tagbar' " Vim plugin that displays tags in a window, ordered by scope
Plug 'preservim/nerdtree' " A tree explorer plugin for vim.
Plug 'ryanoasis/vim-devicons' " Adds file type icons to Vim plugins.
Plug 'junegunn/vim-easy-align' " A simple, easy-to-use Vim alignment plugin.
Plug 'alvan/vim-closetag' " Auto close (X)HTML tags.
Plug 'Yggdroot/indentLine' " A vim plugin to display the indention levels with thin vertical lines
Plug 'sheerun/vim-polyglot' " A solid language pack for Vim.
Plug 'chrisbra/Colorizer' " Color hex codes and color names.
Plug 'honza/vim-snippets' " Community maintained snippets for various programming languages.
Plug 'dkarter/bullets.vim' " Bullets.vim is a Vim plugin for automated bullet lists.
Plug 'luochen1990/rainbow' " Rainbow parenthesis improved
Plug 'unblevable/quick-scope' " An always-on highlight for a unique character in every word on a line.

call plug#end()

" Enable true color
if exists('+termguicolors')
  let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
  let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
  set termguicolors
endif

""" Coloring
syntax on
colorscheme material
let g:airline_theme = 'deus'
let g:material_terminal_italics = 1
let g:material_theme_style = 'default'
" options:| 'default' | 'palenight' | 'ocean' | 'lighter' | 'darker' | 'default-community' |
" | 'palenight-community' | 'ocean-community' | 'lighter-community' | 'darker-community' |

highlight Pmenu gui=bold
highlight Comment gui=bold
highlight Normal gui=none
highlight NonText guibg=none


""" Other Configurations
filetype plugin indent on
set encoding       =utf-8               " use utf-8 encoding
set path          +=**                  " search files recursively
set showbreak     +=>\                  " use > to indicate line breaks
set cpoptions     +=n                   " show > for wrapped lines in number column
set fillchars     +=vert:\              " characters to fill statusline vertical separator
set shortmess     +=c                   " helps to avoid all the hit-enter prompts caused by file messages
set backspace      =indent,eol,start    " allow backspacing over everything in insert mode
set list listchars =trail:»,tab:»-      " show invisible characters
set signcolumn     =number              " merge sign and number columns
set updatetime     =300                 " speed up the updatetime for plugins
set tabstop        =4                   " a tab is four spaces
set softtabstop    =4                   " when hitting <BS>, pretend like a tab is removed, even if spaces
set shiftwidth     =4                   " number of spaces to use for autoindenting
set scrolloff      =5                   " keep 5 lines off the edges of the screen when scrolling
set laststatus     =2                   " always show status line
set mouse          =nv                  " enable mouse in normal and visual mode
set hidden                              " hidden instead of closed when opening new buffer
set autoread                            " automatically reload files changed outside of Vim
set expandtab                           " expand tabs by default (overloadable per file type later)
set showcmd                             " show partial commands in the last line of the screen
set showmatch                           " set show matching parenthesis
set showmode                            " always show what mode we're currently editing in
set ignorecase                          " ignore case when searching
set smartcase                           " ignore case if search pattern is all lowercase
set hlsearch                            " highlight search terms
set incsearch                           " show search matches as you type
set gdefault                            " search/replace globally (on a line) by default
set ruler                               " always show cursor position
set number                              " always show line numbers
set relativenumber                      " set line numbers relative to the cursor
set lazyredraw                          " buffer screen updates instead of updating all the time
set wrap breakindent                    " wrap lines and keep indentation on wrap
set linebreak                           " wrap on last word instead of last characters
set confirm                             " prompt before closing with unsaved changes
set title                               " set title of window to filename
set smarttab                            " insert tabs on the start of a line according to shiftwidth
set autoindent                          " always set autoindenting on
set wildmenu                            " commandline completion menu
set nobackup                            " no backup before overwriting
set nowritebackup                       " no backup before overwriting
set magic                               " enable extended regex
" set cursorline                          " hightlight the cursorline
" set cursorcolumn                        " highlight the cursorcolumn

" remove cursorline when in insert mode
" autocmd InsertLeave,WinEnter * set cursorline
" autocmd InsertEnter,WinLeave * set nocursorline

" remove cursorcolumn when in insert mode
" autocmd InsertLeave,WinEnter * set cursorcolumn
" autocmd InsertEnter,WinLeave * set nocursorcolumn

""" Plugin Configurations

" NERDTree
let NERDTreeShowHidden=1
let g:NERDTreeDirArrowExpandable = '↠'
let g:NERDTreeDirArrowCollapsible = '↡'

" Airline
let g:airline_powerline_fonts = 1
let g:airline_section_warning = ''
let g:airline#extensions#tabline#enabled = 1

" Rainbow parenthesis
let g:rainbow_active = 0

" Neovim :Terminal
tmap <Esc> <C-\><C-n>
tmap <C-w> <Esc><C-w>
autocmd BufWinEnter,WinEnter term://* startinsert
autocmd BufLeave term://* stopinsert

" EasyAlign
xmap ga <Plug>(EasyAlign)
nmap ga <Plug>(EasyAlign)

" indentLine
let g:indentLine_char = '▏'
let g:indentLine_color_gui = '#363949'
let g:indentLine_setConceal = 2
let g:indentLine_concealcursor = "nv"

" TagBar
let g:tagbar_width = 30
let g:tagbar_iconchars = ['↠', '↡']

" Coc.nvim
" Use tab for trigger completion with characters ahead and navigate.
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"

" Use <c-space> to trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()

" Make <CR> auto-select the first completion item and notify coc.nvim to
" format on enter, <cr> could be remapped by other vim plugin
inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list.
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>

" Add `:Format` command to format current buffer.
command! -nargs=0 Format :call CocAction('format')

" Add `:Fold` command to fold current buffer.
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer.
command! -nargs=0 OR   :call     CocAction('runCommand', 'editor.action.organizeImport')

" Coc status-line integration
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Mappings for CoCList
" Show all diagnostics.
nnoremap <silent><nowait> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions.
nnoremap <silent><nowait> <space>x  :<C-u>CocList extensions<cr>
" Show commands.
nnoremap <silent><nowait> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document.
nnoremap <silent><nowait> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols.
nnoremap <silent><nowait> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item.
nnoremap <silent><nowait> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item.
nnoremap <silent><nowait> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list.
nnoremap <silent><nowait> <space>p  :<C-u>CocListResume<CR>

""" Filetype-Specific Configurations

" HTML, XML, Jinja
autocmd FileType html setlocal shiftwidth=2 tabstop=2 softtabstop=2
autocmd FileType css setlocal shiftwidth=2 tabstop=2 softtabstop=2
autocmd FileType xml setlocal shiftwidth=2 tabstop=2 softtabstop=2
autocmd FileType htmldjango setlocal shiftwidth=2 tabstop=2 softtabstop=2
autocmd FileType htmldjango inoremap {{ {{  }}<left><left><left>
autocmd FileType htmldjango inoremap {% {%  %}<left><left><left>
autocmd FileType htmldjango inoremap {# {#  #}<left><left><left>

" Markdown and Journal
autocmd FileType markdown setlocal shiftwidth=2 tabstop=2 softtabstop=2
autocmd FileType journal setlocal shiftwidth=2 tabstop=2 softtabstop=2

" Python
autocmd FileType python nmap <leader>py :0,$!~/.config/nvim/env/bin/python -m yapf<CR>

""" Custom Functions

" Trim Whitespaces
function! TrimWhitespace()
    let l:save = winsaveview()
    %s/\\\@<!\s\+$//e
    call winrestview(l:save)
endfunction

" One Mode (Dark)
function! ColorOneDark()
    let g:airline_theme='one'
    color one
    set background=dark
    IndentLinesEnable
endfunction

" One Mode (light)
function! ColorOneLight()
    let g:airline_theme='one'
    color one
    set background=light
    IndentLinesEnable
endfunction

" Zazen Mode (Black & White)
function! ColorZazen()
    let g:airline_theme='minimalist'
    color zazen
    IndentLinesEnable
endfunction

" Material Mode (Dark)
function! ColorMaterial()
    let g:airline_theme='deus'
    color material
    IndentLinesEnable
endfunction

" Paper Mode
function! ColorPaperLight()
    let g:airline_theme='papercolor'
    color PaperColor
    set background=light
    IndentLinesEnable
endfunction

" Paper Mode
function! ColorPaperDark()
    let g:airline_theme='papercolor'
    color PaperColor
    set background=dark
    IndentLinesEnable
endfunction

" Show Documentation
function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  elseif (coc#rpc#ready())
    call CocActionAsync('doHover')
  else
    execute '!' . &keywordprg . " " . expand('<cword>')
  endif
endfunction

""" Custom Mappings

" Smart way to move between windows
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l

" Tabs
nnoremap <C-Left> :tabprevious<CR>
nnoremap <C-Right> :tabnext<CR>

let mapleader=" "
nmap <leader>q :NERDTreeToggle<CR>
nmap \ <leader>q
nmap <leader>ec :ColorToggle<CR>
nmap <leader>ee :ColorHighlight<CR>
nmap <leader>ea :AirlineTheme 
nmap <leader>e1 :call ColorMaterial()<CR>
nmap <leader>e2 :call ColorZazen()<CR>
nmap <leader>e3 :call ColorOneLight()<CR>
nmap <leader>e4 :call ColorOneDark()<CR>
nmap <leader>e5 :call ColorPaperLight()<CR>
nmap <leader>e6 :call ColorPaperDark()<CR>
nmap <leader>[  :RainbowToggle<CR>
nmap <leader>r  :so ~/.config/nvim/init.vim<CR>
nmap <leader>0  :TagbarToggle<CR>
nmap <leader>tw :call TrimWhitespace()<CR>
xmap <leader>l  gaip*
nmap <leader>l  gaip*
nmap <leader>t  <C-w>s<C-w>j:terminal<CR>
nmap <leader>vt <C-w>v<C-w>l:terminal<CR>
nmap <leader>f  :Files<CR>
nmap <leader>g  :Goyo<CR>
nmap <leader>h  :RainbowParentheses!!<CR>
nmap <leader>x  :bd<CR>
nmap <silent> <leader><leader> :noh<CR>
nmap <Tab>      :bnext<CR>
nmap <S-Tab>    :bprevious<CR>
