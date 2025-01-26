import {
  CHANGE_NAME,
  CHANGE_NICKNAME,
  CHANGE_PROFILE,
  COMMENT_BODY,
  SHOW_CHOICES,
  SHOW_CHOICES_ITEM,
  SHOW_MESSAGE,
  SHOW_SCROLLING_TEXT,
} from "@sigureya/rpgtypes";
import type {
  Command_ChangeName,
  Command_ChangeNickName,
  Command_ChangeProfile,
  Command_ChoiceWhen,
  Command_CommentBody,
  Command_ShowChoices,
  Command_ShowScrollingText,
  EventCommand,
} from "@sigureya/rpgtypes";
import { MessageProxy } from "./commandProxy";
import type { CallBackFunc } from "./callbackFunction";

export interface TextCommandMapper<T> {
  showMessage(proxy: MessageProxy): T;
  showChoices: CallBackFunc<Command_ShowChoices, T>;
  choiceWhen: CallBackFunc<Command_ChoiceWhen, T>;
  showScrollingText: CallBackFunc<Command_ShowScrollingText, T>;
  changeName: CallBackFunc<Command_ChangeName, T>;
  changeProfile: CallBackFunc<Command_ChangeProfile, T>;
  changeNickname: CallBackFunc<Command_ChangeNickName, T>;
  commentBody: CallBackFunc<Command_CommentBody, T>;
  other: CallBackFunc<EventCommand, T>;
}

export const mapTextCommand = <T>(
  list: ReadonlyArray<EventCommand>,
  table: TextCommandMapper<T>
) => {
  return list.map<T>((command, index, array) => {
    switch (command.code) {
      case SHOW_MESSAGE:
        return table.showMessage(new MessageProxy(command, index, array));
      case SHOW_CHOICES:
        return table.showChoices(command, index, array);
      case SHOW_CHOICES_ITEM:
        return table.choiceWhen(command, index, array);
      case SHOW_SCROLLING_TEXT:
        return table.showScrollingText(command, index, array);
      case CHANGE_NAME:
        return table.changeName(command, index, array);
      case CHANGE_PROFILE:
        return table.changeProfile(command, index, array);
      case CHANGE_NICKNAME:
        return table.changeNickname(command, index, array);
      case COMMENT_BODY:
        return table.commentBody(command, index, array);

      default:
        return table.other(command, index, array);
    }
  });
};
