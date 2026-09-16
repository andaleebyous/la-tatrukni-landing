import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("orders", () => {
  it("rejects invalid public order input before touching the database", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.orders.create({
      name: "x",
      phone: "0500000000",
      city: "الرياض",
      planId: "family",
      planName: "باقة العائلة",
      amount: 449,
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("protects the sales list behind admin access", async () => {
    const caller = appRouter.createCaller(createContext({
      id: 2,
      openId: "regular-user",
      name: "Regular User",
      email: "user@example.com",
      loginMethod: "test",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }));
    await expect(caller.orders.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
