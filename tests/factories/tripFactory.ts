import {faker} from "@faker-js/faker";
import { Trip, ServiceClass, AffiliateStatus } from "../../src/protocols";

export function createEconomicTrip(): Trip {
  return {
    code: faker.string.alphanumeric(6).toUpperCase(),
    origin: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    destination: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    miles: false,
    plane: faker.vehicle.model(),
    service: ServiceClass.ECONOMIC,
    affiliate: AffiliateStatus.GOLD,
    date: faker.date.recent().toString(), 
  };
}

export function createExecutiveTrip(): Trip {
  return {
    code: faker.string.alphanumeric(6).toUpperCase(),
    origin: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    destination: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    miles: false,
    plane: faker.vehicle.model(),
    service: ServiceClass.EXECUTIVE,
    affiliate: AffiliateStatus.PLATINUM,
    date: faker.date.recent().toString(),
  };
}


export function createFirstClassTrip(): Trip {
  return {
    code: faker.string.alphanumeric(6).toUpperCase(),
    origin: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    destination: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    miles: false,
    plane: faker.vehicle.model(),
    service: ServiceClass.FIRST_CLASS,
    affiliate: AffiliateStatus.BRONZE,
    date: faker.date.recent().toString(),
  };
}

export function createTripPaidWithMiles(): Trip {
  return {
    code: faker.string.alphanumeric(6).toUpperCase(),
    origin: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    destination: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
    miles: true,
    plane: faker.vehicle.model(),
    service: ServiceClass.ECONOMIC_PREMIUM,
    affiliate: AffiliateStatus.SILVER,
    date: faker.date.recent().toString(),
  };
}