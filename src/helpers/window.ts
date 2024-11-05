import { runYabaiCommand } from "./scripts";

const RESIZE_AMOUNT = 50;
const POSITION_TOLERANCE = 20;

export interface YabaiWindow {
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  id: number;
  "split-type": string;
  display: number;
}

export interface YabaiSpace {
  type: string;
  index: number;
}

export interface ResizeCommand {
  command: string;
  args: string;
}

async function getSpaceInfo(): Promise<YabaiSpace> {
  const { stdout, stderr } = await runYabaiCommand("-m query --spaces --space");
  if (stderr) throw new Error(stderr);
  return JSON.parse(stdout);
}

export async function getWindowInfo() {
  const { stdout, stderr } = await runYabaiCommand("-m query --windows --window");
  if (stderr) throw new Error(stderr);
  return JSON.parse(stdout) as YabaiWindow;
}

export async function getSpaceWindows() {
  const { stdout, stderr } = await runYabaiCommand("-m query --windows --space");
  if (stderr) throw new Error(stderr);
  return JSON.parse(stdout) as YabaiWindow[];
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

  const hasWindowBelow = activeWindows.some(window => {
    const isBelow = Math.abs(window.frame.y - (currentWindow.frame.y + currentWindow.frame.h)) < POSITION_TOLERANCE;
    const hasXOverlap = (
      window.frame.x < (currentWindow.frame.x + currentWindow.frame.w) &&
      (window.frame.x + window.frame.w) > currentWindow.frame.x
    );
    return isBelow && hasXOverlap;
  });

  const hasWindowAbove = activeWindows.some(window => {
    const isAbove = Math.abs((window.frame.y + window.frame.h) - currentWindow.frame.y) < POSITION_TOLERANCE;
    const hasXOverlap = (
      window.frame.x < (currentWindow.frame.x + currentWindow.frame.w) &&
      (window.frame.x + window.frame.w) > currentWindow.frame.x
    );
    return isAbove && hasXOverlap;
  });

  if (hasWindowBelow) {
    return {
      command: "-m window",
      args: `--resize bottom:0:${RESIZE_AMOUNT}`
    };
  }

  if (hasWindowAbove) {
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

  const hasWindowBelow = activeWindows.some(window => {
    const isBelow = Math.abs(window.frame.y - (currentWindow.frame.y + currentWindow.frame.h)) < POSITION_TOLERANCE;
    const hasXOverlap = (
      window.frame.x < (currentWindow.frame.x + currentWindow.frame.w) &&
      (window.frame.x + window.frame.w) > currentWindow.frame.x
    );
    return isBelow && hasXOverlap;
  });

  const hasWindowAbove = activeWindows.some(window => {
    const isAbove = Math.abs((window.frame.y + window.frame.h) - currentWindow.frame.y) < POSITION_TOLERANCE;
    const hasXOverlap = (
      window.frame.x < (currentWindow.frame.x + currentWindow.frame.w) &&
      (window.frame.x + window.frame.w) > currentWindow.frame.x
    );
    return isAbove && hasXOverlap;
  });

  if (hasWindowBelow) {
    return {
      command: "-m window",
      args: `--resize bottom:0:-${RESIZE_AMOUNT}`
    };
  }

  if (hasWindowAbove) {
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

  const hasWindowRight = activeWindows.some(window => {
    const isRight = Math.abs(window.frame.x - (currentWindow.frame.x + currentWindow.frame.w)) < POSITION_TOLERANCE;
    const hasYOverlap = (
      window.frame.y < (currentWindow.frame.y + currentWindow.frame.h) &&
      (window.frame.y + window.frame.h) > currentWindow.frame.y
    );
    return isRight && hasYOverlap;
  });

  const hasWindowLeft = activeWindows.some(window => {
    const isLeft = Math.abs((window.frame.x + window.frame.w) - currentWindow.frame.x) < POSITION_TOLERANCE;
    const hasYOverlap = (
      window.frame.y < (currentWindow.frame.y + currentWindow.frame.h) &&
      (window.frame.y + window.frame.h) > currentWindow.frame.y
    );
    return isLeft && hasYOverlap;
  });

  if (hasWindowRight) {
    return {
      command: "-m window",
      args: `--resize right:${RESIZE_AMOUNT}:0`
    };
  }

  if (hasWindowLeft) {
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

  const hasWindowRight = activeWindows.some(window => {
    const isRight = Math.abs(window.frame.x - (currentWindow.frame.x + currentWindow.frame.w)) < POSITION_TOLERANCE;
    const hasYOverlap = (
      window.frame.y < (currentWindow.frame.y + currentWindow.frame.h) &&
      (window.frame.y + window.frame.h) > currentWindow.frame.y
    );
    return isRight && hasYOverlap;
  });

  const hasWindowLeft = activeWindows.some(window => {
    const isLeft = Math.abs((window.frame.x + window.frame.w) - currentWindow.frame.x) < POSITION_TOLERANCE;
    const hasYOverlap = (
      window.frame.y < (currentWindow.frame.y + currentWindow.frame.h) &&
      (window.frame.y + window.frame.h) > currentWindow.frame.y
    );
    return isLeft && hasYOverlap;
  });

  if (hasWindowRight) {
    return {
      command: "-m window",
      args: `--resize right:-${RESIZE_AMOUNT}:0`
    };
  }

  if (hasWindowLeft) {
    return {
      command: "-m window",
      args: `--resize left:${RESIZE_AMOUNT}:0`
    };
  }

  return null;
} 