import AstalWp from "gi://AstalWp"
import { createBinding } from "ags"
import { Gtk } from "ags/gtk4"

export default function Audio() {
    const wp = AstalWp.get_default()
    if (!wp) return <box />
    
    const { defaultSpeaker: speaker } = wp
    
    const getVolumeIcon = (volume: number, muted: boolean) => {
        if (muted) return "󰝟"
        
        if (volume >= 0.7) return "󰕾"
        if (volume >= 0.3) return "󰖀"
        if (volume > 0) return "󰕿"
        return "󰖁"
    }
    
    const displayText = createBinding(speaker, "volume")((volume) => {
        const percent = Math.floor(volume * 100)
        const icon = getVolumeIcon(volume, speaker.mute)
        return `${percent}% ${icon}`
    })
    
    const cssClasses = createBinding(speaker, "mute")((muted) => 
        muted ? "pulseaudio muted" : "pulseaudio"
    )
    
    return (
        <menubutton css="
            border-radius: 20px;
            background: radial-gradient(#444, #333 60%, #1e1e2e);
            box-shadow: inset 2px 2px 6px #050505, 0 1px 6px rgba(0, 0, 0, 0.3);
            text-shadow: 2px 2px 4px #000;
            transition: background 0.1s ease, color 0.1s ease, font-size 0.1s ease;
            color: #f9e2af;
            margin: 2px 0;
            padding: 0 10px;
        ">
            <label label={displayText} />
            <popover>
                <box spacing={8} orientation={Gtk.Orientation.VERTICAL}>
                    <box spacing={8}>
                        <label label="Volume" />
                        <slider
                            widthRequest={200}
                            value={createBinding(speaker, "volume")}
                            onChangeValue={({ value }) => speaker.set_volume(value)}
                        />
                    </box>
                    <button onClicked={() => speaker.set_mute(!speaker.mute)}>
                        <label label={createBinding(speaker, "mute")((m) => m ? "Unmute" : "Mute")} />
                    </button>
                </box>
            </popover>
        </menubutton>
    )
}
