import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "--start-service",
    successMessage: "Yabai has been started.",
    failureMessage: "Failed to start Yabai. Make sure Yabai is installed.",
  });
};
