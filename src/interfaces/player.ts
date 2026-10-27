export interface Player {
  color: string;
  score: number;
  el_ref: HTMLElement | null;
  current_player_ref: HTMLElement | null;
  score_ref: HTMLElement | null;
  icon_url: string;
}
