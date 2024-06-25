# ███████╗███╗   ██╗██╗   ██╗██╗██████╗  ██████╗ ███╗   ██╗███╗   ███╗███████╗███╗   ██╗████████╗
# ██╔════╝████╗  ██║██║   ██║██║██╔══██╗██╔═══██╗████╗  ██║████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
# █████╗  ██╔██╗ ██║██║   ██║██║██████╔╝██║   ██║██╔██╗ ██║██╔████╔██║█████╗  ██╔██╗ ██║   ██║
# ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██║██╔══██╗██║   ██║██║╚██╗██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
# ███████╗██║ ╚████║ ╚████╔╝ ██║██║  ██║╚██████╔╝██║ ╚████║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║
# ╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝

# 01001101 01101001 01101110 01101001 01000010 01100101 01100001 01110011 01110100
# Additions to path
export PATH=$HOME/.local/bin:$PATH

# Zsh config directory
export ZDOTDIR=$HOME/.config/zsh

# User configuration
export OPENCV_LOG_LEVEL=ERROR
export KEYTIMEOUT=1
export BROWSER='google-chrome-stable'
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

function command_not_found_handler {
    local purple='\e[1;35m' bright='\e[0;1m' green='\e[1;32m' reset='\e[0m'
    printf 'zsh: command not found: %s\n' "$1"
    local entries=(
        ${(f)"$(/usr/bin/pacman -F --machinereadable -- "/usr/bin/$1")"}
    )
    if (( ${#entries[@]} ))
    then
        printf "${bright}$1${reset} may be found in the following packages:\n"
        local pkg
        for entry in "${entries[@]}"
        do
            # (repo package version file)
            local fields=(
                ${(0)entry}
            )
            if [[ "$pkg" != "${fields[2]}" ]]
            then
                printf "${purple}%s/${bright}%s ${green}%s${reset}\n" "${fields[1]}" "${fields[2]}" "${fields[3]}"
            fi
            printf '    /%s\n' "${fields[4]}"
            pkg="${fields[2]}"
        done
    fi
    return 127
}
