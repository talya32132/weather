# Weather Forecast

Simple web application that displays hourly weather forecasts based on user-selected country and city.

# Features
- Dropdown list of countries and cities.
- Fetches live weather data according to the selected location.
- Displays the next hours’ weather in tile format, including:
  - Temperature
  - Weather icon
  - Time offset (e.g., +3hrs, +6hrs)

# Technologies
- HTML
- CSS
- JavaScript
- Public weather API

# How It Works
1. The user selects a country.
2. A second dropdown loads cities belonging to that country.
3. The system fetches weather data for the selected city.
4. Weather for upcoming hours is presented in a visual grid.

# How to Run
Simply open `state.html` in any browser, or run via:

```bash
npx http-server .
