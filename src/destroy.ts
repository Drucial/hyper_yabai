import { executeYabaiCommand, MESSAGE_ARGS } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m space --destroy",
    successMessage: `Destroyed space ${MESSAGE_ARGS.SPACE_INDEX}`,
    failureMessage: `Failed to destroy space ${MESSAGE_ARGS.SPACE_INDEX}`,
    MessageArgs: {
      SPACE_INDEX: MESSAGE_ARGS.SPACE_INDEX,
    },
  });
};
