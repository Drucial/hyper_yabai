import { LaunchProps } from "@raycast/api";
import { isYabaiRunning, runYabaiCommand } from "./helpers/scripts";
import { MESSAGES, MessageType, showYabaiMessage } from "./utils/notifications";

const prefixesToRemove = ["yabai -m", "yabai --message", "-m", "--message"];

export default async function Command(launchProps: LaunchProps) {
  const SUCCESS_MESSAGE = {
    title: "Command executed successfully",
    type: MessageType.SUCCESS,
  };

  if (!(await isYabaiRunning())) {
    await showYabaiMessage(MESSAGES.SYSTEM.YABAI_NOT_RUNNING);
    return;
  }

  try {
    let command = launchProps.arguments.command.trim().replace(/\s\s+/g, " ");

    for (const prefix of prefixesToRemove) {
      if (command.startsWith(prefix)) {
        command = command.replace(prefix, "").trim();
      }
    }

    if (!command) {
      await showYabaiMessage({
        title: "No command provided.",
        type: MessageType.INFO,
      });
      return;
    }

    command = `-m ${command}`;

    await runYabaiCommand(command);

    await showYabaiMessage(SUCCESS_MESSAGE);
  } catch (error) {
    await showYabaiMessage({
      title: "Failed to run command",
      type: MessageType.INFO,
    });
  }
}
