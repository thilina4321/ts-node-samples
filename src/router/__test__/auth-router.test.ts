import request from "supertest";
import { app } from "../../app";

it("create a user with 201 status!", async () => {
  return request(app)
    .post("/auth/create-user")
    .send({ email: "test@gmail.com", password: "test1234" })
    .expect(201);
});

it("Invalid email", async () => {
  return request(app)
    .post("/auth/create-user")
    .send({ email: "test", password: "test1234" })
    .expect(400);
});

it("Check password", async () => {
  return request(app)
    .post("/auth/create-user")
    .send({ email: "test@test.com", password: "test" })
    .expect(400);
});

it("return 400 status with missing email or password", async () => {
  await request(app)
    .post("/auth/create-user")
    .send({ email: "test@test.com" })
    .expect(400);

  return request(app)
    .post("/auth/create-user")
    .send({ password: "this is the password" })
    .expect(400);
});

it("unique email test!", async () => {
  //   await request(app)
  //     .post("/auth/create-user")
  //     .send({ email: "test@test.com", password: "password" })
  //     .expect(201);

  await global.signin();

  await request(app)
    .post("/auth/create-user")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("check is token defined", async () => {
  const res = await request(app)
    .post("/auth/create-user")
    .send({ email: "test@test.com", password: "password" });

  expect(res.body.token).toBeDefined();
});
