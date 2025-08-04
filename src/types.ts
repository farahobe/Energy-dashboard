export interface Measurement {
  timestamp: Date;
  value: number;
}

export interface Observer {
  update(deviceId: string, m: Measurement): void;
}
