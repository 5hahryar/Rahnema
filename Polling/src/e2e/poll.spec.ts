import { app } from "../api"
import request from "supertest"

describe("Poll", () => {
    describe("Create", () => {
        it("should fail if not authorized", async () => {
            await request(app)
            .post("/polls")
            .expect(401);
        })

        it("should fail when access is not admin", async () => {
            await request(app)
            .post("/polls")
            .set("Authorization", "citizen:citizen")
            .expect(403);
        })

        it("should create poll", async () => {
            await request(app)
            .post("/polls")
            .set("Authorization", "admin:admin")
            .send({
                "title": "sample",
                "planingDeadline": "2023-07-13T11:30:30",
                "votingDeadline": "2023-07-13T11:30:30"
            })
            .expect(200);
        })

        it("should fail create poll if title is empty", async () => {
            await request(app)
            .post("/polls")
            .set("Authorization", "admin:admin")
            .send({
                "title": "",
                "planingDeadline": "2023-07-13T11:30:30",
                "votingDeadline": "2023-07-13T11:30:30"
            })
            .expect(400);
        })
    })
})