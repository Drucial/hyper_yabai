import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const SUCCESS_MESSAGE = {
    title: "Toggled window float",
    type: MessageType.SUCCESS,
  };  

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {

    const { stderr } = await runYabaiCommand("-m window --toggle float");

    if (stderr) {
      await showYabaiMessage({
        title: "Unable to toggle window float",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to execute toggle float command",
      type: MessageType.ERROR,
    });
  }
};