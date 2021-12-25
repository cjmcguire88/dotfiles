# ███████╗███████╗██╗  ██╗
# ╚══███╔╝██╔════╝██║  ██║
#   ███╔╝ ███████╗███████║
#  ███╔╝  ╚════██║██╔══██║
# ███████╗███████║██║  ██║
# ╚══════╝╚══════╝╚═╝  ╚═╝

# 01001101 01101001 01101110 01101001 01000010 01100101 01100001 01110011 01110100

if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

autoload -Uz compinit
compinit
eval "$(zoxide init zsh)"

bindkey "^[[A" history-beginning-search-backward
bindkey "^[[B" history-beginning-search-forward

ZSH_CACHE_DIR=~/.cache/zsh
HISTSIZE=1000000

HISTFILE=~/.config/zsh/zsh_history

ZSH_THEME="powerlevel10k"
plugins=(git sudo colorize zsh-vi-mode zsh-syntax-highlighting zsh-autosuggestions)

for config_file ($ZDOTDIR/lib/*.zsh); do
  source $config_file
done

for plugin ($plugins); do
    source $ZDOTDIR/plugins/$plugin/$plugin.plugin.zsh
done

if [ ! "$ZSH_THEME" = ""  ] && [ -f "$ZDOTDIR/themes/$ZSH_THEME/$ZSH_THEME.zsh-theme" ]; then
    source "$ZDOTDIR/themes/$ZSH_THEME/$ZSH_THEME.zsh-theme"
fi

source ~/.config/zsh/.p10k.zsh
source ~/.config/shell/aliases
source ~/.config/shell/functions

cursor_mode
