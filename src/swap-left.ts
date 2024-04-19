import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m window --swap west");

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("向左侧窗口移动成功.");
  } catch (error) {
    showFailureToast(error, {
      title: "移动失败,请确认是否有窗口可移动.",
    });
  }
};
