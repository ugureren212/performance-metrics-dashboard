import {
  MonthlyData,
  calculateChartLabels,
} from "../../src/routes/chartPerformanceLogic"; // Import your function from the appropriate file

describe("calculateChartLabels", () => {
  it("should return an array of formatted chart labels/dates", () => {
    const testData: MonthlyData[] = [
      { year: 2023, month: 1, pricePerShare: 100, dividendPerShare: 10 },
      { year: 2023, month: 2, pricePerShare: 110, dividendPerShare: 11 },
      { year: 2023, month: 3, pricePerShare: 120, dividendPerShare: 12 },
    ];

    const expectedLabels = ["Jan 2023", "Feb 2023", "Mar 2023"];
    const result = calculateChartLabels(testData);

    expect(result).toEqual(expectedLabels);
  });
});
