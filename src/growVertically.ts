import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";
import { getVerticalGrowCommand } from "./helpers/window";

const growVertically = async () => {
  try {
    console.log('Starting vertical grow command');
    const resizeCommand = await getVerticalGrowCommand();
    
    console.log('Resize command:', resizeCommand);

    if (!resizeCommand) {
      await showHUD("Cannot grow vertically - window must be in horizontal split");
      return;
    }

    const fullCommand = `${resizeCommand.command} ${resizeCommand.args}`;
    console.log('Executing command:', fullCommand);

    const { stderr } = await runYabaiCommand(fullCommand);

    if (stderr) {
      console.log('Command error:', stderr);
      throw new Error(stderr);
    }

    await showHUD("Grew window vertically");
  } catch (error) {
    console.log('Error:', error);
    await showFailureToast(error, {
      title: "Failed to grow vertically",
    });
  }
};

export default growVertically;