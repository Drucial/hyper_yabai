import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m window --focus west");

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("Successfully focused window to the left.");
  } catch (error) {
    showFailureToast(error, {
      title: "Focus failed, please confirm if there are windows available to focus.",
    });
  }
};
