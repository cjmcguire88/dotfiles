#!/usr/bin/env bash

## Author : Aditya Shakya (adi1090x)
## Github : @adi1090x
#
## Rofi   : Power Menu
#
## Available Styles
#
## style-1   style-2   style-3   style-4   style-5
## style-6   style-7   style-8   style-9   style-10

# Current Theme
dir="$HOME/.config/rofi/powermenu/type-2"
theme='style-7'

# CMDs
uptime="$(uptime -p | sed -e 's/up //g')"
host=$(hostname)

# Options
shutdown=' '
reboot=' '
lock=' '
suspend='󰤄 '
logout='󰗽 '
yes='  Yes '
no='   No'

# Rofi CMD
rofi_cmd() {
    rofi -dmenu \
        -p "Uptime: $uptime" \
        -mesg "Uptime: $uptime" \
        -theme ${dir}/${theme}.rasi
}

# Confirmation CMD
confirm_cmd() {
    rofi -theme-str 'window {location: center; anchor: center; fullscreen: false; width: 350px;}' \
        -theme-str 'mainbox {children: [ "message", "listview" ];}' \
        -theme-str 'listview {columns: 2; lines: 1;}' \
        -theme-str 'element-text {horizontal-align: 0.5;}' \
        -theme-str 'textbox {horizontal-align: 0.5;}' \
        -dmenu \
        -p 'Confirmation' \
        -mesg 'Are you Sure?' \
        -theme ${dir}/${theme}.rasi
}

# Ask for confirmation
confirm_exit() {
    echo -e "$yes\n$no" | confirm_cmd
}

# Pass variables to rofi dmenu
run_rofi() {
    echo -e "$shutdown\n$reboot\n$lock\n$suspend\n$logout" | rofi_cmd
}

# Actions
chosen="$(run_rofi)"
case ${chosen} in
$shutdown)
    selected="$(confirm_exit)"
    if [[ "$selected" == "$yes" ]]; then
        systemctl poweroff
    fi
    ;;
$reboot)
    selected="$(confirm_exit)"
    if [[ "$selected" == "$yes" ]]; then
        systemctl reboot
    fi
    ;;
$lock)
    loginctl lock-session
    ;;
$suspend)
    systemctl suspend
    ;;
$logout)
    selected="$(confirm_exit)"
    if [[ "$selected" == "$yes" ]]; then
        loginctl terminate-session auto
    fi
    ;;
esac
