import { calculateThreeMonthsAgo, urlDateFormatter } from "./date";

describe("date", () => {
  describe("urlDateFormatter", () => {
    describe("when formatting a Date into a url date", () => {
      it("should format the Date into yyyy/MM/dd", () => {
        const specificDate = new Date("01/12/2010");
        const formattedDate = urlDateFormatter(specificDate);

        expect(formattedDate).toBe("2010-01-12");
      });
    });
  });

  describe("calculateThreeMonthsAgo", () => {
    it("should return the date of one week ago from today", () => {
      const weekAgoDate = calculateThreeMonthsAgo(new Date("2021-03-04"));
      expect(weekAgoDate.toISOString()).toEqual("2020-12-04T00:00:00.000Z");
    })
  });
});

