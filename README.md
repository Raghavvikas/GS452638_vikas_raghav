# Synergy - Data Viewer App

## Project Overview
Synergy is a data visualization application that allows users to view and analyze Gross Margin data across multiple stores. It provides interactive charts and tables for better insights into sales and profitability.

---

## How to Run and Test the Project

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn installed

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/synergy.git
   cd synergy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The app should now be running on `http://localhost:3000/`

### Running Tests
- To run unit tests:
  ```bash
  npm test
  ```
- To run integration tests:
  ```bash
  npm run test:integration
  ```

---

## Features Implemented
### ✅ Dynamic Chart Rendering
- Users can select a store, and the chart dynamically updates to show Gross Margin Dollars and GM% over weeks.
- Implemented with `recharts` to provide a dual-axis bar chart.
- Handles missing store data by generating mock data for consistency.

### ✅ Redux State Management
- Utilized Redux slices (`storeSlice.ts`, `skuSlice.ts`, `planningSlice.ts`) to manage application state efficiently.
- Ensured store selection propagates to the chart and updates values accordingly.

### ✅ Responsive UI with Bootstrap
- Sidebar, Navbar, and page layouts are styled using Bootstrap.
- The Chart page has a dark-themed background for enhanced readability.

### ✅ Excel Data Processing
- Implemented `useExcelData.ts` to process and extract store & SKU data from `.xlsx` files.

These features demonstrate my proficiency in handling state management, UI responsiveness, and integrating external libraries effectively.

---

## What I Would Improve with 4 More Hours
1. **Enhance Data Processing Logic**
   - Refactor `useExcelData.ts` to handle larger datasets efficiently.
   - Optimize data fetching and memoization to reduce unnecessary re-renders.

2. **Improve Chart UI/UX**
   - Add tooltips and data labels for better readability.
   - Improve the color scheme to make GM% more distinguishable.

3. **Add API Integration**
   - Implement an Express.js backend to fetch real-time data instead of mock data.
   - Store data in PostgreSQL to ensure persistence.

4. **Write More Tests**
   - Increase test coverage for Redux slices and utility functions.
   - Implement E2E tests using Cypress for UI validation.

---

## Feedback on the Challenge (Optional)
- The challenge was well-structured and covered key aspects of a real-world React-Redux project.
- It would be great to have more clarification on the expected data format for charts.

---

### Author: Vikas Raghav
### Contact: vickyraghav89@gmail.com

