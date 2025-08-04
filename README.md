# ⚡ Energy Management Dashboard

This project is a real-time, browser-based dashboard for monitoring and analyzing the energy consumption of simulated smart devices. It is built with TypeScript and demonstrates the use of key software design patterns to create a modular and extensible application.

---

## ⭐ Features

- **Real-time Monitoring:** See the current energy consumption of all connected devices and the total usage at a glance.
- **Historical Data Analysis:** View past energy measurements for individual devices or all devices combined over different time periods (Last Hour, Last 24 Hours).
- **Dynamic Energy Analysis:** Switch between different analysis modes to gain insights:
  - **Average Consumption:** Calculate the average energy usage.
  - **Peak Consumption:** Identify the highest energy consumption spikes.
  - **Savings Potential:** Analyze the potential for energy savings.
- **Observer Pattern:** The dashboard acts as an "observer," automatically updating whenever a device "notifies" it of a new measurement.
- **Strategy Pattern:** The analysis section uses different "strategies" (e.g., for calculating average vs. peak usage) that can be swapped out dynamically without changing the main application logic.

---

## 🛠️ Technologies & Architecture

The project is built entirely with TypeScript and runs in the browser. It is structured to be modular and easy to extend.

- **Language:** TypeScript
- **Build Tool:** tsc (TypeScript Compiler)
- **Development Server:** live-server

**Architecture:**
- **Observer Pattern:** Decouples the devices (subjects) from the dashboard (observer). Devices generate data without needing to know how it will be displayed.
- **Strategy Pattern:** Allows the analysis algorithms to be selected and changed at runtime, making it easy to add new analysis types in the future.

---

## 🚀 Getting Started

To run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)

### 1. Clone or Download the Project

First, get the project files onto your computer.

```bash
git clone https://github.com/farahobe/Energy-dashboard.git
cd Energy-dashboard
```

### 2. Install Dependencies

Open your terminal in the root folder of the project and run:

```bash
npm install
```

This will install the necessary development tools (typescript and live-server).

### 3. Build and Start the Application

The project includes a simple start script that compiles the TypeScript code and launches a local web server.

Run this command in your terminal:

```bash
npm start
```

This will:

- Compile all `.ts` files from the `/src` directory into JavaScript `.js` files in the `/dist` directory.
- Start live-server, which automatically opens the `index.html` file in your default web browser.

The dashboard is now running, and you will see the simulated devices generating new data every 5 seconds.

---

## 📂 Project Structure

- `/src` – TypeScript source code
- `/dist` – Compiled JavaScript output
- `/public` – Static files (HTML, CSS, assets)

---

## 💡 Notes

- This project is for educational and demonstration purposes.
- Feel free to extend the dashboard with new device types or analysis strategies!
