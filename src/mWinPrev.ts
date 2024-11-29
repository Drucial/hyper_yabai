import { executeYabaiCommand } from "./utils/commandRunner";
import { getSpaceInfo, canFocusSpace } from "./helpers/space";
import { SpaceIndex } from "./types";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --space prev --focus",
    successMessage: "Moved window to previous space",
    failureMessage: "Failed to move window to previous space",
    requiresWindow: true,
    validate: async () => {
      const { data } = await getSpaceInfo();

      if (data?.index === 1) {
        return {
          canProceed: false,
          message: "Already on the first space",
        };
      }

      const spaceIndex = ((data?.index ?? 1) - 1) as SpaceIndex;

      const { validated, message } = await canFocusSpace(spaceIndex);

      return {
        canProceed: validated,
        message: validated ? undefined : message,
      };
    },
  });
};
