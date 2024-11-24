import { Direction } from "./types";
import { executeYabaiCommand } from "./utils/commandRunner";
import { canFocus } from "./helpers/window";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --swap south",
    failureMessage: `No window to swap with`,
    validate: async () => {
      return {
        canProceed: await canFocus(Direction.SOUTH),
        message: "No window above to swap with",
      }
    }
  });
};
