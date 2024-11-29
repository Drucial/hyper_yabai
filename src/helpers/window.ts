import { Direction, YabaiWindow, YabaiQueryResult, YabaiSpace } from "../types";
import { handleYabaiQuery } from "./scripts";
import { getActiveSpaceWindows, getSpaceInfo, getSpaceWindows } from "./space";

const RESIZE_AMOUNT = 100;
const POSITION_TOLERANCE = 20;

export type ResizeCommand = {
  command: string;
  args: string;
};

export async function getWindowInfo(): Promise<YabaiQueryResult<YabaiWindow>> {
  return handleYabaiQuery<YabaiWindow>("-m query --windows --window");
}

export async function canFocus(direction: Direction): Promise<boolean> {
  const windowInfo = await getWindowInfo();
  const spaceWindows = await getSpaceWindows();

  if (!windowInfo.data || !spaceWindows.data || spaceWindows.data.length < 2) return false;

  return hasAdjacentWindow(windowInfo.data, spaceWindows.data, direction);
}

export function isWindowSplit(window: YabaiWindow, spaceWindows: YabaiWindow[]): boolean {
  return spaceWindows.some((w) => w.id !== window.id && w.frame.w > 0 && w.frame.h > 0);
}

export function hasAdjacentWindow(
  currentWindow: YabaiWindow,
  activeWindows: YabaiWindow[],
  direction: Direction,
): boolean {
  return activeWindows.some((window) => {
    const { x, y, w, h } = window.frame;
    const { x: cx, y: cy, w: cw, h: ch } = currentWindow.frame;

    switch (direction) {
      case Direction.WEST:
        return Math.abs(x + w - cx) < POSITION_TOLERANCE && hasYOverlap(window, currentWindow);
      case Direction.EAST:
        return Math.abs(x - (cx + cw)) < POSITION_TOLERANCE && hasYOverlap(window, currentWindow);
      case Direction.NORTH:
        return Math.abs(y + h - cy) < POSITION_TOLERANCE && hasXOverlap(window, currentWindow);
      case Direction.SOUTH:
        return Math.abs(y - (cy + ch)) < POSITION_TOLERANCE && hasXOverlap(window, currentWindow);
    }
  });
}

function hasXOverlap(window1: YabaiWindow, window2: YabaiWindow): boolean {
  const { x, w } = window1.frame;
  const { x: x2, w: w2 } = window2.frame;
  return x < x2 + w2 && x + w > x2;
}

function hasYOverlap(window1: YabaiWindow, window2: YabaiWindow): boolean {
  const { y, h } = window1.frame;
  const { y: y2, h: h2 } = window2.frame;
  return y < y2 + h2 && y + h > y2;
}

async function canResize(window: YabaiWindow, space: YabaiSpace): Promise<boolean> {
  return window.canResize && window.splitType !== "none" && space.type === "bsp" && !window.isFloating;
}

// Main resize function
async function getResizeCommand(direction: Direction, grow: boolean): Promise<string | null> {
  const [windowResult, spaceWindowsResult, spaceResult] = await Promise.all([
    getWindowInfo(),
    getActiveSpaceWindows(),
    getSpaceInfo(),
  ]);

  const window = windowResult.data;
  const spaceWindows = spaceWindowsResult.data;
  const space = spaceResult.data;

  if (!window || !spaceWindows || !space || space.type !== "bsp") {
    return null;
  }

  if (!(await canResize(window, space))) {
    return null;
  }

  const canGrow = await canFocus(direction);

  if (!canGrow) {
    return null;
  }

  const resizeAmount = grow ? RESIZE_AMOUNT : -RESIZE_AMOUNT;
  let command = "";

  switch (direction) {
    case Direction.NORTH:
      command = `-m window --resize top:0:${-resizeAmount}`;
      break;
    case Direction.SOUTH:
      command = `-m window --resize bottom:0:${resizeAmount}`;
      break;
    case Direction.EAST:
      command = `-m window --resize right:${resizeAmount}:0`;
      break;
    case Direction.WEST:
      command = `-m window --resize left:${-resizeAmount}:0`;
      break;
  }

  return command;
}

export const getResizeCommands = {
  vertical: {
    grow: async () =>
      (await getResizeCommand(Direction.SOUTH, true)) || (await getResizeCommand(Direction.NORTH, true)),
    shrink: async () =>
      (await getResizeCommand(Direction.SOUTH, false)) || (await getResizeCommand(Direction.NORTH, false)),
  },
  horizontal: {
    grow: async () => (await getResizeCommand(Direction.EAST, true)) || (await getResizeCommand(Direction.WEST, true)),
    shrink: async () =>
      (await getResizeCommand(Direction.EAST, false)) || (await getResizeCommand(Direction.WEST, false)),
  },
};
