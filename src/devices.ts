import { Observer, Measurement } from "./types";

export interface Device {
  readonly id: string;
  readonly type: string;
  generateMeasurement(): void;
  attach(o: Observer): void;
}

export class BaseDevice implements Device {
  private observers: Observer[] = [];
  constructor(public readonly id: string, public readonly type: string) {}
  attach(o: Observer): void { this.observers.push(o); }
  generateMeasurement(): void {
    const m: Measurement = { timestamp: new Date(), value: Math.round(Math.random() * 100) };
    this.observers.forEach(o => o.update(this.id, m));
  }
}

export class Fridge extends BaseDevice { constructor(id: string) { super(id, "Fridge"); } }
export class Heater extends BaseDevice { constructor(id: string) { super(id, "Heater"); } }
export class Washer extends BaseDevice { constructor(id: string) { super(id, "Washer"); } }
