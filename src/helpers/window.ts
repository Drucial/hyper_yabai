import { Direction, YabaiWindow, YabaiQueryResult } from "../types";
import { handleYabaiQuery } from "./scripts";
import { getSpaceInfo, getSpaceWindows } from "./space";

const RESIZE_AMOUNT = 50;
const POSITION_TOLERANCE = 20;

export type ResizeCommand = {
  command: string;
  args: string;
}

export async function getWindowInfo(): Promise<YabaiQueryResult<YabaiWindow>> {
  return handleYabaiQuery<YabaiWindow>("-m query --windows --window");
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
    const { x, y, w, h } = window.frame;
    const { x: cx, y: cy, w: cw, h: ch } = currentWindow.frame;

    switch (direction) {
      case Direction.WEST:
        return Math.abs((x + w) - cx) < POSITION_TOLERANCE && hasYOverlap(window, currentWindow);
      case Direction.EAST:
        return Math.abs(x - (cx + cw)) < POSITION_TOLERANCE && hasYOverlap(window, currentWindow);
      case Direction.NORTH:
        return Math.abs((y + h) - cy) < POSITION_TOLERANCE && hasXOverlap(window, currentWindow);
      case Direction.SOUTH:
        return Math.abs(y - (cy + ch)) < POSITION_TOLERANCE && hasXOverlap(window, currentWindow);
    }
  });
}

function hasXOverlap(window1: YabaiWindow, window2: YabaiWindow): boolean {
  const { x, w } = window1.frame;
  const { x: x2, w: w2 } = window2.frame;
  return x < (x2 + w2) && (x + w) > x2;
}

function hasYOverlap(window1: YabaiWindow, window2: YabaiWindow): boolean {
  const { y, h } = window1.frame;
  const { y: y2, h: h2 } = window2.frame;
  return y < (y2 + h2) && (y + h) > y2;
}

async function getResizeCommand(
  direction: Direction,
  grow: boolean
): Promise<ResizeCommand | null> {
  const currentWindow = await getWindowInfo();
  const spaceWindows = await getSpaceWindows();
  const space = await getSpaceInfo();

  if (!currentWindow || !space || space.data?.type !== "bsp") return null;

  const activeWindows = spaceWindows.data?.filter(w => 
    w.id !== currentWindow.data?.id && 
    w.frame.w > 0 && 
    w.frame.h > 0
  );

  if (!currentWindow.data || !activeWindows) return null;

  const resizeAmount = grow ? RESIZE_AMOUNT : -RESIZE_AMOUNT;
  const resizeMap = {
    [Direction.NORTH]: `top:0:${-resizeAmount}`,
    [Direction.SOUTH]: `bottom:0:${resizeAmount}`,
    [Direction.EAST]: `right:${resizeAmount}:0`,
    [Direction.WEST]: `left:${-resizeAmount}:0`
  };

  if (hasAdjacentWindow(currentWindow.data, activeWindows, direction)) {
    return {
      command: "-m window",
      args: `--resize ${resizeMap[direction]}`
    };
  }

  return null;
}

export async function getVerticalGrowCommand(): Promise<ResizeCommand | null> {
  return getResizeCommand(Direction.SOUTH, true) || getResizeCommand(Direction.NORTH, true);
}

export async function getVerticalShrinkCommand(): Promise<ResizeCommand | null> {
  return getResizeCommand(Direction.SOUTH, false) || getResizeCommand(Direction.NORTH, false);
}

export async function getHorizontalGrowCommand(): Promise<ResizeCommand | null> {
  return getResizeCommand(Direction.EAST, true) || getResizeCommand(Direction.WEST, true);
}

export async function getHorizontalShrinkCommand(): Promise<ResizeCommand | null> {
  return getResizeCommand(Direction.EAST, false) || getResizeCommand(Direction.WEST, false);
}

