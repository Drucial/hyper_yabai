import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { isWindowSplit, getWindowInfo, getSpaceWindows } from "./helpers/window";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Toggled split",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  const currentWindow = await getWindowInfo();
  const activeWindows = await getSpaceWindows();

  if (!isWindowSplit(currentWindow, activeWindows)) {
    await showYabaiMessage({
      title: "Failed to toggle split, no window to split.",
      type: MessageType.INFO,
    });
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --toggle split");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to toggle split.",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to toggle split, make sure you have Yabai installed and running.",
      type: MessageType.INFO,
    });
  }
};