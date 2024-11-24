
import { MessageType } from "./notifications";
import { isYabaiRunning, runYabaiCommand } from "../helpers/scripts";
import { MESSAGES, showYabaiMessage } from "../utils/notifications";
import { getWindowInfo } from "../helpers/window";
import { CommandOptions } from "../types";

async function checkFocusedWindow(): Promise<boolean> {
  try {
    const windowInfo = await getWindowInfo();
    return windowInfo !== null;
  } catch (error) {
    return false;
  }
}

export async function executeYabaiCommand(options: CommandOptions) {
  // Check if yabai is running
  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    // Check for window requirement first
    if (options.requiresWindow) {
      const windowExists = await checkFocusedWindow();
      if (!windowExists) {
        await showYabaiMessage({
          title: "Command requires a focused window",
          type: MessageType.INFO,
        });
        return;
      }
    }

    // Then run additional validations if they exist
    if (options.validate) {
      const validationResult = await options.validate();
      if (!validationResult.canProceed) {
        await showYabaiMessage({
          title: validationResult.message || options.failureMessage,
          type: MessageType.INFO,
        });
        return;
      }
    }

    // Execute command
    const { stderr } = await runYabaiCommand(options.command);

    // Handle command execution errors
    if (stderr) {
      await showYabaiMessage({
        title: options.failureMessage,
        type: MessageType.INFO,
      });
      return;
    }

    // Show success message
    await showYabaiMessage({
      title: options.successMessage,
      type: MessageType.SUCCESS,
    });
} catch (error) {
    const errorMessage = options.requiresWindow && !await checkFocusedWindow()
      ? "This command requires a focused window"
      : options.failureMessage;
    
    throw new Error(errorMessage);
  }
} 