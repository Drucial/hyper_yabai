import { executeYabaiCommand } from "./utils/commandRunner";

export default async () => {
  await executeYabaiCommand({
    command: "-m space --create",
    successMessage: "Created space",
    failureMessage: "Failed to create space",
  });
};
