import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m space --destroy",
    successMessage: "Destroyed space",
    failureMessage: "Failed to destroy space",
  });
};
