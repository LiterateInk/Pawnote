import type { WeekMenu } from "~/models";
import { decodeFoodAllergen } from "./food-allergen";
import { decodeFoodLabel } from "./food-label";
import { decodeDomain } from "./domain";
import { decodeMenu } from "./menu";

export const decodeWeekMenu = (menu: any): WeekMenu => ({
  containsLunch: menu.AvecRepasMidi,
  containsDinner: menu.AvecRepasSoir,

  days: menu.ListeJours.V.map(decodeMenu),
  weeks: decodeDomain(menu.DomaineDePresence.V),

  allergens: menu.ListeAllergenes.V.map(decodeFoodAllergen),
  labels: menu.Listelabels.V.map(decodeFoodLabel)
});
