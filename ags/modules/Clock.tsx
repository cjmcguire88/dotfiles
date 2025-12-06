import GLib from "gi://GLib"
import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

export default function Clock() {
    // Use America/New_York timezone like in your Waybar config
    const time = createPoll("", 1000, () => {
        const now = GLib.DateTime.new_now(GLib.TimeZone.new("America/New_York"))
        return now?.format("%I:%M %p") || ""
    })

    return (
        <menubutton css="
            text-shadow: 2px 2px 4px #000;
            transition: background 0.5s ease;
            margin: 2px 0;
            padding: 0 10px;
            color: #fff;
        ">
            <label label={time} />
            <popover>
                <Gtk.Calendar />
            </popover>
        </menubutton>
    )
}
