const express = require("express");
const request = require("supertest");
const userRoute = require("../routes/user.route")

const app = express();
app.use(express.json());

app.use("/api/users", userRoute);

describe("Integration test for the articles API", ()=>{
    it("should GET /api/users - success - get all users", async ()=>{
        const {body, statusCode } = await request(app).get("/api/users");
        
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(String),
                    firstname: expect.any(String),
                    lastname: expect.any(String),
                    username: expect.any(String),
                    email: expect.any(String),
                    password: expect.any(String)
                })
            ])
        );
        expect(statusCode).toBe(200)
    });

    it("should POST /api/users - failure on valid post body", async ()=>{
        const { body, statusCode } = await request(app).post("/api/users").send({
            username: "",
            password: "Lorenzoipsumionlol"
        });

        console.log(body)
        expect(statusCode).toBe(400);
        expect(body).toEqual({
            errors: [
                {
                    location: "body",
                    msg: "Article's title is required",
                    param: "username",
                    value: ""
                }
            ]
        });
    });
});