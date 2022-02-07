import "dotenv/config";

import { UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
  describe("Check existance of user model methods", () => {
    it("should be defined", () => {
      expect(store).toBeDefined();
    });

    it("should have index method", () => {
      expect(store.index).toBeDefined();
    });

    it("should have show method", () => {
      expect(store.show).toBeDefined();
    });

    it("should have create method", () => {
      expect(store.create).toBeDefined();
    });

    it("should have authenticate method", () => {
      expect(store.authenticate).toBeDefined();
    });
  });

  describe("Test user model methods", () => {
    it("should list all users", async () => {
      const users = await store.index();
      expect(users).toEqual([]);
    });
  });
});
