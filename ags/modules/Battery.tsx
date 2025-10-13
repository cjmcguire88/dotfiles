import AstalBattery from "gi://AstalBattery"
import AstalPowerProfiles from "gi://AstalPowerProfiles"
import { createBinding } from "ags"
import { Gtk } from "ags/gtk4"

export default function Battery() {
    const battery = AstalBattery.get_default()
    const powerProfiles = AstalPowerProfiles.get_default()
    
    // Battery percentage
    const percentage = createBinding(battery, "percentage")((p) => 
        Math.floor(p * 100)
    )
    
    // Battery state classes for styling
    const cssClasses = createBinding(battery, "percentage")((p) => {
        const percent = Math.floor(p * 100)
        const isCharging = battery.state === AstalBattery.State.CHARGING
        const isPlugged = battery.state === AstalBattery.State.FULLY_CHARGED
        
        let classes = ["battery"]
        
        if (isCharging) classes.push("charging")
        if (isPlugged) classes.push("plugged")
        if (percent <= 15 && !isCharging) classes.push("critical")
        if (percent <= 30 && !isCharging) classes.push("warning")
        
        return classes.join(" ")
    })
    
    // Battery icons similar to Waybar
    const getIcon = (percent: number, isCharging: boolean) => {
        if (isCharging) return "󰂄" // charging icon
        
        if (percent >= 90) return "󰁹" // full
        if (percent >= 70) return "󰂀" // high
        if (percent >= 50) return "󰁾" // medium
        if (percent >= 30) return "󰁻" // low
        return "󰂃" // critical
    }
    
    const displayText = createBinding(battery, "percentage")((p) => {
        const percent = Math.floor(p * 100)
        const isCharging = battery.state === AstalBattery.State.CHARGING
        const isPlugged = battery.state === AstalBattery.State.FULLY_CHARGED
        const icon = getIcon(percent, isCharging)
        
        if (isCharging) return `${percent}% ${icon}󰉁`
        if (isPlugged) return `${percent}% 󰚥`
        return `${percent}% ${icon}`
    })
    
    return (
        <menubutton 
            visible={createBinding(battery, "isPresent")}
            css="
                background: none;
                transition: text-shadow 0.5s ease;
                margin: 2px 0;
                padding: 0 10px;
                color: #fff;
            "
        >
            <label label={displayText} />
            <popover>
                <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                    <label label="Power Profiles" />
                    {powerProfiles && powerProfiles.get_profiles().map(({ profile }) => (
                        <button 
                            onClicked={() => powerProfiles.set_active_profile(profile)}
                        >
                            <label label={profile} xalign={0} />
                        </button>
                    ))}
                </box>
            </popover>
        </menubutton>
    )
}
