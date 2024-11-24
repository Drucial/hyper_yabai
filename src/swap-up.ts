import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { hasAdjacentWindow, getWindowInfo, getSpaceWindows } from "./helpers/window";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Successfully moved window up.",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  const currentWindow = await getWindowInfo();
  const activeWindows = await getSpaceWindows();

  if (!hasAdjacentWindow(currentWindow, activeWindows, 'above')) {
    await showYabaiMessage({
      title: "Move up failed, no window to swap with.",
      type: MessageType.INFO,
    });
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --swap north");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to move window up.",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to move window up, make sure you have Yabai installed and running.",
      type: MessageType.INFO,
    });
  }
};
