# WeatherApp Frontend

This is the frontend for the WeatherApp, a weather analytics web application that provides real-time weather data visualization, user authentication, and role-based access control. It is built using React and Redux, integrating a public weather API and Google OAuth for secure authentication.

## Features

- **User Authentication**: Secure login using Google OAuth.
- **Weather Data Visualization**: Real-time weather updates displayed with bar charts and line graphs.
- **Role-Based Access Control**: Users have different access levels based on their roles.
- **Responsive UI**: Built with React and Bootstrap for a seamless user experience.

---

## Tech Stack

- **Frontend:** React, Redux, Bootstrap
- **Authentication:** Google OAuth
- **State Management:** Redux
- **Data Visualization:** Chart.js
- **API Integration:** Public Weather API

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (Download from [Node.js official website](https://nodejs.org/en/))
- **npm** (comes with Node.js) or **Yarn** (optional) ([Download Yarn](https://yarnpkg.com/))

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rahulxqmoz/weather_frontend.git
cd weather_frontend
```

### 2. Install Dependencies

```bash
npm install  # or yarn install
```

### 3. Create a .env File

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
REACT_APP_WEATHER_API_KEY=<your_weather_api_key>
REACT_APP_GOOGLE_CLIENT_ID=<your_google_client_id>
REACT_APP_BACKEND_URL=http://localhost:8000  # URL of the backend
```

Replace `<your_weather_api_key>` and `<your_google_client_id>` with actual credentials.

### 4. Start the Development Server

```bash
npm start  # or yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Backend Setup

To fully utilize the application, ensure the backend is running locally. Follow the setup guide in the [WeatherApp Backend Repository](https://github.com/rahulxqmoz/weatherapp_backend.git).

---

## Notes

- Ensure the backend is running at `http://localhost:8000` before testing API interactions.
- Keep your `.env` file private and never push it to a public repository.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

