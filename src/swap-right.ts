import { Direction } from "./types";
import { executeYabaiCommand } from "./utils/commandRunner";
import { canFocus } from "./helpers/window";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --swap east",
    failureMessage: `No window to swap with`,
    validate: async () => {
      return {
        canProceed: await canFocus(Direction.EAST),
        message: "No window right to swap with",
      };
    },
  });
};
