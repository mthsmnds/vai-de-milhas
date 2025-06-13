import { calculateMiles } from "../../src/services/miles-calculator-service";
import * as distanceService from "../../src/services/distances-calculator-service";
import { createEconomicTrip, createExecutiveTrip, createTripPaidWithMiles } from "../factories/tripFactory";

beforeEach(() => {
  jest.clearAllMocks();
});


describe("calculateMiles", () => {

  it("should return 0 if trip is paid with miles", () => {
    const trip = createTripPaidWithMiles();

    const result = calculateMiles(trip);

    expect(result).toBe(0);
  });

  it("should calculate miles for economic trip with GOLD affiliate", () => {
    const trip = createEconomicTrip();
    const distance = 1000;

    const distanceSpy = jest
      .spyOn(distanceService, "calculateDistance")
      .mockReturnValue(distance);

    const result = calculateMiles(trip);

    const base = distance * 1;
    const gold = base * 0.25;
    const expected = Math.round(base + gold);

    expect(distanceSpy).toHaveBeenCalledWith(trip.origin, trip.destination);
    expect(result).toBe(expected);
  });

  it("should calculate miles for executive trip with PLATINUM affiliate", () => {
    const trip = createExecutiveTrip();
    const distance = 800;

    const distanceSpy = jest
      .spyOn(distanceService, "calculateDistance")
      .mockReturnValue(distance);

    const result = calculateMiles(trip);

    const base = distance * 1.5;
    const platinum = base * 0.5;
    const expected = Math.round(base + platinum);

    expect(distanceSpy).toHaveBeenCalledWith(trip.origin, trip.destination);
    expect(result).toBe(expected);
  });

  it("should add 10% bonus if date is in May", () => {
    const trip = createEconomicTrip();
    trip.date = "2024-05-15"; 

    const distance = 500;
    jest.spyOn(distanceService, "calculateDistance").mockReturnValue(distance);

    const base = 500;
    const withGold = base + base * 0.25;
    const final = withGold + withGold * 0.1;

    const result = calculateMiles(trip);
    expect(result).toBe(Math.round(final));
  });
});
