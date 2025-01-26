import type { EventCommand } from "@sigureya/rpgtypes";

export type CallBackFunc<Command extends EventCommand, Reulst = void> = (
  command: Readonly<Command>,
  index: number,
  list: ReadonlyArray<Readonly<EventCommand>>
) => Reulst;
