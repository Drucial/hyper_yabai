import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m space --rotate 90",
    successMessage: "Rotated window tree 90 degrees",
    failureMessage: "Failed to rotate window tree",
    requiresMultipleWindows: true,
  });
};
