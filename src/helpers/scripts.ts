import { getPreferenceValues, showHUD } from "@raycast/api";
import { execaCommand } from "execa";
import { userInfo } from "os";
import { formatOutput } from "./data";
import { YabaiQueryResult } from "../types";

const userEnv = `env USER=${userInfo().username}`;

export const isYabaiRunning = async (): Promise<boolean> => {
  try {
    const { stdout } = await execaCommand("pgrep -x yabai");
    return stdout.trim() !== "";
  } catch (error: unknown) {
    if ((error as { exitCode?: number }).exitCode === 1) {
      // Yabai is not running
      return false;
    }
    console.error("An error occurred while checking Yabai:", error);
    return false;
  }
};

export const runYabaiCommand = async (command: string) => {
  const { yabaiExecutablePath } = getPreferenceValues<{ yabaiExecutablePath: string }>();
  const isStartCommand = command === "--start-service";

  const yabaiRunning = await isYabaiRunning();
  if (!yabaiRunning && !isStartCommand) {
    await showHUD("Yabai is not running.");
    return { stderr: "Yabai is not running." };
  }

  try {
    const result = await execaCommand([userEnv, yabaiExecutablePath, command].join(" "));
    const formattedOutput = formatOutput(result.stdout);
    return { stdout: formattedOutput, stderr: result.stderr };
  } catch (error) {
    console.error("An error occurred while executing the Yabai command:", error);
    throw error;
  }
};

export async function handleYabaiQuery<T>(command: string): Promise<YabaiQueryResult<T>> {
  try {
    const result = await runYabaiCommand(command);
    if ("stdout" in result) {
      return { data: result.stdout as T, error: null };
    }
    return {
      data: null,
      error: result.stderr || "Failed to execute yabai command",
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
