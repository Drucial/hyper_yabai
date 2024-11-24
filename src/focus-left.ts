import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Focused window to the left",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --focus west");

    if (stderr) {
      await showYabaiMessage({
        title: "Unable to focus window on the left",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "No window to focus on the left",
      type: MessageType.INFO,
    });
  }
};
