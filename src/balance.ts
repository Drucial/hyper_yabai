import { executeYabaiCommand, MESSAGE_ARGS } from "./utils/commandRunner";

export default async function Command() {
  await executeYabaiCommand({
    command: "-m space --balance",
    successMessage: `Balanced space ${MESSAGE_ARGS.SPACE_INDEX}`,
    failureMessage: `Failed to balance space ${MESSAGE_ARGS.SPACE_INDEX}`,
    requiresMultipleWindows: true,
    MessageArgs: {
      SPACE_INDEX: MESSAGE_ARGS.SPACE_INDEX,
    },
  });
}
