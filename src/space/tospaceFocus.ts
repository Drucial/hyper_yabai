import { showHUD } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";
import { runYabaiCommand } from "../helpers/scripts";

export async function tospaceFocus(index: 1 |2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 ) {
  const cmd = `-m window --space ${index} --focus `;

  try {
    const { stderr } = await runYabaiCommand(cmd);

    if (stderr) { 
      throw new Error(stderr);
    }

    showHUD(`Switched window to space ${index}`);
  } catch (error) {
    console.log(error);
    showFailureToast(error, {
      title: `Failed to spaceFocus space in the ${index} . Make sure Yabai is installed and running.`,
    });
  }
}
