import { executeYabaiCommand } from "../utils/commandRunner";
import { canFocusSpace } from "../helpers/space";

export async function tospaceFocus(index: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) {
  await executeYabaiCommand({
    command: `-m window --space ${index} --focus`,
    successMessage: `Switched window to space ${index}`,
    failureMessage: `Failed to switch window to space ${index}.`,
    requiresWindow: true,
    validate: async () => {
      const { validated, message } = await canFocusSpace(index);
      return {
        canProceed: validated,
        message,
      };
    },
  });
}
