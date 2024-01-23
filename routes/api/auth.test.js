const app = require("../../app");
const mongoose = require("mongoose");
const request = require("supertest");
const { envsConfig } = require("../../configs");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

describe("register route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(envsConfig.port);
    await mongoose.connect(envsConfig.dbHostTest);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("Should register user with correct data", async () => {
    const registerBody = {
      name: "Oleg",
      email: "oleg@gmail.com",
      password: "qwer1234",
    };

    const userSpy = jest.spyOn(User, "create").mockResolvedValueOnce(null);
    const hashPassSpy = jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("dfjhgkdfjhgdfg");
    const response = await request(app).post("/api/auth/register").send(registerBody);
    const user = await User.findOne({ email: registerBody.email });

    // expect(response.statusCode).toBe(201);
    expect(response.body.userEmail).toBe("oleg@gmail.com");
    expect(response.body.name).toBe("Oleg");
    expect(user.name).toBe("Oleg");
    expect(user.email).toBe("oleg@gmail.com");
    expect(userSpy).toHaveBeenCalledWith();
  });
});
