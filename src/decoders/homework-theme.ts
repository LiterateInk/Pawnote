import type { HomeworkTheme } from "~/models/homework-theme";
import { decodeSubject } from "./subject";

export const decodeHomeworkTheme = (theme: any): HomeworkTheme => ({
  id: theme.N,
  name: theme.L,
  subject: decodeSubject(theme.Matiere.V)
});
