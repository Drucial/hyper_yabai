import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Rotated window tree",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m space --rotate 90");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to rotate window tree",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to rotate window tree",
      type: MessageType.INFO,
    });
  }
};
