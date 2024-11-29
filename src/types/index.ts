export enum Direction {
  WEST = "west",
  EAST = "east",
  NORTH = "north",
  SOUTH = "south",
}

export type SpaceIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type YabaiWindow = {
  id: number;
  pid: number;
  app: string;
  title: string;
  scratchpad: string;
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  role: string;
  subrole: string;
  rootWindow: boolean;
  display: number;
  space: number;
  level: number;
  subLevel: number;
  layer: string;
  subLayer: string;
  opacity: number;
  splitType: string;
  splitChild: string;
  stackIndex: number;
  canMove: boolean;
  canResize: boolean;
  hasFocus: boolean;
  hasShadow: boolean;
  hasParentZoom: boolean;
  hasFullscreenZoom: boolean;
  hasAxReference: boolean;
  isNativeFullscreen: boolean;
  isVisible: boolean;
  isMinimized: boolean;
  isHidden: boolean;
  isFloating: boolean;
  isSticky: boolean;
  isGrabbed: boolean;
};

export type YabaiSpaceType = "bsp" | "float" | "stack";

export type YabaiSpace = {
  id: number;
  uuid: string;
  index: number;
  label: string;
  type: YabaiSpaceType;
  display: number;
  windows: number[];
  firstWindow: number;
  lastWindow: number;
  hasFocus: boolean;
  isVisible: boolean;
  isNativeFullscreen: boolean;
};

export type ValidationResult = {
  canProceed: boolean;
  message?: string;
};

export type CommandOptions = {
  command: string;
  successMessage?: string;
  failureMessage: string;
  requiresWindow?: boolean;
  requiresMultipleWindows?: boolean;
  MessageArgs?: MessageArgs;
  validate?: () => Promise<ValidationResult>;
};

export type MessageArgs = {
  SPACE_INDEX?: string;
  APP?: string;
  TITLE?: string;
  NEW_SPACE_INDEX?: string;
};

export type YabaiCommandResult = {
  command: string;
  escapedCommand: string;
  exitCode: number;
  signal: undefined | string;
  signalDescription: undefined | string;
  stdout: string;
  stderr: string;
  cwd: string;
  failed: boolean;
  timedOut: boolean;
  isCanceled: boolean;
  killed: boolean;
};

export type YabaiQueryResult<T> = {
  data: T | null;
  error: string | null;
};
