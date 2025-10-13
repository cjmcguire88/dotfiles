import AstalHyprland from "gi://AstalHyprland"
import { createBinding } from "ags"
import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"

// Hyprland Workspaces (similar to Waybar hyprland/workspaces)
export function Workspaces() {
    try {
        const hypr = AstalHyprland.get_default()
        
        // Create simple static workspaces for now
        const workspaceIcons = ["󰎤", "󰎧", "󰎪", "󰎭", "󰎱"]
        
        return (
            <box css="
                font-size: 18px;
                border: inset 1px #11111b;
                border-radius: 20px;
                margin: 2px 4px;
                padding: 0 5px;
                background: #45475a;
                box-shadow: inset 2px 2px 4px 2px #181825;
            ">
                {workspaceIcons.map((icon, index) => {
                    const workspaceId = index + 1
                    return (
                        <button
                            css="
                                padding: 0 5px;
                                background: none;
                                color: #edfefe;
                                text-shadow: 2px 2px 4px #000;
                                font-size: 15px;
                                border-radius: 20px;
                            "
                            onClicked={() => execAsync(`hyprctl dispatch workspace ${workspaceId}`)}
                        >
                            <label label={icon} />
                        </button>
                    )
                })}
            </box>
        )
    } catch (error) {
        console.error("Hyprland not available:", error)
        return (
            <box >
                {[1, 2, 3, 4, 5].map((id) => (
                    <button onClicked={() => execAsync(`hyprctl dispatch workspace ${id}`)}>
                        <label label={`${id}`} />
                    </button>
                ))}
            </box>
        )
    }
}

// Hyprland Window Title (similar to Waybar hyprland/window)
export function WindowTitle() {
    try {
        const hypr = AstalHyprland.get_default()
        const focusedClient = createBinding(hypr, "focusedClient")
        
        const windowTitle = focusedClient((client) => {
            if (!client) return "Desktop"
            return client.title || client.class || "Unknown"
        })
        
        return (
            <box >
                <label 
                    label={windowTitle}
                    ellipsize={3} // Pango.EllipsizeMode.END
                    widthChars={50}
                />
            </box>
        )
    } catch (error) {
        console.error("Hyprland not available:", error)
        return (
            <box >
                <label label="Desktop" />
            </box>
        )
    }
}
