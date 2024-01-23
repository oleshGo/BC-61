const user = require("./example-2");

describe("user", () => {
  beforeEach(() => {});

  afterEach(() => {});

  beforeAll(() => {});

  afterAll(() => {});
  describe("getUser", () => {
    it("", () => {
      const findSpy = jest.spyOn(user, "find").mockReturnValueOnce("ksfjghfd");
      const result = user.getUser("ksfjghfd");

      expect(result).toEqual({ email: `ksfjghfd@gmail.com` });
      // expect(findSpy).toHaveBeenCalled(findSpy);
    });

    it("", () => {
      const findSpy = jest.spyOn(user, "find").mockReturnValueOnce({ email: "1231" });
      const result = user.getUser("123");

      expect(result).toEqual({ email: `123123@gmail.com` });
      expect(findSpy).toHaveBeenCalled(1);
      expect(findSpy).not.toHaveBeenCalled();
      expect(findSpy).toHaveBeenCalledWith("ksfjghfd");
    });
  });
});
