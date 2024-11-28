import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --toggle split",
    failureMessage: "Failed to toggle split, no window to split.",
    requiresMultipleWindows: true,
  });
};
