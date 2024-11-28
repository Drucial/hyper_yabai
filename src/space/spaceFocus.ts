import { executeYabaiCommand } from "../utils/commandRunner";
import { canFocusSpace } from "../helpers/space";

export async function spaceFocus(index: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) {
  await executeYabaiCommand({
    command: `-m space --focus ${index}`,
    successMessage: `Switched to space ${index}`,
    failureMessage: `Failed to switch to space ${index}.`,
    validate: async () => {
      const { validated, message } = await canFocusSpace(index);
      return {
        canProceed: validated,
        message,
      };
    },
  });
}
