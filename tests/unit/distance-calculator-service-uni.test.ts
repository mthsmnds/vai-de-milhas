import { applyHaversineFormula, calculateDistance, toRadius } from "../../src/services/distances-calculator-service";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("toRadius", () => {
  it("should convert degrees to radians correctly", () => {
    expect(toRadius(180)).toBeCloseTo(Math.PI);
    expect(toRadius(90)).toBeCloseTo(Math.PI / 2);
  });
});



describe("applyHaversineFormula", () => {
  it("should calculate haversine distance correctly", () => {
    const lat1 = toRadius(0);
    const lat2 = toRadius(0);
    const dLat = toRadius(0);
    const dLon = toRadius(1);
    const radius = 6371;

    const result = applyHaversineFormula(lat1, lat2, dLat, dLon, radius);
    expect(result).toBeCloseTo(111.19, 1); 
  });

  it("should call Math methods correctly", () => {
    const sinSpy = jest.spyOn(Math, "sin");
    const cosSpy = jest.spyOn(Math, "cos");
    const atan2Spy = jest.spyOn(Math, "atan2");
    const sqrtSpy = jest.spyOn(Math, "sqrt");

    const lat1 = toRadius(10);
    const lat2 = toRadius(20);
    const dLat = toRadius(10);
    const dLon = toRadius(15);
    const radius = 6371;

    applyHaversineFormula(lat1, lat2, dLat, dLon, radius);

    expect(sinSpy).toHaveBeenCalled();
    expect(cosSpy).toHaveBeenCalled();
    expect(atan2Spy).toHaveBeenCalled();
    expect(sqrtSpy).toHaveBeenCalled();

  });

});



describe("calculateDistance", () => {
  const saoPaulo = { lat: -23.5505, long: -46.6333 };
  const rioDeJaneiro = { lat: -22.9068, long: -43.1729 };

  it("should calculate distance in kilometers", () => {
    const result = calculateDistance(saoPaulo, rioDeJaneiro);
    expect(result).toBeGreaterThan(350);
    expect(result).toBeLessThan(370);
  });

  it("should calculate distance in miles", () => {
    const result = calculateDistance(saoPaulo, rioDeJaneiro, true);
    expect(result).toBeGreaterThan(210);
    expect(result).toBeLessThan(240);
  });

  it("should return 0 for identical coordinates", () => {
    const result = calculateDistance(saoPaulo, saoPaulo);
    expect(result).toBe(0);

  });
});
