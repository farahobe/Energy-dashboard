import { Measurement } from "./types";

export interface AnalysisStrategy {
  analyze(data: Measurement[]): string;
}

export class AnalysisContext {
  constructor(private strategy: AnalysisStrategy) {}
  setStrategy(s: AnalysisStrategy) { this.strategy = s; }
  analyze(data: Measurement[]) { return this.strategy.analyze(data); }
}
