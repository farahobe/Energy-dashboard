import { AnalysisStrategy } from "./strategies";
import { Measurement } from "./types";

export class EnergySavingAnalysis implements AnalysisStrategy {
    analyze(data: Measurement[]): string {
        if (data.length === 0) return "No data";
        const vals = data.map(m => m.value),
            avg = vals.reduce((a, v) => a + v, 0) / vals.length,
            min = Math.min(...vals),
            saving = Math.round((avg - min) * 100) / 100;
        return `Savings potential: ${saving} W`;
    }
}
