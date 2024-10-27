export interface MachineData {
  timestamp: string;
  soil_moisture: number;
  air_temperature: number;
  humidity: number;
  soil_temperature: number;
  soil_ph: number;
  water_ph: number;
  AnomalyDescription?: string;
}

let description: string =
  "The factors that supporting the data is relevant to the count produced, hence the row data is marked as normal data.";

export let machineDataList: MachineData[] = [
  {
    timestamp: "2024-09-24T12:30:00+0600",
    soil_moisture: 23.7,
    air_temperature: 30.2,
    humidity: 75.4,
    soil_temperature: 27.1,
    soil_ph: 6.1,
    water_ph: 7.3,
    AnomalyDescription: description,
  },
  {
    timestamp: "2024-09-25T08:15:00+0600",
    soil_moisture: 25.2,
    air_temperature: 28.9,
    humidity: 78.3,
    soil_temperature: 26.5,
    soil_ph: 6.2,
    water_ph: 7.2,
    AnomalyDescription: description,
  },
  {
    timestamp: "2024-09-26T16:45:00+0600",
    soil_moisture: 22.9,
    air_temperature: 31.1,
    humidity: 72.7,
    soil_temperature: 28.3,
    soil_ph: 6.0,
    water_ph: 7.4,
    AnomalyDescription: description,
  },
  {
    timestamp: "2024-09-27T14:20:00+0600",
    soil_moisture: 24.1,
    air_temperature: 29.5,
    humidity: 74.8,
    soil_temperature: 27.0,
    soil_ph: 6.1,
    water_ph: 7.3,
    AnomalyDescription: description,
  },
  {
    timestamp: "2024-09-28T09:50:00+0600",
    soil_moisture: 23.3,
    air_temperature: 30.0,
    humidity: 76.0,
    soil_temperature: 27.5,
    soil_ph: 6.2,
    water_ph: 7.2,
    AnomalyDescription: description,
  },
];
