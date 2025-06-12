import { generateMilesForTrip, getMilesFromCode } from "../../src/services/miles-service";
import * as repository from "../../src/repositories/miles-repository";
import * as calculator from "../../src/services/miles-calculator-service";
import { createEconomicTrip, createTripPaidWithMiles } from "../factories/tripFactory";
import { createMiles } from "../factories/milesFactory";


jest.mock("../../src/repositories/miles-repository");
jest.mock("../../src/services/miles-calculator-service");

describe("generateMilesForTrip", () => {
    it("should generate miles for new trip correctly", async () => {
        const trip = createEconomicTrip();
        const miles = createMiles();

        jest.spyOn(repository, "findMiles").mockResolvedValue(null);
        jest.spyOn(calculator, "calculateMiles").mockReturnValue(miles.miles);
        const saveSpy = jest.spyOn(repository, "saveMiles").mockResolvedValue(miles);

        const result = await generateMilesForTrip(trip);

        expect(repository.findMiles).toHaveBeenCalledWith(trip.code);
        expect(calculator.calculateMiles).toHaveBeenCalledWith(trip);
        expect(saveSpy).toHaveBeenCalledWith(trip.code, miles.miles);
        expect(result).toBe(miles.miles);
    });


    it("should throw error 409 if trip already registered", async () => {
        const trip = createEconomicTrip();
        const miles = createMiles();
        miles.code = trip.code;

        jest.spyOn(repository, "findMiles").mockResolvedValue(miles);

        await expect(generateMilesForTrip(trip)).rejects.toEqual({
            type: "conflict",
            message: `Miles already registered for code ${trip.code}`
        });
    });
});



describe("getMilesFromCode", () => {
    it("should return miles when code exists", async () => {
        const miles = createMiles();

        jest.spyOn(repository, "findMiles").mockResolvedValue(miles);

        const result = await getMilesFromCode(miles.code);

        expect(repository.findMiles).toHaveBeenCalledWith(miles.code);
        expect(result).toBe(miles);
    });



    it("should throw error 404 when code does not exist", async () => {
        const code = "INVALID123";

        jest.spyOn(repository, "findMiles").mockResolvedValue(null);

        await expect(getMilesFromCode(code)).rejects.toEqual({
            type: "not_found",
            message: `Miles not found for code ${code}`
        });
    });
});