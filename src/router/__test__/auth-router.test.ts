import request from "supertest";
import { app } from "../../app";

it("create a user with 201 status!", async () => {
  return request(app)
    .post("/users/signup")
    .send({ email: "test@gmail.com", password: "password" })
    .expect(201);
});

it("Invalid email", async () => {
  return request(app)
    .post("/users/signup")
    .send({ email: "test", password: "test1234" })
    .expect(400);
});

it("Check password", async () => {
  return request(app)
    .post("/users/signup")
    .send({ email: "test@test.com", password: "test" })
    .expect(400);
});

it("return 400 status with missing email or password", async () => {
  await request(app)
    .post("/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  return request(app)
    .post("/users/signup")
    .send({ password: "this is the password" })
    .expect(400);
});

it("unique email test!", async () => {
  await global.signin();

  await request(app)
    .post("/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("check is token defined", async () => {
  await global.signin();

  const res = await request(app)
    .post("/users/signin")
    .send({ email: "test@test.com", password: "password" });

  expect(res.body.token).toBeDefined();
});

it("check current user is defined", async () => {
  await global.signin();

  const signIn = await request(app)
    .post("/users/signin")
    .send({ email: "test@test.com", password: "password" });

  const currentUser = await request(app) 
    .get("/users/current-user")
    .set("Authorization", "Bearer " + signIn.body.token)
    .send();

  expect(currentUser.body.user).not.toEqual(null);
});

it("check current user is not defined", async () => {
  const currentUser = await request(app)
    .get("/users/current-user")
    .set("Authorization", "Bearer " + "signIn.body.token")
    .send();

  expect(currentUser.body.user).toEqual(null);
});
