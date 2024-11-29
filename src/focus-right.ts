import { canFocus } from "./helpers/window";
import { Direction } from "./types";
import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --focus east",
    failureMessage: `No window to focus on the right`,
    validate: async () => {
      const canFocusResult = await canFocus(Direction.EAST);
      return {
        canProceed: canFocusResult,
        message: !canFocusResult ? "No window right to focus" : undefined
      };
    },
  });
};
