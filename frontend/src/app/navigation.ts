export type Ecran = "situation" | "rapport";
export type Action = "aller-au-rapport" | "revenir-a-situation";

export function basculerEcran(action: Action): Ecran {
  return action === "aller-au-rapport" ? "rapport" : "situation";
}
