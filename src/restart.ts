import { runYabaiCommand, isYabaiRunning } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Yabai has been restarted",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const isRunning = await isYabaiRunning();

    let command;

    if (!isRunning) {
      command = "--start-service";
    } else {
      command = "--restart-service";
    }

    const { stderr } = await runYabaiCommand(command);

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to restart Yabai. Make sure you Yabai is installed.",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to restart Yabai. Make sure you Yabai is installed.",
    });
  }
};