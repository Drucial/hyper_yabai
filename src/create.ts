import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

// TODO: Not working
export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m space --create");

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("Yabai has been started.");
  } catch (error) {
    showFailureToast(error, {
      title: "Failed to start Yabai. Make sure you Yabai is installed.",
    });
  }
};
