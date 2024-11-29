import { getResizeCommands } from "./helpers/window";
import { executeYabaiCommand } from "./utils/commandRunner";
import { MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const command = await getResizeCommands.vertical.grow();

  if (!command) {
    showYabaiMessage({
      title: "Cannot Grow Vertically",
      type: MessageType.INFO,
    });
    return;
  }

  await executeYabaiCommand({
    command,
    failureMessage: "Failed to grow window vertically",
  });
};
