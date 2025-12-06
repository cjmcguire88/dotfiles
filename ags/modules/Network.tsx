import AstalNetwork from "gi://AstalNetwork"
import { createBinding, For } from "ags"
import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"

export default function Network() {
    const network = AstalNetwork.get_default()
    const wifi = createBinding(network, "wifi")
    const wired = createBinding(network, "wired")

    // Sort access points by signal strength
    const sortedAPs = (aps: AstalNetwork.AccessPoint[]) =>
        aps.filter(ap => ap.ssid).sort((a, b) => b.strength - a.strength)

    const getNetworkDisplay = () => {
        if (network.wifi?.enabled && network.wifi?.activeAccessPoint) {
            const ap = network.wifi.activeAccessPoint
            return `${ap.ssid} (${ap.strength}%) 󰖩`
        } else if (network.wired?.speed > 0) {
            return `${network.wired.speed}Mb/s 󰌘`
        } else {
            return "Disconnected 󰌙"
        }
    }

    const displayText = createBinding(network, "connectivity")(() => getNetworkDisplay())

    const cssClasses = createBinding(network, "connectivity")((conn) => {
        if (conn === AstalNetwork.Connectivity.FULL) return "network"
        return "network disconnected"
    })

    async function connectToAP(ap: AstalNetwork.AccessPoint) {
        try {
            await execAsync(`nmcli d wifi connect ${ap.bssid}`)
        } catch (error) {
            console.error("Failed to connect to WiFi:", error)
        }
    }

    return (
        <menubutton css="
            background: radial-gradient(#444, #333 60%, #1e1e2e);
            box-shadow: inset 2px 2px 6px #050505, 0 1px 6px rgba(0, 0, 0, 0.3);
            text-shadow: 2px 2px 4px #000;
            transition: background 0.1s ease, color 0.1s ease, font-size 0.1s ease;
            color: #89b4fa;
            margin: 2px 0;
            padding: 0 10px;
        ">
            <label label={displayText} />
            <popover>
                <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                    {wifi((w) => w && (
                        <>
                            <label label="WiFi Networks" />
                            <scrolledwindow
                                heightRequest={200}
                                widthRequest={250}
                                hscrollPolicy={Gtk.ScrollablePolicy.NEVER}
                            >
                                <box orientation={Gtk.Orientation.VERTICAL}>
                                    <For each={createBinding(w, "accessPoints")(sortedAPs)}>
                                        {(ap) => (
                                            <button onClicked={() => connectToAP(ap)}>
                                                <box spacing={8}>
                                                    <image iconName={createBinding(ap, "iconName")} />
                                                    <label
                                                        label={createBinding(ap, "ssid")}
                                                        hexpand
                                                        xalign={0}
                                                    />
                                                    <label
                                                        label={createBinding(ap, "strength")((s) => `${s}%`)}
                                                    />
                                                    <image
                                                        iconName="object-select-symbolic"
                                                        visible={createBinding(w, "activeAccessPoint")((active) => active === ap)}
                                                    />
                                                </box>
                                            </button>
                                        )}
                                    </For>
                                </box>
                            </scrolledwindow>
                        </>
                    ))}

                    {wired((w) => w && w.speed > 0 && (
                        <box spacing={8}>
                            <label label="Ethernet" />
                            <label label={`${w.speed}Mb/s`} />
                        </box>
                    ))}
                </box>
            </popover>
        </menubutton>
    )
}
