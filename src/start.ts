import { MessageType, showYabaiMessage } from "./utils/notifications";
import { runYabaiCommand } from "./helpers/scripts";

const SUCCESS_MESSAGE = {
  title: "Yabai has been started.",
  type: MessageType.SUCCESS,
};

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("--start-service");

    if (stderr) {
      await showYabaiMessage({
        title: "Failed to start Yabai. Make sure you Yabai is installed.",
        type: MessageType.INFO,
      });
      return;
    }

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to start Yabai. Make sure you Yabai is installed.",
      type: MessageType.INFO,
    });
  }
};
