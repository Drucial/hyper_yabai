import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m window --toggle split");

    if (stderr) {
      throw new Error();
    }

    showHUD("Toggled split");
  } catch (error) {
    showFailureToast(error, {
        title: "Failed to toggle split, make sure you have Yabai installed and running.",
    });
  }
};