import { canFocus } from "./helpers/window";
import { Direction } from "./types";
import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --focus north",
    failureMessage: `No window to focus above`,
    validate: async () => {
      return {
        canProceed: await canFocus(Direction.NORTH),
        message: "No window above to focus",
      };
    },
  });
};
