import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "--stop-service",
    successMessage: "Yabai has been stopped.",
    failureMessage: "Failed to stop Yabai.",
  });
};