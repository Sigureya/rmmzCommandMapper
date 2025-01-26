import { describe, test, expect } from "vitest";
import { create } from "./proxy";
import type {
  Command_Comment,
  Command_CommentBody,
  Command_CommonEvent,
} from "@sigureya/rpgtypes";

const commands: [
  Command_Comment,
  Command_CommentBody,
  Command_CommentBody,
  Command_CommonEvent
] = [
  {
    code: 108,
    parameters: ["aaaa"],
    indent: 0,
  },
  {
    code: 408,
    parameters: ["bbbb"],
    indent: 0,
  },
  {
    code: 408,
    parameters: ["cccc"],
    indent: 0,
  },
  {
    code: 117,
    parameters: [1],
    indent: 0,
  },
] as const;

describe("comment", () => {
  const x = create(commands, 0, 108, 408);
  test("head", () => {
    expect(x.length).toBe(3);
  });
  test("body", () => {
    expect(x[0].parameters).toEqual(["aaaa"]);
    expect(x[1].parameters).toEqual(["bbbb"]);
    expect(x[2].parameters).toEqual(["cccc"]);
  });
});
