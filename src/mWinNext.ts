import { executeYabaiCommand } from "./utils/commandRunner";
import { getSpaceInfo, canFocusSpace, getSpaces } from "./helpers/space";
import { SpaceIndex } from "./types";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --space next --focus",
    successMessage: "Moved window to next space",
    failureMessage: "Failed to move window to next space",
    requiresWindow: true,
    validate: async () => {
      const { data } = await getSpaceInfo();
      const { data: spaces } = await getSpaces();

      if (data?.index === spaces?.length) {
        return {
          canProceed: false,
          message: "Already on the last space",
        };
      }

      const spaceIndex = (data?.index ?? 1) + 1 as SpaceIndex;
      const { validated, message } = await canFocusSpace(spaceIndex);
      return {
        canProceed: validated,
        message: validated ? undefined : message,
      };
    },
  });
};
