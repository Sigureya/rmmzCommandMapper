import type { Command_ChangeActorImages } from "@sigureya/rpgtypes";
import type { CallBackFunc } from "./callbackFunction";

export interface ImageCommadnMapper<T> {
  changeActorImages: CallBackFunc<Command_ChangeActorImages, T>;
}
