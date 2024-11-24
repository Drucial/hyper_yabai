import { canFocus } from "./helpers/window";
import { Direction } from "./types";
import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --focus east",
    failureMessage: `No window to focus on the right`,
    validate: async () => {
      return {
        canProceed: await canFocus(Direction.EAST),
        message: "No window right to focus",
      };
    },
  });
};
