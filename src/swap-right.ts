import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { hasAdjacentWindow, getWindowInfo, getSpaceWindows } from "./helpers/window";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Successfully moved window to the right.",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  const currentWindow = await getWindowInfo();
  const activeWindows = await getSpaceWindows();

  if (!hasAdjacentWindow(currentWindow, activeWindows, 'right')) {
    await showYabaiMessage({
      title: "Move right failed, no window to swap with.",
      type: MessageType.INFO,
    });
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --swap east");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to move window right.",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Move failed, no window to swap with.",
      type: MessageType.INFO,
    });
  }
};
