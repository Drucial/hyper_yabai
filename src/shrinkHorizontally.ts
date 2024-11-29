import { getResizeCommands } from "./helpers/window";
import { executeYabaiCommand } from "./utils/commandRunner";
import { MessageType, showYabaiMessage } from "./utils/notifications";

export default async () => {
  const command = await getResizeCommands.horizontal.shrink();

  if (!command) {
    showYabaiMessage({
      title: "Cannot Shrink Horizontally",
      type: MessageType.INFO
    });
    return;
  }

  await executeYabaiCommand({
    command,
    failureMessage: "Failed to shrink window horizontally",
  });
}
