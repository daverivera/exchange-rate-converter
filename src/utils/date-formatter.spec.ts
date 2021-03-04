import { urlDateFormatter } from "./date-formatter";

describe("date-formatter", () => {
  describe("urlDateFormatter", () => {
    describe("when formatting a Date into a url date", () => {
      it("should format the Date into yyyy/MM/dd", () => {
        const specificDate = new Date("01/12/2010");
        const formattedDate = urlDateFormatter(specificDate);

        expect(formattedDate).toBe("2010-01-12");
      });
    });
  });
});
