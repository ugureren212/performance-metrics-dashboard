import supertest from "supertest";
import { app } from "../src/server";

const request = supertest(app);

describe("Express App", () => {
  it("should respond with correct response format", async () => {
    const responseString = await request.get("/fundData");
    const responseObject = JSON.parse(responseString.text);

    expect(responseObject).toHaveProperty("chartLabels");
    expect(responseObject).toHaveProperty("baseMonthlyPerformance");
    expect(responseObject).toHaveProperty("ltdPerformance");
    expect(responseObject).toHaveProperty("ytdPerformance");

    expect(responseObject["chartLabels"].length);
    expect(responseObject["baseMonthlyPerformance"].length);
    expect(responseObject["ltdPerformance"].length);
    expect(responseObject["ytdPerformance"].length);
  });
});
