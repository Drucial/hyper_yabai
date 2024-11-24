import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Moved window to next space",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --space next --focus");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to move window to next space",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to start Yabai. Make sure you Yabai is installed.",
      type: MessageType.INFO,
    });
  }
};
