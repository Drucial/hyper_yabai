import { showHUD } from "@raycast/api";

export enum MessageType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO"
}

interface YabaiMessage {
  title: string | Readonly<string>;
  type?: MessageType;
}

export async function showYabaiMessage({ title, type = MessageType.INFO }: YabaiMessage) {
  switch (type) {
    case MessageType.SUCCESS:
      await showHUD(title);
      break;
    case MessageType.ERROR:
      await showHUD("❌ " + title);
      break;
    case MessageType.INFO:
    default:
      await showHUD("ℹ️ " + title);
      break;
  }
}

// System and restriction messages
export const MESSAGES = {
  SYSTEM: {
    YABAI_NOT_RUNNING: {
      title: "Yabai is not running",
      type: MessageType.ERROR,
    },
    WINDOW_NOT_FOUND: {
      title: "No window found",
    },
  },
  DIRECTION: {
    NO_WINDOW_ABOVE: { title: "No window above" },
    NO_WINDOW_BELOW: { title: "No window below" },
    NO_WINDOW_LEFT: { title: "No window to the left" },
    NO_WINDOW_RIGHT: { title: "No window to the right" },
  },
} as const; 