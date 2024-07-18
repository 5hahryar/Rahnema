import { api } from "../src/api";
import request from "supertest";

describe("group", () => {

    it("should fail if auth not provided", async () => {
        await request(api)
        .get("/groups")
        .expect(401);
    });

    it("should fail if username or password not correct", async () => {
        await request(api)
        .get("/groups")
        .set("Authorization", "admin")
        .expect(401);
    });

    describe("get", () => {
        it("should get all groups", async () => {
            await request(api)
            .get("/groups")
            .set("Authorization", "ali:ali")
            .expect(200);
        });

        it("should get balance for group", async () => {
            //Add group
            await request(api)
            .post("/groups")
            .set("Authorization", "ali:ali")
            .send({
                "name": "test",
                "usernames": ["ali","vali"]
            })
            .expect(200);

            //Add expense
            await request(api)
            .post("/expenses")
            .set("Authorization", "ali:ali")
            .send({
                "title": "test",
                "amount": 100,
                "payerUsername": "ali",
                "groupName": "test"
            })
            .expect(200);

            await request(api)
            .get("/groups/test/balance")
            .set("Authorization", "ali:ali")
            .expect(200);
        });
    });

    describe("post", () => {
        it("should fail when body not provided", async () => {
            await request(api)
            .post("/groups")
            .set("Authorization", "ali:ali")
            .expect(400);
        });

        it("should fail when user is not registered", async () => {
            await request(api)
            .post("/groups")
            .set("Authorization", "ali:ali")
            .send({
                "name": "test",
                "usernames": ["ali","pali"]
            })
            .expect(400);
        });

        it("should add group", async () => {
            await request(api)
            .post("/groups")
            .set("Authorization", "ali:ali")
            .send({
                "name": "test",
                "usernames": ["ali","vali"]
            })
            .expect(200);
        });
    });
});