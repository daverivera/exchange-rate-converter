import { renderHook } from "@testing-library/react-hooks";
import { useGetAllEchangeRateNames } from "./useGetAllExchangeRateNames";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { API_RESOURCES } from "../utils/constants";

const axiosMock = new MockAdapter(axios);

describe("useGetAllEchangeRates", () => {
  describe("when fetching for all the exchange rates", () => {
    it("should return a list with all the rates", async () => {
      axiosMock.onGet(API_RESOURCES.allRates).reply(200, {
        base: "EUR",
        date: "2021-03-01",
        rates: { CAD: 1.5274 },
      });

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetAllEchangeRateNames()
      );
      await waitForNextUpdate();

      expect(result.current).toEqual(["CAD", "EUR"]);
    });
  });
});
