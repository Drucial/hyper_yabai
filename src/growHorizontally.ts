import { getHorizontalGrowCommand } from "./helpers/window";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

const growHorizontally = async () => {
  const SUCCESS_MESSAGE = {
    title: "Grew window horizontally",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    const resizeCommand = await getHorizontalGrowCommand();
    
    if (!resizeCommand) {
      await showYabaiMessage({
        title: "Cannot grow horizontally - window must be in vertical split",
        type: MessageType.INFO,
      });
      return;
    }

    const { stderr } = await runYabaiCommand(`${resizeCommand.command} ${resizeCommand.args}`);

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to grow horizontally",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to grow horizontally",
      type: MessageType.INFO,
    });
  }
};

export default growHorizontally; 