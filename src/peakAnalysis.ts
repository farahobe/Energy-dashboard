import { AnalysisStrategy } from "./strategies";
import { Measurement } from "./types";

export class PeakAnalysis implements AnalysisStrategy {
    analyze(data: Measurement[]): string {
        if (data.length === 0) return "No data";
        return `Peak: ${Math.max(...data.map(m => m.value))} W`;
    }
}
