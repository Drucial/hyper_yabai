import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --toggle zoom-fullscreen",
    successMessage: "Toggled window fullscreen.",
    failureMessage: "Failed to toggle window fullscreen.",
    requiresMultipleWindows: true,
  });
};
