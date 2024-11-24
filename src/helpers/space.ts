import { YabaiSpace, YabaiWindow } from "../types";
import { runYabaiCommand } from "./scripts";

export async function getSpaceInfo(): Promise<YabaiSpace> {
  const result = await runYabaiCommand("-m query --spaces --space");
  if ("stdout" in result) {
    return result.stdout as YabaiSpace;
  }
  throw new Error(result.stderr);
}

export async function getSpaceWindows(): Promise<YabaiWindow[]> {
  const result = await runYabaiCommand("-m query --windows --space");
  if ("stdout" in result) {
    return result.stdout as YabaiWindow[];
  }
  throw new Error(result.stderr);
}

export async function getSpaces(): Promise<YabaiSpace[]> {
  const result = await runYabaiCommand("-m query --spaces");
  if ("stdout" in result) {
    return result.stdout as YabaiSpace[];
  }
  throw new Error(result.stderr);
}
