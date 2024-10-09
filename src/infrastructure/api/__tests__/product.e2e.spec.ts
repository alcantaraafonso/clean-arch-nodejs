import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Prod1",
        price: 500,
      });
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Prod1");
    expect(response.body.price).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Prod1",
        price: 500,
      });
    expect(response.status).toBe(200);
    const response1 = await request(app)
      .post("/product")
      .send({
        name: "Prod2",
        price: 400,
      });
    expect(response1.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const prod = listResponse.body.products[0];
    expect(prod.name).toBe("Prod1");
    expect(prod.price).toBe(500);
    const prod2 = listResponse.body.products[1];
    expect(prod2.name).toBe("Prod2");
    expect(prod.price).toBe(500);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Prod1</name>`);
    expect(listResponseXML.text).toContain(`<price>500</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Prod2</name>`);
    expect(listResponseXML.text).toContain(`<price>500</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
