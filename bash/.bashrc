# ██████╗  █████╗ ███████╗██╗  ██╗
# ██╔══██╗██╔══██╗██╔════╝██║  ██║
# ██████╔╝███████║███████╗███████║
# ██╔══██╗██╔══██║╚════██║██╔══██║
# ██████╔╝██║  ██║███████║██║  ██║
# ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

# 01001101 01101001 01101110 01101001 01000010 01100101 01100001 01110011 01110100

BASH_THEME="bobby"
HISTFILE=$HOME/.config/bash/bash_history
plugins=(sudo)
eval "$(zoxide init bash)"

for config_file in ~/.config/bash/lib/*.sh; do
  source $config_file
done

for plugin in $plugins; do
    source ~/.config/bash/plugins/$plugin.plugin.bash
done

if [[ ! -z $BASH_THEME ]]; then
    source ~/.config/bash/themes/colours.theme.sh
    source ~/.config/bash/themes/base.theme.sh
    source ~/.config/bash/themes/$BASH_THEME/$BASH_THEME.theme.sh
fi

source ~/.config/bash/bash_welcome
source ~/.config/shell/aliases
source ~/.config/shell/functions
