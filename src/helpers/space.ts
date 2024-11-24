import { YabaiQueryResult, YabaiSpace, YabaiWindow } from "../types";
import { handleYabaiQuery } from "./scripts";

export async function getSpaceInfo(): Promise<YabaiQueryResult<YabaiSpace>> {
  return handleYabaiQuery<YabaiSpace>("-m query --spaces --space");
}

export async function getSpaceWindows(): Promise<YabaiQueryResult<YabaiWindow[]>> {
  return handleYabaiQuery<YabaiWindow[]>("-m query --windows --space");
}

export async function getSpaces(): Promise<YabaiQueryResult<YabaiSpace[]>> {
  return handleYabaiQuery<YabaiSpace[]>("-m query --spaces");
}
