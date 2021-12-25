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

xbindkeys &
exec bspwm -c ~/.config/bspwm/bspwmrc
