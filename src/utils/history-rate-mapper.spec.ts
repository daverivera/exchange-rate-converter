import { ExchangeDate } from "../types/Exchange";
import { historyRateMapper } from "./history-rate-mapper";

describe("history-rate-mapper", () => {
  describe("historyRateMapper", () => {
    describe("when formatting a history rate", () => {
      it("should format it as a '[date]: rate' object", () => {
        const rateHistory = {
          "2018-02-01": {
            EUR: 0.8380824673,
          },
          "2018-01-01": {
            EUR: 0.8317391666,
          },
          "2018-03-01": {
            EUR: 0.8352125616,
          },
        } as ExchangeDate;

        const formattedRateHistory = historyRateMapper(rateHistory);

        expect(formattedRateHistory["EUR"].values).toHaveLength(3);
        expect(formattedRateHistory).toEqual({
          EUR: {
            min: 0.8317391666,
            max: 0.8380824673,
            values: [
              {
                date: "Jan 2018",
                rate: 0.8317391666,
              },
              {
                date: "Feb 2018",
                rate: 0.8380824673,
              },
              {
                date: "Mar 2018",
                rate: 0.8352125616,
              },
            ],
          },
        });
      });
    });
  });
});
