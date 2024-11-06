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

## Configuration Steps

1. Open Raycast Preferences (`⌘,`)
2. Go to Extensions > Yabai
3. Set up shortcuts for each command:
   - Click on a command
   - Press your desired key combination
   - Repeat for all commands

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

## Contributing

### Opening an Issue
1. Visit the [Issues page](https://github.com/your-username/raycast-yabai/issues)
2. Click "New Issue"
3. Choose from the templates:
   ```markdown
   ## Bug Report
   ### Description
   [Clear description of the bug]

   ### Steps to Reproduce
   1. [First step]
   2. [Second step]
   3. [And so on...]

   ### Expected Behavior
   [What should happen]

   ### Actual Behavior
   [What actually happens]

   ### Environment
   - macOS version:
   - Yabai version:
   - Raycast version:
   ```

   ```markdown
   ## Feature Request
   ### Description
   [Clear description of the feature]

   ### Use Case
   [Why this feature would be useful]

   ### Proposed Implementation
   [Optional: How you think this could be implemented]
   ```

### Opening a Pull Request
1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add some feature"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `refactor:` for refactoring
   - `test:` for tests
   - `chore:` for maintenance

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request:
   - Visit your fork on GitHub
   - Click "Pull Request"
   - Use this template:
   ```markdown
   ## Description
   [Clear description of the changes]

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   - [ ] Other (please describe)

   ## Testing
   [How you tested your changes]

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Checklist
   - [ ] My code follows the project's style guidelines
   - [ ] I have tested my changes
   - [ ] I have updated the documentation
   - [ ] My changes generate no new warnings
   ```

## Roadmap

Click on any feature to copy its branch name or create a PR:

### Window Stack Management
- [ ] [Add stack navigation commands](https://github.com/drucial/raycast-yabai/compare/main...feature/add-stack-navigation?quick_pull=1&title=feat:+Add+stack+navigation+commands&body=Add+next+and+previous+stack+window+focus+commands%0A%0ABranch+name:+`feature/add-stack-navigation`)
  ```
  git checkout -b feature/add-stack-navigation
  ```

### Window Float Controls
- [ ] [Add float toggle commands](https://github.com/drucial/raycast-yabai/compare/main...feature/add-float-controls?quick_pull=1&title=feat:+Add+float+control+commands&body=Add+float+and+sticky+window+toggle+commands%0A%0ABranch+name:+`feature/add-float-controls`)
  ```
  git checkout -b feature/add-float-controls
  ```

### Layout Management
- [ ] [Add mirror commands](https://github.com/drucial/raycast-yabai/compare/main...feature/add-mirror-commands?quick_pull=1&title=feat:+Add+mirror+commands&body=Add+vertical+and+horizontal+mirror+commands%0A%0ABranch+name:+`feature/add-mirror-commands`)
  ```
  git checkout -b feature/add-mirror-commands
  ```
- [ ] [Add layout toggle command](https://github.com/drucial/raycast-yabai/compare/main...feature/add-layout-toggle?quick_pull=1&title=feat:+Add+layout+toggle+command&body=Add+bsp/float+layout+toggle+command%0A%0ABranch+name:+`feature/add-layout-toggle`)
  ```
  git checkout -b feature/add-layout-toggle
  ```

### Window Insertion
- [ ] [Add split type toggle](https://github.com/drucial/raycast-yabai/compare/main...feature/add-split-toggle?quick_pull=1&title=feat:+Add+split+type+toggle&body=Add+vertical/horizontal+split+toggle+command%0A%0ABranch+name:+`feature/add-split-toggle`)
  ```
  git checkout -b feature/add-split-toggle
  ```

### Display Management
- [ ] [Add display focus commands](https://github.com/your-username/raycast-yabai/compare/main...feature/add-display-focus?quick_pull=1&title=feat:+Add+display+focus+commands&body=Add+next+and+previous+display+focus+commands%0A%0ABranch+name:+`feature/add-display-focus`)
  ```
  git checkout -b feature/add-display-focus
  ```

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