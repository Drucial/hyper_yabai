
import { MessageType } from "./notifications";
import { isYabaiRunning, runYabaiCommand } from "../helpers/scripts";
import { MESSAGES, showYabaiMessage } from "../utils/notifications";
import { getWindowInfo } from "../helpers/window";
import { CommandOptions } from "../types";
import { getSpaceInfo, getSpaceWindows } from "../helpers/space";
import { showFailureToast } from "@raycast/utils";

async function checkFocusedWindow(): Promise<boolean> {
  try {
    const windowInfo = await getWindowInfo();
    if (!windowInfo.data) return false;
    const windowExists = windowInfo.data !== null;
    const windowIsFocused = typeof windowInfo.data === 'object' && 'hasFocus' in windowInfo.data ? windowInfo.data.hasFocus : false;
    return windowExists && windowIsFocused;
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


  console.log("Executing command", options.command);
  try {
    // Check for window requirement first
    if (options.requiresWindow || options.requiresMultipleWindows) {
      const windowExistsAndIsFocused = await checkFocusedWindow();
      if (!windowExistsAndIsFocused) {
        await showYabaiMessage({
          title: "Command requires a focused window",
          type: MessageType.INFO,
        });
        return;
      }
    }

    // Check for multiple windows requirement
    if (options.requiresMultipleWindows) {
      const windows = await getSpaceWindows()
      if (!windows.data) return;

      const hasMultipleNonFloatingWindows = windows.data.filter(window => !window.isFloating).length > 1;

      if (!hasMultipleNonFloatingWindows) {
        await showYabaiMessage({
          title: "Command requires multiple windows",
          type: MessageType.INFO,
        });
        return;
      }
    }

    console.log("options.MessageArgs", options.MessageArgs);
    if (options.MessageArgs) {
      const { SPACE_INDEX, APP, TITLE } = options.MessageArgs;

      console.log("SPACE_INDEX", SPACE_INDEX);
      console.log("APP", APP);
      console.log("TITLE", TITLE);

      const spaceIndex = (await getSpaceInfo())?.data?.index;
      const app = (await getWindowInfo())?.data?.app;
      const title = (await getWindowInfo())?.data?.title;

      if (SPACE_INDEX && spaceIndex) {
        options.successMessage = options.successMessage.replace("$SPACE_INDEX", spaceIndex.toString());
        options.failureMessage = options.failureMessage.replace("$SPACE_INDEX", spaceIndex.toString());
      }
      if (APP && app) {
        options.successMessage = options.successMessage.replace("$APP", app);
        options.failureMessage = options.failureMessage.replace("$APP", app);
      }
      if (TITLE && title) {
        options.successMessage = options.successMessage.replace("$TITLE", title);
        options.failureMessage = options.failureMessage.replace("$TITLE", title);
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

    // Handle command execution failure
    if (stderr) {
      await showYabaiMessage({
        title: "Failed to execute command",
        type: MessageType.INFO,
      });
      return;
    }

    // Show success message
    await showYabaiMessage({
      title: options.successMessage,
      type: MessageType.SUCCESS,
    });
  } catch (error: unknown) {
    console.error("error", error);
    if (error instanceof Error) {
      showFailureToast(error.message);
    } else {
      showFailureToast('An unknown error occurred');
    }
  }
}