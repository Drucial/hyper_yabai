import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";
import { getHorizontalGrowCommand } from "./helpers/window";

const growHorizontally = async () => {
  try {
    const resizeCommand = await getHorizontalGrowCommand();
    
    if (!resizeCommand) {
      await showHUD("Cannot grow horizontally - window must be in vertical split");
      return;
    }

    const { stderr } = await runYabaiCommand(`${resizeCommand.command} ${resizeCommand.args}`);

    if (stderr) {
      throw new Error(stderr);
    }

    await showHUD("Grew window horizontally");
  } catch (error) {
    await showFailureToast(error, {
      title: "Failed to grow horizontally",
    });
  }
};

export default growHorizontally; 