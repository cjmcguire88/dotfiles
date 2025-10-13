# AGS Desktop Shell - Modular Setup

This AGS configuration is designed to mirror your Waybar setup with a modular architecture for easy maintenance and customization.

## Structure

```
├── app.ts              # Main application entry point
├── widget/
│   └── Bar.tsx         # Main bar component that combines all modules
├── modules/            # Individual widget modules
│   ├── Audio.tsx       # Volume control with WirePlumber
│   ├── Battery.tsx     # Battery status with power profiles
│   ├── Clock.tsx       # Time and calendar
│   ├── Custom.tsx      # Arch launcher, power menu, idle inhibitor
│   ├── Hyprland.tsx    # Workspaces and window title
│   ├── Network.tsx     # WiFi and ethernet status
│   ├── SystemInfo.tsx  # CPU, memory, temperature
│   └── Tray.tsx        # System tray
├── style.scss          # Styling that mirrors your Waybar theme
└── README.md           # This file
```

## Modules Overview

### Left Side (modules-left)
- **ArchLauncher**: Arch logo that opens rofi app launcher
- **Workspaces**: Hyprland workspace indicators with icons

### Center (modules-center)
- **WindowTitle**: Current window title from Hyprland

### Right Side (modules-right)
- **Audio**: Volume control with popover slider
- **Network**: WiFi/Ethernet status with connection manager
- **SystemInfo**: CPU usage, memory usage, temperature
- **IdleInhibitor**: Idle inhibitor toggle (placeholder)
- **Battery**: Battery percentage with power profiles
- **Clock**: Time with calendar popover
- **Tray**: System tray items
- **PowerMenu**: Power menu with shutdown/reboot options

## Key Features

- **Modular Design**: Each widget is a separate file for easy editing
- **Reactive Bindings**: Uses AGS/Astal's reactive system for live updates
- **Waybar-like Styling**: CSS closely matches your original Waybar theme
- **Interactive Popups**: Click modules to access additional controls
- **System Integration**: Proper integration with Hyprland, NetworkManager, etc.

## Editing Modules

To modify a specific widget:

1. Edit the corresponding file in `modules/`
2. The changes will be reflected in the bar automatically
3. CSS classes match your Waybar config for consistent styling

## Adding New Modules

1. Create a new `.tsx` file in `modules/`
2. Export a default function component
3. Import and add it to `widget/Bar.tsx`
4. Add appropriate CSS styling

## Dependencies

- AGS v2 with Astal libraries
- AstalBattery, AstalNetwork, AstalWp, AstalTray, etc.
- Hyprland (for workspace/window modules)
- System utilities: `free`, `top`, sensors, etc.
