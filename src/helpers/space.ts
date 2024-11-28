import { SpaceIndex, YabaiQueryResult, YabaiSpace, YabaiWindow } from "../types";
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

export async function canFocusSpace(index: SpaceIndex): Promise<{ validated: boolean; message: string }> {
  const result = {
    validated: false,
    message: "",
  };

  const spaces = await getSpaces();

  if (!spaces.data) {
    result.message = "No space detected.";
    return result;
  }

  if (spaces.data.length < index) {
    result.message = `Space ${index} does not exist.`;
    return result;
  }

  if (spaces.data[index - 1].hasFocus) {
    result.message = `Already on space ${index}`;
    return result;
  }

  result.validated = true;
  return result;
}
