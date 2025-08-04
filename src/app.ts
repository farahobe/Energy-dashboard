
import { Fridge, Heater, Washer } from "./devices.js";
import { Dashboard } from "./dashboard.js";



window.addEventListener("DOMContentLoaded", () => {
  const elems = {
    currentTotal: document.getElementById("current-total")!,
    currentTable: document.getElementById("current-table")!,
    histDevice: document.getElementById("hist-device") as HTMLSelectElement,
    histPeriod: document.getElementById("hist-period") as HTMLSelectElement,
    histTable: document.getElementById("hist-table")!,
    analysisDevice: document.getElementById("analysis-device") as HTMLSelectElement,
    analysisType: document.getElementById("analysis-type") as HTMLSelectElement,
    analysisPeriod: document.getElementById("analysis-period") as HTMLSelectElement,
    analysisOutput: document.getElementById("analysis-output")!
  };

  // Initialisiere drei simulierte Geräte
  const devices = [
    new Fridge("F1"),
    new Heater("H1"),
    new Washer("W1")
  ];

  // Initialisiere das Dashboard mit Geräten und UI-Elementen
  const dash = new Dashboard(devices, elems);

  // Dashboard als Observer an Geräte anhängen
  devices.forEach(device => device.attach(dash));

  // Starte Messung und automatische Simulation
  devices.forEach(device => {
    device.generateMeasurement(); // Erste Messung sofort
    setInterval(() => device.generateMeasurement(), 5000); // Alle 5 Sekunden neue Messung
  });
});
