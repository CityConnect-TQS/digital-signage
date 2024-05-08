// To be deleted after API calls are implemented

import { Trip } from "@/types/trip";

export const departures: Trip[] = [
  {
    id: 1,
    departure: { id: 1, name: "Aveiro", latitude: 40.6443, longitude: -8.6455 },
    arrival: { id: 2, name: "Porto", latitude: 41.1496, longitude: -8.6109 },
    departureTime: new Date("2024-05-10T10:15:00"),
    arrivalTime: new Date("2024-05-10T12:00:00"),
    price: 15.5,
    freeSeats: 18,
    bus: { id: 1, capacity: 50, company: "Rede Expressos" },
  },
  {
    id: 2,
    departure: { id: 1, name: "Aveiro", latitude: 40.6443, longitude: -8.6455 },
    arrival: { id: 3, name: "Lisboa", latitude: 38.7223, longitude: -9.1393 },
    departureTime: new Date("2024-05-10T14:30:00"),
    arrivalTime: new Date("2024-05-10T19:00:00"),
    price: 19.75,
    freeSeats: 12,
    bus: { id: 2, capacity: 40, company: "Renex" },
  },
  {
    id: 3,
    departure: { id: 1, name: "Aveiro", latitude: 40.6443, longitude: -8.6455 },
    arrival: { id: 4, name: "Faro", latitude: 37.0171, longitude: -7.9306 },
    departureTime: new Date("2024-05-10T21:00:00"),
    arrivalTime: new Date("2024-05-11T00:45:00"),
    price: 22.0,
    freeSeats: 8,
    bus: { id: 3, capacity: 55, company: "EVA Transportes" },
  },
  {
    id: 4,
    departure: { id: 1, name: "Aveiro", latitude: 40.6443, longitude: -8.6455 },
    arrival: { id: 5, name: "Coimbra", latitude: 40.2033, longitude: -8.4103 },
    departureTime: new Date("2024-05-11T23:00:00"),
    arrivalTime: new Date("2024-05-11T23:30:00"),
    price: 5.0,
    freeSeats: 25,
    bus: { id: 4, capacity: 30, company: "Transdev" },
  },
];

export const arrivals: Trip[] = [
  {
    id: 5,
    departure: { id: 2, name: "Porto", latitude: 41.1496, longitude: -8.6109 },
    arrival: { id: 1, name: "Aveiro", latitude: 40.6443, longitude: -8.6455 },
    departureTime: new Date("2024-05-10T08:30:00"),
    arrivalTime: new Date("2024-05-10T10:00:00"),
    price: 15.5,
    freeSeats: 18,
    bus: { id: 1, capacity: 50, company: "Rede Expressos" },
  },
  {
    id: 6,
    departure: { id: 3, name: "Lisboa", latitude: 38.7223, longitude: -9.1393 },
    arrival: { id: 1, name: "Aveiro", latitude: 40.6443, longitude: -8.6455 },
    departureTime: new Date("2024-05-10T11:00:00"),
    arrivalTime: new Date("2024-05-10T15:30:00"),
    price: 19.75,
    freeSeats: 12,
    bus: { id: 2, capacity: 40, company: "Renex" },
  },
  {
    id: 7,
    departure: { id: 4, name: "Faro", latitude: 37.0171, longitude: -7.9306 },
    arrival: { id: 1, name: "Aveiro", latitude: 40.6443, longitude: -8.6455 },
    departureTime: new Date("2024-05-11T00:00:00"),
    arrivalTime: new Date("2024-05-11T03:45:00"),
    price: 22.0,
    freeSeats: 8,
    bus: { id: 3, capacity: 55, company: "EVA Transportes" },
  },
];
