import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m window --focus north");

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("Successfully moved window up.");
  } catch (error) {
    showFailureToast(error, {
      title: "Move failed, please confirm if there are windows available to move.",
    });
  }
};
