import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";
import { getHorizontalShrinkCommand } from "./helpers/window";

const shrinkHorizontally = async () => {
  try {
    const resizeCommand = await getHorizontalShrinkCommand();
    
    if (!resizeCommand) {
      await showHUD("Cannot shrink horizontally - window must be in vertical split");
      return;
    }

    const { stderr } = await runYabaiCommand(`${resizeCommand.command} ${resizeCommand.args}`);

    if (stderr) {
      throw new Error(stderr);
    }

    await showHUD("Shrank window horizontally");
  } catch (error) {
    await showFailureToast(error, {
      title: "Failed to shrink horizontally",
    });
  }
};

export default shrinkHorizontally;