import { boardSizes } from "../types/board-size";

export interface BoardSize {
  size: boardSizes;
  el_ref: HTMLElement | null;
}
