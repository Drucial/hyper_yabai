import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "--restart-service",
    successMessage: "Yabai has been restarted",
    failureMessage: "Failed to restart Yabai. Make sure Yabai is installed.",
  });
};
