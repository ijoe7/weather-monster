process.env.NODE_ENV = "test";
const request = require("supertest");
const assert = require("assert");
const express = require("express");
const db = require("../config/database");
const app = require("../app");

beforeAll(async () => {
    await db.sync({ force: true });
});

describe("Test /cities", () => {
    it("should create a new city", async () => {
        const res = await request(app)
            .post("/cities")
            .send({
                name: "New York",
                latitude: 40.7128,
                longitude: -74.0060,
            })
        assert.equal(res.status, 201);
        assert.equal(res.body.status, "success");
        assert.equal(res.body.message, "City created successfully");
        assert.equal(res.body.response.name, "New York");
        assert.equal(res.body.response.latitude, 40.7128);
        assert.equal(res.body.response.longitude, -74.0060);
    });

    it("should create a second city", async () => {
      const res = await request(app)
        .post("/cities")
        .send({
          name: "Abuja",
          latitude: 30.7128,
          longitude: -60.006,
        });
      assert.equal(res.status, 201);
      assert.equal(res.body.status, "success");
      assert.equal(res.body.message, "City created successfully");
      assert.equal(res.body.response.name, "Abuja");
      assert.equal(res.body.response.latitude, 30.7128);
      assert.equal(res.body.response.longitude, -60.006);
    });

    it("should update a city", async () => {
        const res = await request(app)
            .patch("/cities/1")
            .send({
                name: "Lagos",
                latitude: 40.7128,
                longitude: -74.0060,
            });
        assert.equal(res.status, 200);
        assert.equal(res.body.status, "success");
        assert.equal(res.body.message, "City updated successfully");
        assert.equal(res.body.response.name, "Lagos");
        assert.equal(res.body.response.latitude, 40.7128);
        assert.equal(res.body.response.longitude, -74.0060);
    });
    it("should delete a city", async () => {
        const res = await request(app)
            .delete("/cities/2");
        assert.equal(res.status, 200);
        assert.equal(res.body.status, "success");
        assert.equal(res.body.message, "City deleted successfully");
    });
});

describe("Test /temperatures", () => {
    it("should create a new temperature", async () => {
        const res = await request(app)
            .post("/temperatures")
            .send({
                cityId: 1,
                max: 30,
                min: 20,
            });
        assert.equal(res.status, 201);
        assert.equal(res.body.status, "success");
        assert.equal(res.body.message, "Temperature created successfully");
        assert.equal(res.body.response.cityId, 1);
        assert.equal(res.body.response.max, 30);
        assert.equal(res.body.response.min, 20);
    });
});

describe("Test /forecasts", () => {
    it("should get forecast of the city", async () => {
        const res = await request(app)
            .get("/forecasts/1");
        assert.equal(res.status, 200);
        assert.equal(res.body.status, "success");
        assert.equal(res.body.message, "Forecast retrieved successfully");
        assert.equal(res.body.response.cityId, 1);
        expect(res.body).toHaveProperty("response.max");
        expect(res.body).toHaveProperty("response.min");
        expect(res.body).toHaveProperty("response.sample");
    })
});

describe("Test /webhooks", () => {
    it("should create a new webhook", async () => {
        const res = await request(app)
            .post("/webhooks")
            .send({
                cityId: 1,
                callback_url: "https://example.com",
            });
        assert.equal(res.status, 201);
        assert.equal(res.body.status, "success");
        assert.equal(res.body.message, "Webhook created successfully");
        assert.equal(res.body.response.cityId, 1);
        assert.equal(res.body.response.callback_url, "https://example.com");
    });
    it("should delete a webhook", async () => {
        const res = await request(app)
            .delete("/webhooks/1");
        assert.equal(res.status, 200);
        assert.equal(res.body.status, "success");
        assert.equal(res.body.message, "Webhook deleted successfully");
    });
});

afterAll(async () => {
  await db.close();
});
