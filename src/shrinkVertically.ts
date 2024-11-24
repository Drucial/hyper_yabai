import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { getVerticalShrinkCommand } from "./helpers/window";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";

const shrinkVertically = async () => {
  const SUCCESS_MESSAGE = {
    title: "Shrank window vertically",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const resizeCommand = await getVerticalShrinkCommand();

    if (!resizeCommand) {
      await showYabaiMessage({
        title: "Cannot shrink vertically",
        type: MessageType.INFO,
      });
      return;
    }

    const { stderr } = await runYabaiCommand(`${resizeCommand.command} ${resizeCommand.args}`);

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to shrink vertically",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to shrink vertically",
      type: MessageType.INFO,
    });
  }
};

export default shrinkVertically;