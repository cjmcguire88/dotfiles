import AstalTray from "gi://AstalTray"
import { createBinding, For } from "ags"
import { Gtk } from "ags/gtk4"

export default function Tray() {
    const tray = AstalTray.get_default()
    const items = createBinding(tray, "items")
    
    const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
        btn.menuModel = item.menuModel
        btn.insert_action_group("dbusmenu", item.actionGroup)
        
        item.connect("notify::action-group", () => {
            btn.insert_action_group("dbusmenu", item.actionGroup)
        })
    }
    
    return (
        <box css="background: none;" spacing={4}>
            <For each={items}>
                {(item) => (
                    <menubutton $={(self) => init(self, item)}>
                        <image 
                            gicon={createBinding(item, "gicon")} 
                            pixelSize={16}
                        />
                    </menubutton>
                )}
            </For>
        </box>
    )
}
