import { createPoll } from "ags/time"
import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"

// CPU Module
export function Cpu() {
    const usage = createPoll(0, 2000, async () => {
        try {
            const output = await execAsync("top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | cut -d'%' -f1")
            return parseFloat(output.trim()) || 0
        } catch {
            return 0
        }
    })

    const frequency = createPoll("", 2000, async () => {
        try {
            const output = await execAsync("cat /proc/cpuinfo | grep 'MHz' | head -1 | awk '{print $4}'")
            const mhz = parseFloat(output.trim())
            return `${(mhz / 1000).toFixed(1)} GHz`
        } catch {
            return "N/A"
        }
    })

    return (
        <button css="
            background: radial-gradient(#444, #333 60%, #1e1e2e);
            box-shadow: inset 2px 2px 6px #050505, 0 1px 6px rgba(0, 0, 0, 0.3);
            text-shadow: 2px 2px 4px #000;
            transition: background 0.1s ease, color 0.1s ease, font-size 0.1s ease;
            color: #94e2d5;
            margin: 2px 0;
            padding: 0 10px;
        ">
            <label label={usage((u) => `${u.toFixed(0)}% 󰻠`)} />
        </button>
    )
}

// Memory Module
export function Memory() {
    const memory = createPoll({ used: 0, total: 0, swap: 0 }, 2000, async () => {
        try {
            const output = await execAsync("free -m")
            const lines = output.split('\n')
            const memLine = lines[1].split(/\s+/)
            const swapLine = lines[2].split(/\s+/)

            return {
                used: parseInt(memLine[2]),
                total: parseInt(memLine[1]),
                swap: parseInt(swapLine[2])
            }
        } catch {
            return { used: 0, total: 0, swap: 0 }
        }
    })

    const percentage = memory((m) => m.total > 0 ? Math.round((m.used / m.total) * 100) : 0)

    return (
        <button css="
            background: radial-gradient(#444, #333 60%, #1e1e2e);
            box-shadow: inset 2px 2px 6px #050505, 0 1px 6px rgba(0, 0, 0, 0.3);
            text-shadow: 2px 2px 4px #000;
            transition: background 0.1s ease, color 0.1s ease, font-size 0.1s ease;
            color: #f5c2e7;
            margin: 2px 0;
            padding: 0 10px;
        ">
            <label label={percentage((p) => `${p}% 󰍛`)} />
        </button>
    )
}

// Temperature Module
export function Temperature() {
    const temp = createPoll(0, 2000, async () => {
        try {
            // Try different temperature sources
            const sources = [
                "cat /sys/class/thermal/thermal_zone0/temp",
                "sensors | grep 'Core 0' | awk '{print $3}' | cut -d'+' -f2 | cut -d'°' -f1",
                "cat /sys/class/hwmon/hwmon0/temp1_input"
            ]

            for (const cmd of sources) {
                try {
                    const output = await execAsync(cmd)
                    let temperature = parseFloat(output.trim())

                    // Convert from millidegrees if needed
                    if (temperature > 1000) {
                        temperature = temperature / 1000
                    }

                    if (temperature > 0 && temperature < 150) {
                        return Math.round(temperature)
                    }
                } catch {
                    continue
                }
            }
            return 0
        } catch {
            return 0
        }
    })

    const getIcon = (temperature: number) => {
        if (temperature > 80) return "󰈸" // critical
        if (temperature > 60) return "󰔏" // warning  
        return "󰔐" // normal
    }

    const cssClass = temp((t) => {
        if (t > 80) return "temperature critical"
        return "temperature"
    })

    return (
        <button css="
            background: radial-gradient(#444, #333 60%, #1e1e2e);
            box-shadow: inset 2px 2px 6px #050505, 0 1px 6px rgba(0, 0, 0, 0.3);
            text-shadow: 2px 2px 4px #000;
            transition: background 0.1s ease, color 0.1s ease, font-size 0.1s ease;
            color: #a6e3a1;
            margin: 2px 0;
            padding: 0 10px;
        ">
            <label label={temp((t) => `${t}°C ${getIcon(t)}`)} />
        </button>
    )
}

// Combined Hardware Group (like Waybar group/hardware)
export default function SystemInfo() {
    return (
        <>
            <Cpu />
            <Memory />
            <Temperature />
        </>
    )
}
