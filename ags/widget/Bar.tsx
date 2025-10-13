#!/usr/bin/env -S ags run

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"

// Import all our modular components
import { ArchLauncher, PowerMenu, IdleInhibitor } from "../modules/Custom"
import { Workspaces, WindowTitle } from "../modules/Hyprland"
import Audio from "../modules/Audio"
import Network from "../modules/Network"
import SystemInfo from "../modules/SystemInfo"
import Battery from "../modules/Battery"
import Clock from "../modules/Clock"
import Tray from "../modules/Tray"

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return (
        <window
            visible
            name="bar"
            css="
                background: linear-gradient(to bottom, #11111b 30%, #202124);
                color: #edfefe;
                font-family: 'FontAwesome', 'Fira Sans';
                font-size: 13px;
            "
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
        >
            <centerbox css="padding: 0 8px;">
                {/* Left modules - similar to Waybar modules-left */}
                <box $type="start" css="margin: 2px;" spacing={4}>
                    <ArchLauncher />
                    <Workspaces />
                </box>
                
                {/* Center modules - similar to Waybar modules-center */}
                <box $type="center" css="margin: 2px;">
                    <WindowTitle />
                </box>
                
                {/* Right modules - similar to Waybar modules-right */}
                <box $type="end" css="margin: 2px;" spacing={4}>
                    <Audio />
                    <Network />
                    <SystemInfo />
                    <IdleInhibitor />
                    <Battery />
                    <Clock />
                    <Tray />
                    <PowerMenu />
                </box>
            </centerbox>
        </window>
    )
}
