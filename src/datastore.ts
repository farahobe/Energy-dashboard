import { Measurement } from "./types";

export class DataStore {
  private store = new Map<string, Measurement[]>();

  saveMeasurement(deviceId: string, m: Measurement): void {
    if (!this.store.has(deviceId)) this.store.set(deviceId, []);
    this.store.get(deviceId)!.push(m);
  }

  getMeasurements(deviceId: string | "ALL", since: Date): Measurement[] {
    return [...this.store.entries()]
        .filter(([id]) => deviceId === "ALL" || id === deviceId)
        .flatMap(([, arr]) => arr)
        .filter(m => m.timestamp >= since);
  }
}
