# Yabai Window Manager for Raycast

Control [Yabai](https://github.com/koekeishiya/yabai) window management directly from Raycast. This is a fork of [logyxiao/raycast_yabai](https://github.com/logyxiao/raycast_yabai).

## Prerequisites

- [Yabai](https://github.com/koekeishiya/yabai) installed and configured (scripting addition required)
- [Raycast](https://raycast.com/) installed

## Installation

1. Open Raycast
2. Search for "Store"
3. Find and install "Yabai Window Manager"

## Setting Up Shortcuts

This extension follows Yabai's traditional shortcut patterns. All shortcuts need to be manually configured in Raycast preferences:

### Window Management
- Focus Window: `⌥ + [h,j,k,l]`
  - `⌥h` - Focus left
  - `⌥j` - Focus down
  - `⌥k` - Focus up
  - `⌥l` - Focus right

- Move Window: `⌥⇧ + [h,j,k,l]`
  - `⌥⇧h` - Move left
  - `⌥⇧j` - Move down
  - `⌥⇧k` - Move up
  - `⌥⇧l` - Move right

- Resize Window: `⌥⌘ + [h,j,k,l]` (Recommended)
  - `⌥⌘h` - Shrink horizontally
  - `⌥⌘j` - Shrink vertically
  - `⌥⌘k` - Grow vertically
  - `⌥⌘l` - Grow horizontally

### Space Management
- Focus Space: `⌥ + [1-9]`
- Move to Space: `⌥⇧ + [1-9]`

### Layout Controls
- `⌥f` - Toggle fullscreen
- `⌥b` - Balance windows
- `⌥r` - Rotate layout

### Space Navigation
- `⌥[` - Move to previous space
- `⌥]` - Move to next space

## Window Resizing

The extension supports intelligent window resizing that works with Yabai's BSP layout:

- **Vertical Resizing**
  - Grows/shrinks windows vertically when possible
  - Automatically detects and resizes against adjacent windows
  - Works with all window positions in BSP mode

- **Horizontal Resizing**
  - Grows/shrinks windows horizontally when possible
  - Automatically detects and resizes against adjacent windows
  - Works with all window positions in BSP mode

Default resize amount is 50 pixels per command execution.

## Configuration Steps

1. Open Raycast Preferences (`⌘,`)
2. Go to Extensions > Yabai
3. Set up shortcuts for each command:
   - Click on a command
   - Press your desired key combination
   - Repeat for all commands

## Troubleshooting

1. **Shortcuts not working:**
   - Ensure Yabai is running (`yabai --start-service`)
   - Check for shortcut conflicts
   - Verify Yabai permissions

2. **Command failed errors:**
   - Check Yabai installation: `/usr/local/bin/yabai --version`
   - Verify service status: `yabai --check-service`

3. **Resize not working:**
   - Ensure window is in BSP mode
   - Verify there are adjacent windows
   - Check if window has room to grow/shrink

## Custom Installation Path

If Yabai is installed in a non-standard location:
1. Open extension preferences
2. Update "Yabai Executable Path"
3. Enter your custom installation path

## Credits

This project is a fork of [logyxiao/raycast_yabai](https://github.com/logyxiao/raycast_yabai), which itself is a fork of the original raycast_yabai project.

## License

MIT License