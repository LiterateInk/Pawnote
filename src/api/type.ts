import type { PronoteApiHTTPType } from "~/constants/http";

export interface PronoteValue<Type extends PronoteApiHTTPType, Value extends unknown> {
  _T: Type
  V: Value
}
