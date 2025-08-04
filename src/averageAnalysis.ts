import { AnalysisStrategy } from "./strategies";
import { Measurement } from "./types";

export class AverageAnalysis implements AnalysisStrategy {
    analyze(data: Measurement[]): string {
        if (data.length === 0) return "No data";
        const avg = Math.round(data.reduce((sum, m) => sum + m.value, 0) / data.length);
        return `Avg: ${avg} W`;
    }
}
