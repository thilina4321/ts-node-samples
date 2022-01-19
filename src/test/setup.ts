import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  var signin: () => Promise<request.Response>;
}



let mongo: any;
beforeAll(async () => {
  // mongo = await MongoMemoryServer.create();
  // const mongoUri = mongo.getUri();

  // await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const res = request(app)
  .post("/auth/create-user")
  .send({ email: "test@test.com", password: "password" })
  .expect(201);

  return res;
};
