import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";
import { getVerticalGrowCommand } from "./helpers/window";

const growVertically = async () => {
  const SUCCESS_MESSAGE = {
    title: "Grew window vertically",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const resizeCommand = await getVerticalGrowCommand();
    

    if (!resizeCommand) {
      await showYabaiMessage({
        title: "Cannot grow vertically - window must be in horizontal split",
        type: MessageType.INFO,
      });
      return;
    }

    const fullCommand = `${resizeCommand.command} ${resizeCommand.args}`;

    const { stderr } = await runYabaiCommand(fullCommand);

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to grow vertically",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to grow vertically",
      type: MessageType.INFO,
    });
  }
};

export default growVertically;