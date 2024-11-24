import { executeYabaiCommand } from "./utils/commandRunner";

export default async function Command() {
  await executeYabaiCommand({
    command: "-m space --balance",
    successMessage: "Balanced space",
    failureMessage: "Failed to balance space",
    requiresMultipleWindows: true,
  });
}
