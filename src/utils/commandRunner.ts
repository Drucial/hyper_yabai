import { MESSAGES, MessageType } from "./notifications";
import { isYabaiRunning, runYabaiCommand } from "../helpers/scripts";
import { showYabaiMessage } from "../utils/notifications";
import { getWindowInfo } from "../helpers/window";
import { CommandOptions } from "../types";
import { getSpaceInfo, getSpaces, getSpaceWindows } from "../helpers/space";
import { showFailureToast } from "@raycast/utils";

export const MESSAGE_ARGS: Record<string, string> = {
  SPACE_INDEX: "$SPACE_INDEX",
  APP: "$APP",
  TITLE: "$TITLE",
  NEW_SPACE_INDEX: "$NEW_SPACE_INDEX",
};

async function checkFocusedWindow(): Promise<boolean> {
  try {
    const windowInfo = await getWindowInfo();
    if (!windowInfo.data) return false;
    const windowExists = windowInfo.data !== null;
    const windowIsFocused =
      typeof windowInfo.data === "object" && "hasFocus" in windowInfo.data ? windowInfo.data.hasFocus : false;
    return windowExists && windowIsFocused;
  } catch (error) {
    return false;
  }
}

export async function executeYabaiCommand(options: CommandOptions) {
  // Check if yabai is running and the command is not start-service
  if (!(await isYabaiRunning()) && options.command !== "--start-service") {
    await showYabaiMessage({
      title: MESSAGES.SYSTEM.YABAI_NOT_RUNNING.title,
      type: MessageType.INFO,
    });
    return;
  }

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
      const windows = await getSpaceWindows();
      if (!windows.data) return;

      const hasMultipleNonFloatingWindows = windows.data.filter((window) => !window.isFloating).length > 1;

      if (!hasMultipleNonFloatingWindows) {
        await showYabaiMessage({
          title: "Command requires multiple windows",
          type: MessageType.INFO,
        });
        return;
      }
    }

    if (options.MessageArgs) {
      const { SPACE_INDEX, APP, TITLE, NEW_SPACE_INDEX } = options.MessageArgs;
      const spaces = await getSpaces();
      const spaceInfo = await getSpaceInfo();
      const windowInfo = await getWindowInfo();
      const spaceIndex = spaceInfo?.data?.index;
      const newSpaceIndex = spaces.data?.length ? spaces.data.length + 1 : 1;
      const app = windowInfo?.data?.app;
      const title = windowInfo?.data?.title;

      if (SPACE_INDEX && spaceIndex) {
        options.successMessage = options.successMessage?.replace(MESSAGE_ARGS.SPACE_INDEX, spaceIndex.toString());
        options.failureMessage = options.failureMessage?.replace(MESSAGE_ARGS.SPACE_INDEX, spaceIndex.toString());
      }
      if (NEW_SPACE_INDEX && newSpaceIndex) {
        options.successMessage = options.successMessage?.replace(
          MESSAGE_ARGS.NEW_SPACE_INDEX,
          newSpaceIndex.toString(),
        );
        options.failureMessage = options.failureMessage?.replace(
          MESSAGE_ARGS.NEW_SPACE_INDEX,
          newSpaceIndex.toString(),
        );
      }
      if (APP && app) {
        options.successMessage = options.successMessage?.replace(MESSAGE_ARGS.APP, app);
        options.failureMessage = options.failureMessage?.replace(MESSAGE_ARGS.APP, app);
      }
      if (TITLE && title) {
        options.successMessage = options.successMessage?.replace(MESSAGE_ARGS.TITLE, title);
        options.failureMessage = options.failureMessage?.replace(MESSAGE_ARGS.TITLE, title);
      }
    }

    // Run validation
    const validationResult = options.validate ? await options.validate() : null;

    // Then run additional validations if they exist
    if (validationResult) {
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
    if (options.successMessage) {
      await showYabaiMessage({
        title: options.successMessage,
        type: MessageType.SUCCESS,
      });
    }

    return;
  } catch (error: unknown) {
    console.error("error", error);
    if (error instanceof Error) {
      showFailureToast(error.message);
    } else {
      showFailureToast("An unknown error occurred");
    }
  }
}
