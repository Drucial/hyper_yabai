import { canFocus } from "./helpers/window";
import { Direction } from "./types";
import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --focus south",
    failureMessage: `No window to focus below`,
    validate: async () => {
      return {
        canProceed: await canFocus(Direction.SOUTH),
        message: "No window below to focus",
      };
    },
  });
};
