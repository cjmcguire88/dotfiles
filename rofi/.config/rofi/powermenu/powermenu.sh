#!/usr/bin/env bash

dir="$HOME/.config/rofi/powermenu"
rofi_command="rofi -theme $dir/powermenu.rasi"

uptime=$(uptime -p | sed -e 's/up //g')
kernel=$(uname -r)

# Options
shutdown=""
reboot=""
lock=""
hibernate=""
logout=""

# Confirmation
confirm_exit() {
	echo -e "Yes\nNo" | rofi -dmenu\
		-i\
		-no-fixed-num-lines\
		-p "Are You Sure?"\
		-theme $HOME/.config/rofi/powermenu/dialog.rasi
}


# Variable passed to rofi
options="$shutdown\n$reboot\n$lock\n$hibernate\n$logout"

chosen="$(echo -e "$options" | $rofi_command -p " $kernel  祥 $uptime " -dmenu -selected-row 2)"
case $chosen in
    $shutdown)
		ans=$(confirm_exit &)
		if [[ $ans == "Yes" ]]; then
			systemctl poweroff
        else
			exit 0
        fi
        ;;
    $reboot)
		ans=$(confirm_exit &)
		if [[ $ans == "Yes" ]]; then
			systemctl reboot
        else
			exit 0
        fi
        ;;
    $lock)
        lockscreen
        ;;
    $hibernate)
		ans=$(confirm_exit &)
		if [[ $ans == "Yes" ]]; then
            systemctl hibernate
        else
            exit 0
        fi
        ;;
    $logout)
		ans=$(confirm_exit &)
		if [[ $ans == "Yes" ]]; then
			bspc quit
        else
			exit 0
        fi
        ;;
esac
