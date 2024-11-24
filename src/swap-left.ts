import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { hasAdjacentWindow, getWindowInfo, getSpaceWindows } from "./helpers/window";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Successfully moved window to the left.",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  } 

  const currentWindow = await getWindowInfo();
  const activeWindows = await getSpaceWindows();

  if (!hasAdjacentWindow(currentWindow, activeWindows, 'left')) {
    await showYabaiMessage({
      title: "Move left failed, no window to swap with.",
      type: MessageType.INFO,
    });
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --swap west");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to move window left.",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Move failed, please confirm if there are windows available to move.",
      type: MessageType.INFO,
    });
  }
};
