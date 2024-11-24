import { executeYabaiCommand, MESSAGE_ARGS } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m window --toggle float",
    successMessage: `Toggled ${MESSAGE_ARGS.APP} window float`,
    failureMessage: `Failed to toggle ${MESSAGE_ARGS.APP} window float`,
    requiresWindow: true,
    MessageArgs: {
      APP: MESSAGE_ARGS.APP,
    },
  });
};
