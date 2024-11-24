import { executeYabaiCommand } from "./utils/commandRunner";

export default async function Command() {
  await executeYabaiCommand({
    command: "-m space --balance",
    successMessage: "Balanced space $SPACE_INDEX",
    failureMessage: "Failed to balance space $SPACE_INDEX",
    requiresMultipleWindows: true,
    MessageArgs: {
      SPACE_INDEX: "$SPACE_INDEX",
    },
  });
}
