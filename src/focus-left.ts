import { canFocus } from "./helpers/window";
import { Direction } from "./types";
import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --focus west",
    failureMessage: `No window to focus on the left`,
    validate: async () => {
      return {
        canProceed: await canFocus(Direction.WEST),
        message: "No window left to focus",
      };
    },
  });
};
