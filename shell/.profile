# ███████╗███╗   ██╗██╗   ██╗██╗██████╗  ██████╗ ███╗   ██╗███╗   ███╗███████╗███╗   ██╗████████╗
# ██╔════╝████╗  ██║██║   ██║██║██╔══██╗██╔═══██╗████╗  ██║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
# █████╗  ██╔██╗ ██║██║   ██║██║██████╔╝██║   ██║██╔██╗ ██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║
# ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██║██╔══██╗██║   ██║██║╚██╗██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
# ███████╗██║ ╚████║ ╚████╔╝ ██║██║  ██║╚██████╔╝██║ ╚████║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║
# ╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝

# 01001101 01101001 01101110 01101001 01000010 01100101 01100001 01110011 01110100

# Additions to path
export PATH=$HOME/.local/bin:$PATH

# Source bashrc
[[ $(ps -p $$ -oargs=) =~ "bash" ]] && source ~/.config/bash/bashrc

# Zsh config directory
export ZDOTDIR=$HOME/.config/zsh

# User configuration
export OPENCV_LOG_LEVEL=ERROR
export KEYTIMEOUT=1
export BROWSER='chromium'
export ZSH_COLORIZE_STYLE="colorful"

# XDG directories
export XDG_CONFIG_HOME='/home/jason/.config'
export XDG_CACHE_HOME='/home/jason/.cache'
export XDG_DATA_HOME='/home/jason/.local/share'
export XDG_RUNTIME_DIR='/run/user/1000'

# Preferred editor for local and remote sessions
export EDITOR='nvim'
export VISUAL='nvim'
export MANPAGER="/bin/sh -c \"col -b | nvim -c 'set ft=man ts=8 nomod nolist nonu noma' -\""

# Compilation flags
export CFLAGS="-march=native -O3 -pipe -flto=auto -fstack-clash-protection -fno-plt -fexceptions"
export CPPFLAGS="-D_FORTIFY_SOURCE=2"
export CXXFLAGS="$CFLAGS"
export LDFLAGS="-Wl,-O4,--sort-common,--as-needed,-z,relro,-z,now,-lgomp,-lpthread"
export MAKEFLAGS="-j$((`nproc` - `nproc` / 4))"

# makepkg flags
export PACKAGER="Jason McGuire <cjmcguire88@gmail.com>"

# Theming
export QT_QPA_PLATFORMTHEME=qt5ct
export QT_STYLE_OVERRIDE=kvantum
