
import { showHUD } from "@raycast/api";
import { runYabaiCommand, isYabaiRunning } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const isRunning = await isYabaiRunning();

    let command;

    if (!isRunning) {
      command = "--start-service";
    } else {
      command = "--restart-service";
    }

    const { stderr } = await runYabaiCommand(command);

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("Yabai has been restarted.");
  } catch (error) {
    showFailureToast(error, {
      title: "Failed to restart Yabai. Make sure you Yabai is installed.",
    });
  }
};