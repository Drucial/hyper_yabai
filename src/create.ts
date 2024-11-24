import { executeYabaiCommand, MESSAGE_ARGS } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m space --create",
    successMessage: `Created space ${MESSAGE_ARGS.NEW_SPACE_INDEX}`,
    failureMessage: `Failed to create space ${MESSAGE_ARGS.NEW_SPACE_INDEX}`,
    MessageArgs: {
      NEW_SPACE_INDEX: MESSAGE_ARGS.NEW_SPACE_INDEX,
    },
  });
};
