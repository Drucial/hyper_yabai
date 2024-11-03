import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m window --toggle zoom-fullscreen");

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("Successfully toggled window fullscreen.");
  } catch (error) {
    showFailureToast(error, {
      title: "Failed to toggle Yabai. Make sure you Yabai is installed.",
    });
  }
};
