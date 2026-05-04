# Jyotish-Vedic Astrology App

A comprehensive, interactive web-based Vedic Astrology (Jyotish) application. This tool calculates precise planetary positions, generates astrological charts, and provides detailed predictions—all running directly in the browser.

## 🚀 Features

* **Precise Astrological Calculations**: Computes exact planetary positions, ephemeris data, and Ayanamsa using the `astronomy-engine`.
* **Divisional Charts**: Generates and renders various Vedic divisional charts (Vargas).
* **Detailed Interpretations**:
  * Ascendant and Nakshatra readings.
  * Dasha (planetary periods) calculations.
  * Yoga and Dosha detection.
  * Broad life predictions.
* **Panchang & Ashtakavarga**: Advanced Vedic metrics integrated out of the box.
* **Geocoding Support**: Automatically resolves birth coordinate locations seamlessly.
* **PDF Export**: Allows users to download their comprehensive astrological reports and charts natively.

## 🛠️ Technology Stack

* **Frontend Framework**: Vanilla JavaScript, HTML5, CSS3 
* **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast bundling and HMR.
* **Key Libraries**:
  * [`astronomy-engine`](https://github.com/cosinekitty/astronomy): Used for core astronomical and planetary computations.
  * [`jspdf`](https://github.com/parallax/jsPDF): Used to export generated reports to PDF.
* **Hosting/Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting).

## 🏛️ Architecture & Project Structure

The project follows a modular, client-heavy architecture, shifting the complex astrological calculations from a traditional backend to the client's device using JavaScript.

```text
├── index.html                  # Main entry point and UI layout
├── public/                     # Static assets
└── src/
    ├── main.js                 # App initialization and event handling
    ├── assets/                 # Local assets (images, fonts)
    ├── charts/
    │   └── chartRenderer.js    # Logic for rendering Kundli/Vedic grids
    ├── core/                   # The computational heart of the app
    │   ├── ashtakavarga.js     # Ashtakavarga point calculations
    │   ├── ayanamsa.js         # Precession of equinoxes logic
    │   ├── dashas.js           # Vimshottari Dasha calculations
    │   ├── divisionalCharts.js # Varga chart generators
    │   ├── doshas.js           # Kuja Dosha, Kalsarpa Dosha checks
    │   ├── ephemeris.js        # Core astronomical data processing
    │   ├── panchang.js         # Tithi, Karana, Nitya Yoga logic
    │   ├── planets.js          # Planetary state and dignity mapping
    │   ├── predictions.js      # General predictive logic
    │   ├── yogas.js            # Detection tools for planetary combinations
    │   └── interpretations/    # Human-readable text for chart data
    ├── styles/
    │   └── index.css           # UI Styling
    └── utils/
        ├── geocoding.js        # API integration for location searches
        ├── icons.js            # SVG/Icon management
        └── pdfExport.js        # Logic for converting HTML/Canvas to PDF
```

## 🔄 Application Workflow & Data Flow

1. **User Input Phase**: The user enters their birth details (Date, Time, Location).
2. **Geocoding**: `src/utils/geocoding.js` captures the location text and securely interfaces with a Geocoding API to retrieve exact Latitude and Longitude coordinates.
3. **Astronomical Computation**: `src/core/ephemeris.js` and `astronomy-engine` use the precise time and coordinates to calculate exact planetary degrees, retrograde status, and the Lagna (Ascendant).
4. **Astrological Processing**:
    * `ayanamsa.js` applies the configured Vedic sidereal zodiac subtraction.
    * `divisionalCharts.js` distributes planets into various grid matrices.
    * `dashas.js`, `yogas.js`, and `doshas.js` detect time periods and special planetary alignments.
5. **Rendering Phase**:
    * `src/charts/chartRenderer.js` maps the processed arrays into visual SVG or Canvas-based Vedic chart diagrams.
    * The DOM is updated with detailed interpretations derived from `src/core/interpretations/`.
6. **Export Phase (Optional)**: Via `src/utils/pdfExport.js`, the generated DOM views and charts are captured, encoded, and downloaded as a formatted `.pdf` document for the user.

## 🔌 Frontend to Backend Connections

This application relies on a **Serverless / Client-Side Architecture**. 
* **Backend processing**: There is no custom backend server required for this application to run. All intense computational heavy lifting (Astrophysical math) runs in the user's browser.
* **External APIs**: 
  * Location parsing connects outward to Geocoding APIs (via HTTP requests in `geocoding.js`).
* **Deployment Architecture**: The application is securely hosted as a statically generated site on **Google Firebase Hosting**. When a user visits the site, Firebase serves the optimized HTML/JS/CSS bundle produced by Vite.

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. To build for production before deployment:
   ```bash
   npm run build
   ```