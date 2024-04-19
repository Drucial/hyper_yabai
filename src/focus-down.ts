import { showHUD } from "@raycast/api";
import { runYabaiCommand } from "./helpers/scripts";
import { showFailureToast } from "@raycast/utils";

export default async () => {
  try {
    const { stderr } = await runYabaiCommand("-m window --focus south");

    if (stderr) {
      throw new Error(stderr);
    }

    showHUD("向下侧窗口聚焦成功.");
  } catch (error) {
    showFailureToast(error, {
      title: "聚焦失败,请确认是否有窗口可聚焦.",
    });
  }
};
