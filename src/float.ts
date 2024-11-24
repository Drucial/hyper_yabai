import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --toggle float",
    successMessage: "Toggled window float",
    failureMessage: "Failed to toggle window float",
    requiresWindow: true,
  });
};
