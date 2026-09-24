#!/usr/bin/env bash

SCRIPT="$HOME/.local/bin/bridge"
SIGNAL=10

case "${1:-}" in
toggle)
    if [[ "$($SCRIPT status)" == "bridge" ]]; then
        "$SCRIPT" -d && notify-send "Bridge" "Deactivated" -i network-wired-disconnected
    else
        "$SCRIPT" -a && notify-send "Bridge" "Activated" -i network-wired
    fi
    pkill -RTMIN+$SIGNAL waybar 2>/dev/null || true
    ;;
*)
    status="$($SCRIPT status)"

    case "$status" in
    bridge)
        icon="" # ← put your VM/server icon here (e.g. the \uf233 one)
        class="bridge"
        tooltip="Bridge: ON (click to disable)"
        ;;
    ethernet)
        icon="󰈀" # ← ethernet icon
        class="ethernet"
        tooltip="Ethernet (click to enable bridge)"
        ;;
    wifi)
        icon="" # ← wifi icon
        class="wifi"
        tooltip="WiFi (click to enable bridge)"
        ;;
    down)
        icon="" # ← disconnected icon (or leave empty)
        class="down"
        tooltip="No connection (click to enable bridge)"
        ;;
    esac

    printf '{"text":"%s","class":"%s","tooltip":"%s"}\n' "$icon" "$class" "$tooltip"
    ;;
esac
