import { api } from "../src/api";
import request from "supertest";

describe("expense", () => {

    it("should fail if auth not provided", async () => {
        await request(api)
        .get("/expenses")
        .expect(401);
    });

    it("should fail if username or password not correct", async () => {
        await request(api)
        .get("/expenses")
        .set("Authorization", "admin")
        .expect(401);
    });

    describe("get", () => {
        it("should get all expenses", async() => {
            await request(api)
            .get("/expenses")
            .set("Authorization", "ali:ali")
            .expect(200);
        });

        it("should get expenses payed by username", async() => {
            await request(api)
            .get("/expenses")
            .set("Authorization", "ali:ali")
            .query({ "payerUsername": "ali" })
            .expect(200);
        });

        it("should get expenses for username", async() => {
            await request(api)
            .get("/expenses")
            .set("Authorization", "ali:ali")
            .query({ "username": "ali" })
            .expect(200);
        });
    });

    describe("post", () => {
        it("should add expense", async() => {
            await request(api)
            .post("/groups")
            .set("Authorization", "ali:ali")
            .send({
                "name": "test",
                "usernames": ["ali","vali"]
            })
            .expect(200);

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
        });
    });
});