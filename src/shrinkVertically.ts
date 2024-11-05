import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";
import { getVerticalShrinkCommand } from "./helpers/window";

const shrinkVertically = async () => {
  try {
    const resizeCommand = await getVerticalShrinkCommand();
    
    if (!resizeCommand) {
      await showHUD("Cannot shrink vertically");
      return;
    }

    const { stderr } = await runYabaiCommand(`${resizeCommand.command} ${resizeCommand.args}`);

    if (stderr) {
      throw new Error(stderr);
    }

    await showHUD("Shrank window vertically");
  } catch (error) {
    await showFailureToast(error, {
      title: "Failed to shrink vertically",
    });
  }
};

export default shrinkVertically;