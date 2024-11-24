import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Yabai has been stopped.",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("--stop-service");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to stop Yabai.",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to stop Yabai.",
      type: MessageType.INFO,
    });
  }
};
