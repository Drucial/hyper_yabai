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

type ResizeDirection = {
  [K in Direction]: {
    axis: "top" | "bottom" | "left" | "right";
    sign: 1 | -1;
  };
};

// Constants
const RESIZE_DIRECTIONS: ResizeDirection = {
  [Direction.NORTH]: { axis: "top", sign: -1 },
  [Direction.SOUTH]: { axis: "bottom", sign: 1 },
  [Direction.EAST]: { axis: "right", sign: 1 },
  [Direction.WEST]: { axis: "left", sign: -1 },
} as const;

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

  if (!window || !spaceWindows || !space) {
    return null;
  }

  if (!(await canResize(window, space)) ) {
    return null;
  }

  const { axis, sign } = RESIZE_DIRECTIONS[direction];

  const effectiveGrow = window.splitChild === "second_child" ? !grow : grow;
  const amount = (effectiveGrow ? 1 : -1) * RESIZE_AMOUNT * sign;

  return `-m window --resize ${axis}:${axis === "left" || axis === "right" ? amount : 0}:${
    axis === "top" || axis === "bottom" ? amount : 0
  }`;
}

export const getResizeCommands = {
  vertical: {
    grow: () => getResizeCommand(Direction.SOUTH, true) || getResizeCommand(Direction.NORTH, true),
    shrink: () => getResizeCommand(Direction.SOUTH, false) || getResizeCommand(Direction.NORTH, false),
  },
  horizontal: {
    grow: () => getResizeCommand(Direction.EAST, true) || getResizeCommand(Direction.WEST, true),
    shrink: () => getResizeCommand(Direction.EAST, false) || getResizeCommand(Direction.WEST, false),
  },
};
