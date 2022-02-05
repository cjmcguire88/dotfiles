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

ZSH_CACHE_DIR=$HOME/.cache/zsh
setopt share_history
setopt inc_append_history
export HISTSIZE=100000
export SAVEHIST=1000000
export HISTFILE=$HOME/.config/zsh/zsh_history
bindkey "^[[A" history-beginning-search-backward
bindkey "^[[B" history-beginning-search-forward

ZSH_THEME="powerlevel10k"
plugins=(git sudo colorize zsh-vi-mode zsh-syntax-highlighting zsh-autosuggestions)

for config_file ($ZDOTDIR/lib/*.zsh); do
  source $config_file
done

for plugin ($plugins); do
    source $ZDOTDIR/plugins/$plugin/$plugin.plugin.zsh
done

if [[ -n "$ZSH_THEME"  ]]; then
    source "$ZDOTDIR/themes/$ZSH_THEME/$ZSH_THEME.zsh-theme"
fi

source $XDG_CONFIG_HOME/zsh/.p10k.zsh
source $XDG_CONFIG_HOME/shell/aliases
source $XDG_CONFIG_HOME/shell/functions

cursor_mode
