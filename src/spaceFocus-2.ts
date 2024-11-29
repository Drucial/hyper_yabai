import { spaceFocus } from "./space/spaceFocus";

export default async function Command() {
  await spaceFocus(2);
}
