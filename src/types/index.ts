
export type YabaiWindow = {
  id: number;
  title: string;
  app: string;
  frame: { x: number; y: number; width: number; height: number };
};

export type YabaiSpace = {
  id: number;
  uuid: string;
  index: number;
  label: string;
  type: "bsp" | "float" | "stack";
  display: number;
  windows: number[];
  firstWindow: number;
  lastWindow: number;
  hasFocus: boolean;
  isVisible: boolean;
  isNativeFullscreen: boolean;
};

export type Direction = "west" | "east" | "north" | "south";
