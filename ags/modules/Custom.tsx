import { execAsync } from "ags/process"

// Arch Linux launcher (custom/arch)
export function ArchLauncher() {
    return (
        <button
            css="
                font-size: 20px;
                background: none;
                color: #1793d1;
                text-shadow: 2px 2px 4px #000;
                transition: color 0.5s ease, text-shadow 0.5s ease;
                margin: 2px 0;
                padding: 0 10px;
            "
            onClicked={() => execAsync("rofi -show drun")}
        >
            <label label="󰣇 " />
        </button>
    )
}

// Power menu (custom/power)
export function PowerMenu() {
    const handlePowerMenu = () => {
        // Check if the specific script exists, otherwise use a generic power menu
        execAsync("$HOME/.config/rofi/powermenu/powermenu.sh")
            .catch(() => {
                // Fallback power menu
                execAsync([
                    "rofi", "-dmenu", "-p", "Power:", "-theme-str",
                    "listview { lines: 5; }"
                ], `Shutdown
Reboot
Logout
Lock
Suspend`).then((choice) => {
                    switch (choice.trim()) {
                        case "Shutdown":
                            execAsync("systemctl poweroff")
                            break
                        case "Reboot":
                            execAsync("systemctl reboot")
                            break
                        case "Logout":
                            execAsync("hyprctl dispatch exit")
                            break
                        case "Lock":
                            execAsync("loginctl lock-session")
                            break
                        case "Suspend":
                            execAsync("systemctl suspend")
                            break
                    }
                })
            })
    }

    return (
        <button
            css="
                font-size: 20px;
                background: none;
                color: #c0392b;
                transition: color 0.5s ease, text-shadow 0.5s ease;
                margin: 2px 0;
                padding: 0 10px;
            "
            onClicked={handlePowerMenu}
        >
            <label label="⏻" />
        </button>
    )
}

// Idle inhibitor
export function IdleInhibitor() {
    // This would need a proper idle inhibitor service
    // For now, just a placeholder that matches Waybar's styling
    return (
        <button css="
            background: none;
            color: #666;
            margin: 2px 0;
            padding: 0 10px;
        ">
            <label label="󰥻" />
        </button>
    )
}
