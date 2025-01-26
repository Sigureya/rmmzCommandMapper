import type { EventCommand, EventCommandTable } from "@sigureya/rpgtypes";

export class MessageProxy {
  constructor(
    public readonly command: Readonly<EventCommandTable["SHOW_MESSAGE"]>,
    private index: number,
    private array: ReadonlyArray<EventCommand>
  ) {}
  joinBody(sepadrator = "\n"): string {
    return this.body()
      .map((v) => v.parameters[0])
      .join(sepadrator);
  }
  bodyCode() {
    return 401 as const;
  }
  body(): EventCommandTable["SHOW_MESSAGE_BODY"][] {
    const result: EventCommandTable["SHOW_MESSAGE_BODY"][] = [];
    for (let i = this.index + 1; i < this.array.length; i++) {
      const command = this.array[i];
      if (command.code === this.bodyCode()) {
        result.push(command);
      } else {
        break;
      }
    }
    return result;
  }
  head(): EventCommandTable["SHOW_MESSAGE"] {
    return this.command;
  }
  speakerName(): string {
    return this.command.parameters[4];
  }
}
