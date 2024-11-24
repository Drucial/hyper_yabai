import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Successfully toggled window fullscreen.",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --toggle zoom-fullscreen");

    if (stderr) {
      throw new Error(stderr);
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to toggle Yabai. Make sure you Yabai is installed.",
      type: MessageType.INFO,
    });
  }
};
