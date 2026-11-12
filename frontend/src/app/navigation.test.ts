import { describe, expect, it } from "vitest";
import { basculerEcran } from "./navigation";

describe("basculerEcran", () => {
  it("bascule vers l'écran rapport", () => {
    expect(basculerEcran("aller-au-rapport")).toBe("rapport");
  });

  it("revient vers l'écran situation", () => {
    expect(basculerEcran("revenir-a-situation")).toBe("situation");
  });
});
