import { Observer, Measurement } from "./types.js";
import { DataStore } from "./datastore.js";
import { AnalysisContext } from "./strategies.js";
import { AverageAnalysis } from "./averageAnalysis.js";
import { PeakAnalysis } from "./peakAnalysis.js";
import { EnergySavingAnalysis } from "./savingAnalysis.js";
import { Device } from "./devices.js";


export class Dashboard implements Observer {
  private store = new DataStore();
  private ctx = new AnalysisContext(new AverageAnalysis());
  private last: Record<string, Measurement> = {};

  constructor(
      devices: Device[],
      private elems: {
        currentTotal: HTMLElement;
        currentTable: HTMLElement;
        histDevice: HTMLSelectElement;
        histPeriod: HTMLSelectElement;
        histTable: HTMLElement;
        analysisDevice: HTMLSelectElement;
        analysisType: HTMLSelectElement;
        analysisPeriod: HTMLSelectElement;
        analysisOutput: HTMLElement;
      }
  ) {
    // Dropdown befüllen
    devices.forEach(d => {
      const opt = `<option value="${d.id}">${d.type} (${d.id})</option>`;
      this.elems.histDevice.insertAdjacentHTML("beforeend", opt);
      this.elems.analysisDevice.insertAdjacentHTML("beforeend", opt);
    });

    // Event-Handler
    this.elems.histDevice.onchange = () => this.renderHistory();
    this.elems.histPeriod.onchange = () => this.renderHistory();
    this.elems.analysisDevice.onchange = () => this.renderAnalysis();
    this.elems.analysisType.onchange = () => {
      const v = this.elems.analysisType.value;
      if (v === "average") this.ctx.setStrategy(new AverageAnalysis());
      else if (v === "peak") this.ctx.setStrategy(new PeakAnalysis());
      else this.ctx.setStrategy(new EnergySavingAnalysis());
      this.renderAnalysis();
    };
    this.elems.analysisPeriod.onchange = () => this.renderAnalysis();
  }

  update(id: string, m: Measurement): void {
    this.store.saveMeasurement(id, m);
    this.last[id] = m;
    this.renderCurrent();
    this.renderAnalysis();
  }

  private renderCurrent() {
    const total = Object.values(this.last).reduce((s, m) => s + m.value, 0);
    this.elems.currentTotal.textContent = `Total: ${total} W`;

    const tbody = this.elems.currentTable.querySelector("tbody")!;
    tbody.innerHTML = "";
    for (const [id, m] of Object.entries(this.last)) {
      const pct = total ? ((m.value / total) * 100).toFixed(1) : "0.0";
      tbody.insertAdjacentHTML(
          "beforeend",
          `<tr><td>${id}</td><td>${m.value} W (${pct}%)</td></tr>`
      );
    }
  }

  private renderHistory() {
    const dev = this.elems.histDevice.value;
    const since = this.elems.histPeriod.value === "1h"
        ? new Date(Date.now() - 3600e3)
        : new Date(Date.now() - 24 * 3600e3);
    const data = this.store.getMeasurements(dev, since);

    const tbody = this.elems.histTable.querySelector("tbody")!;
    tbody.innerHTML = "";
    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="2">No data</td></tr>`;
    } else {
      data.forEach(m => {
        tbody.insertAdjacentHTML(
            "beforeend",
            `<tr><td>${m.timestamp.toLocaleTimeString()}</td><td>${m.value} W</td></tr>`
        );
      });
    }
  }

  private renderAnalysis() {
    const dev = this.elems.analysisDevice.value;
    const since = this.elems.analysisPeriod.value === "7d"
        ? new Date(Date.now() - 7 * 24 * 3600e3)
        : new Date(Date.now() - 24 * 3600e3);
    const data = this.store.getMeasurements(dev, since);
    this.elems.analysisOutput.textContent = this.ctx.analyze(data);
  }
}
