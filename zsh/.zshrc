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

ZSH_CACHE_DIR=$HOME/.cache/zsh
autoload -Uz compinit
compinit
setopt share_history
setopt inc_append_history
export HISTFILE=$HOME/.zsh_history
export HISTSIZE=100000
export SAVEHIST=1000000
bindkey "^[[A" history-beginning-search-backward
bindkey "^[[B" history-beginning-search-forward
eval "$(zoxide init zsh)"
eval "$(fzf --zsh)"

ZSH_THEME="powerlevel10k"
plugins=(git sudo colorize zsh-vi-mode zsh-syntax-highlighting zsh-autosuggestions dirhistory)

if [[ -n "$ZSH_THEME"  ]]; then
    source "$ZDOTDIR/themes/$ZSH_THEME/$ZSH_THEME.zsh-theme"
fi

for config_file ($ZDOTDIR/lib/*.zsh); do
  source $config_file
done

for plugin ($plugins); do
    source $ZDOTDIR/plugins/$plugin/$plugin.plugin.zsh
done

source $HOME/.config/zsh/.p10k.zsh
source $HOME/.config/shell/env_common
source $HOME/.config/shell/aliases
source $HOME/.config/shell/functions
