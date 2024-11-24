import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MessageType, showYabaiMessage } from "./utils/notifications";
import { getWindowInfo } from "./helpers/window";

export default async function Command() {
  const SUCCESS_MESSAGE = {
    title: "Balanced space",
    type: MessageType.SUCCESS,
  };

  console.log(await getWindowInfo());

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const { stderr } = await runYabaiCommand("-m space --balance");

    if (stderr) {
      await showYabaiMessage({
        title: "Unable to balance space",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to execute balance command",
      type: MessageType.ERROR,
    });
  }
}
