import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Focused window to the right",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m window --focus east");

    if (stderr) {
      await showYabaiMessage({
        title: "Unable to focus window to the right",
        type: MessageType.INFO,
      });
      return
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "No window to focus on the right",
      type: MessageType.INFO,
    });
  }
};
