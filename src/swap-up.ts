import { executeYabaiCommand } from "./utils/commandRunner";
import { Direction } from "./types";
import { canFocus } from "./helpers/window";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --swap north",
    failureMessage: `No window to swap with`,
    validate: async () => {
      return {
        canProceed: await canFocus(Direction.NORTH),
        message: "No window above to swap with",
      };
    },
  });
};
