#!/bin/sh

# ███████╗████████╗ █████╗ ██████╗ ████████╗██╗  ██╗
# ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝╚██╗██╔╝
# ███████╗   ██║   ███████║██████╔╝   ██║    ╚███╔╝
# ╚════██║   ██║   ██╔══██║██╔══██╗   ██║    ██╔██╗
# ███████║   ██║   ██║  ██║██║  ██║   ██║   ██╔╝ ██╗
# ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

# 01001101 01101001 01101110 01101001 01000010 01100101 01100001 01110011 01110100

userresources=$HOME/.Xresources
usermodmap=$HOME/.Xmodmap

xrdb -merge "$userresources"
xmodmap "$usermodmap"

for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
    [ -x "$f" ] && . "$f"
done
unset f

# Theming
export QT_QPA_PLATFORMTHEME=qt5ct
export QT_STYLE_OVERRIDE=kvantum

xbindkeys &
xsetroot -cursor_name left_ptr
exec bspwm -c ~/.config/bspwm/bspwmrc
