import { Direction, YabaiWindow } from "../types";
import { runYabaiCommand } from "./scripts";
import { getSpaceInfo, getSpaceWindows } from "./space";

const RESIZE_AMOUNT = 50;
const POSITION_TOLERANCE = 20;

export type ResizeCommand = {
  command: string;
  args: string;
}


export async function getWindowInfo(): Promise<YabaiWindow> {
  const result = await runYabaiCommand("-m query --windows --window");
  if ("stdout" in result) {
    return result.stdout as YabaiWindow;
  }
  throw new Error(result.stderr);
}


export function isWindowSplit(window: YabaiWindow, spaceWindows: YabaiWindow[]): boolean {
  return spaceWindows.some(w => w.id !== window.id && w.frame.w > 0 && w.frame.h > 0);
}


export function hasAdjacentWindow(
  currentWindow: YabaiWindow,
  activeWindows: YabaiWindow[],
  direction: Direction
): boolean {
  return activeWindows.some(window => {
    switch (direction) {
      case Direction.WEST:
        return (
          Math.abs((window.frame.x + window.frame.w) - currentWindow.frame.x) < POSITION_TOLERANCE &&
          hasYOverlap(window, currentWindow)
        );
      case Direction.EAST:
        return (
          Math.abs(window.frame.x - (currentWindow.frame.x + currentWindow.frame.w)) < POSITION_TOLERANCE &&
          hasYOverlap(window, currentWindow)
        );
      case Direction.NORTH:
        return (
          Math.abs((window.frame.y + window.frame.h) - currentWindow.frame.y) < POSITION_TOLERANCE &&
          hasXOverlap(window, currentWindow)
        );
      case Direction.SOUTH:
        return (
          Math.abs(window.frame.y - (currentWindow.frame.y + currentWindow.frame.h)) < POSITION_TOLERANCE &&
          hasXOverlap(window, currentWindow)
        );
    }
  });
}

// Helper functions to reduce duplication
function hasXOverlap(window1: YabaiWindow, window2: YabaiWindow): boolean {
  return (
    window1.frame.x < (window2.frame.x + window2.frame.w) &&
    (window1.frame.x + window1.frame.w) > window2.frame.x
  );
}

function hasYOverlap(window1: YabaiWindow, window2: YabaiWindow): boolean {
  return (
    window1.frame.y < (window2.frame.y + window2.frame.h) &&
    (window1.frame.y + window1.frame.h) > window2.frame.y
  );
}

export async function getVerticalGrowCommand(): Promise<ResizeCommand | null> {
  const currentWindow = await getWindowInfo();
  const spaceWindows = await getSpaceWindows();
  const space = await getSpaceInfo();

  if (space.type !== "bsp") return null;

  const activeWindows = spaceWindows.filter(w => 
    w.id !== currentWindow.id && 
    w.frame.w > 0 && 
    w.frame.h > 0
  );

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.SOUTH)) {
    return {
      command: "-m window",
      args: `--resize bottom:0:${RESIZE_AMOUNT}`
    };
  }

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.NORTH)) {
    return {
      command: "-m window",
      args: `--resize top:0:-${RESIZE_AMOUNT}`
    };
  }

  return null;
}

export async function getVerticalShrinkCommand(): Promise<ResizeCommand | null> {
  const currentWindow = await getWindowInfo();
  const spaceWindows = await getSpaceWindows();
  const space = await getSpaceInfo();

  if (space.type !== "bsp") return null;

  const activeWindows = spaceWindows.filter(w => 
    w.id !== currentWindow.id && 
    w.frame.w > 0 && 
    w.frame.h > 0
  );

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.SOUTH)) {
    return {
      command: "-m window",
      args: `--resize bottom:0:-${RESIZE_AMOUNT}`
    };
  }

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.NORTH)) {
    return {
      command: "-m window",
      args: `--resize top:0:${RESIZE_AMOUNT}`
    };
  }

  return null;
}

export async function getHorizontalGrowCommand(): Promise<ResizeCommand | null> {
  const currentWindow = await getWindowInfo();
  const spaceWindows = await getSpaceWindows();
  const space = await getSpaceInfo();

  if (space.type !== "bsp") return null;

  const activeWindows = spaceWindows.filter(w => 
    w.id !== currentWindow.id && 
    w.frame.w > 0 && 
    w.frame.h > 0
  );

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.EAST)) {
    return {
      command: "-m window",
      args: `--resize right:${RESIZE_AMOUNT}:0`
    };
  }

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.WEST)) {
    return {
      command: "-m window",
      args: `--resize left:-${RESIZE_AMOUNT}:0`
    };
  }

  return null;
}

export async function getHorizontalShrinkCommand(): Promise<ResizeCommand | null> {
  const currentWindow = await getWindowInfo();
  const spaceWindows = await getSpaceWindows();
  const space = await getSpaceInfo();

  if (space.type !== "bsp") return null;

  const activeWindows = spaceWindows.filter(w => 
    w.id !== currentWindow.id && 
    w.frame.w > 0 && 
    w.frame.h > 0
  );

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.EAST)) {
    return {
      command: "-m window",
      args: `--resize right:-${RESIZE_AMOUNT}:0`
    };
  }

  if (hasAdjacentWindow(currentWindow, activeWindows, Direction.WEST)) {
    return {
      command: "-m window",
      args: `--resize left:${RESIZE_AMOUNT}:0`
    };
  }

  return null;
} 

export { getSpaceWindows };
