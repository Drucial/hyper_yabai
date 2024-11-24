import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { getHorizontalShrinkCommand } from "./helpers/window";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";

const shrinkHorizontally = async () => {
  const SUCCESS_MESSAGE = {
    title: "Shrank window horizontally",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const resizeCommand = await getHorizontalShrinkCommand();

    if (!resizeCommand) {
      await showYabaiMessage({
        title: "Cannot shrink horizontally - window must be in vertical split",
        type: MessageType.INFO,
      });
      return;
    }

    const { stderr } = await runYabaiCommand(`${resizeCommand.command} ${resizeCommand.args}`);

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to shrink horizontally",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to shrink horizontally",
      type: MessageType.INFO,
    });
  }
};

export default shrinkHorizontally;