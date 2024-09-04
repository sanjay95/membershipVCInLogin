import { use } from "next-api-middleware";
import type { NextApiRequest, NextApiResponse } from "next";

import { allowedHttpMethods } from "../middlewares/allowed-http-methods";
import { errorHandler } from "../middlewares/error-handler";

const flights = [
  {
    id: "AA1234",
    to: "Los Angeles (LAX)",
    from: "New York (JFK)",
    travelTime: "4h 15m",
    miles: 2446,
    departureDateTime: "2024-05-10 @ 10:30AM PST",
    fare: 350.99,
    claimable: "yes"
  },
  {
    id: "BA0987",
    to: "London (LHR)",
    from: "Chicago (ORD)",
    travelTime: "7h 40m",
    miles: 4183,
    departureDateTime: "2024-05-08 @ 02:15PM CST",
    fare: 728.45,
    claimable: "yes"
  },
  {
    id: "EK5678",
    to: "Dubai (DXB)",
    from: "Sydney (SYD)",
    travelTime: "14h 20m",
    miles: 9208,
    departureDateTime: "2024-05-07 @ 11:00PM AEDT",
    fare: 1899.00,
    claimable: "yes"
  },
  {
    id: "UA7890",
    to: "San Francisco (SFO)",
    from: "Miami (MIA)",
    travelTime: "5h 20m",
    miles: 2428,
    departureDateTime: "2024-05-03 @ 01:45PM EDT",
    fare: 421.56,
    claimable: "yes"
  },
  {
    id: "JL3456",
    to: "Tokyo (HND)",
    from: "Seattle (SEA)",
    travelTime: "9h 10m",
    miles: 5149,
    departureDateTime: "2024-05-06 @ 10:00AM PDT",
    fare: 879.21,
    claimable: "yes"
  },
  {
    id: "QR1234",
    to: "Doha (DOH)",
    from: "Paris (CDG)",
    travelTime: "6h 35m",
    miles: 2944,
    departureDateTime: "2024-05-02 @ 08:15AM CET",
    fare: 632.89,
    claimable: "yes"
  },
  {
    id: "AC5678",
    to: "Toronto (YYZ)",
    from: "Beijing (PEK)",
    travelTime: "11h 50m",
    miles: 6371,
    departureDateTime: "2024-05-04 @ 12:00PM CST",
    fare: 1047.32,
    claimable: "yes"
  },
  {
    id: "LA8901",
    to: "São Paulo (GRU)",
    from: "Lisbon (LIS)",
    travelTime: "10h 25m",
    miles: 5399,
    departureDateTime: "2024-05-01 @ 06:45PM WET",
    fare: 912.78,
    claimable: "yes"
  },
  {
    id: "KL6789",
    to: "Amsterdam (AMS)",
    from: "Johannesburg (JNB)",
    travelTime: "11h 15m",
    miles: 6107,
    departureDateTime: "2024-04-30 @ 11:30PM SAST",
    fare: 1356.90,
    claimable: "yes"
  },
  {
    id: "CX3456",
    to: "Hong Kong (HKG)",
    from: "Vancouver (YVR)",
    travelTime: "12h 05m",
    miles: 6781,
    departureDateTime: "2024-04-29 @ 03:11",
    fare: 1556.90
  },
  {
    id: "AA1234",
    to: "Los Angeles (LAX)",
    from: "New York (JFK)",
    travelTime: "4h 15m",
    miles: 2446,
    departureDateTime: "2024-05-10 @ 10:30AM PST",
    fare: 1556.90
  },
  {
    id: "BA0987",
    to: "London (LHR)",
    from: "Chicago (ORD)",
    travelTime: "7h 40m",
    miles: 4183,
    departureDateTime: "2024-05-08 @ 02:15PM CST",
    fare: 1556.90
  },
  {
    id: "EK5678",
    to: "Dubai (DXB)",
    from: "Sydney (SYD)",
    travelTime: "14h 20m",
    miles: 9208,
    departureDateTime: "2024-05-07 @ 11:00PM AEDT",
    fare: 1556.90
  },
  {
    id: "UA7890",
    to: "San Francisco (SFO)",
    from: "Miami (MIA)",
    travelTime: "5h 20m",
    miles: 2428,
    departureDateTime: "2024-05-03 @ 01:45PM EDT",
    fare: 1556.90
  },
  {
    id: "JL3456",
    to: "Tokyo (HND)",
    from: "Seattle (SEA)",
    travelTime: "9h 10m",
    miles: 5149,
    departureDateTime: "2024-05-06 @ 10:00AM PDT",
    fare: 1556.90
  },
  {
    id: "QR1234",
    to: "Doha (DOH)",
    from: "Paris (CDG)",
    travelTime: "6h 35m",
    miles: 2944,
    departureDateTime: "2024-05-02 @ 08:15AM CET",
    fare: 1556.90
  },
  {
    id: "AC5678",
    to: "Toronto (YYZ)",
    from: "Beijing (PEK)",
    travelTime: "11h 50m",
    miles: 6371,
    departureDateTime: "2024-05-04 @ 12:00PM CST",
    fare: 1556.90
  },
  {
    id: "LA8901",
    to: "São Paulo (GRU)",
    from: "Lisbon (LIS)",
    travelTime: "10h 25m",
    miles: 5399,
    departureDateTime: "2024-05-01 @ 06:45PM WET",
    fare: 1556.90
  },
  {
    id: "KL6789",
    to: "Amsterdam (AMS)",
    from: "Johannesburg (JNB)",
    travelTime: "11h 15m",
    miles: 6107,
    departureDateTime: "2024-04-30 @ 11:30PM SAST",
    fare: 1556.90
  },
  {
    id: "CX3456",
    to: "Hong Kong (HKG)",
    from: "Vancouver (YVR)",
    travelTime: "12h 05m",
    miles: 6781,
    departureDateTime: "2024-04-29 @ 03:15PM PST",
    fare: 1556.90
  },
  {
    id: "SQ1234",
    to: "Singapore (SIN)",
    from: "Frankfurt (FRA)",
    travelTime: "12h 40m",
    miles: 6434,
    departureDateTime: "2024-05-09 @ 05:15AM CEST",
    fare: 1556.90
  },
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { actors, directors, genres } = req.body.data || req.body;
  await new Promise(f => setTimeout(f, 2000));
  res.status(200).json(flights);
}

export default use(allowedHttpMethods("POST"), errorHandler)(handler);
