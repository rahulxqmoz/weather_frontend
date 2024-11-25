# Weather Application

This project consists of a React frontend and a backend deployed on Heroku. Follow the instructions below to set up the application locally and access the deployed version.

## Deployed Version

- **Frontend (Vercel)**: [https://weather-frontend-green.vercel.app/](https://weather-frontend-green.vercel.app/)
- **Backend (Heroku)**: [https://weather-appxqmoz-b8bc0ab20be7.herokuapp.com](https://weather-appxqmoz-b8bc0ab20be7.herokuapp.com)

## Frontend Setup

### Prerequisites

Ensure the following are installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/en/)
- **npm** (comes with Node.js) or **Yarn**: [Download Yarn](https://yarnpkg.com/)

### Installation Steps

1. **Clone the Frontend Repository**:

   ```bash
   git clone https://github.com/rahulxqmoz/weather_frontend.git
   cd weather_frontend
Install Dependencies:

Run the following command to install all required npm packages:


npm install
Run the Application:

Start the development server:


npm start
The application will be available at http://localhost:3000.

Backend Setup
Repository
The backend code is available here: Backend Repository

Prerequisites
Ensure the following are installed:

Python 3.8+
pip (Python package installer)
Installation Steps
Clone the Backend Repository:


git clone https://github.com/rahulxqmoz/weatherapp_backend.git
cd weatherapp_backend
Install Dependencies:

Install the required Python packages by running:


pip install -r requirements.txt
Configure the .env File:

If the project requires any environment variables (e.g., for API keys), create a .env file in the root of the project with the necessary variables. Example:


WEATHER_API_KEY=<your_weather_api_key>
GOOGLE_CLIENT_ID=<your_google_client_id>
Run the Application Locally:

Run the development server:


python manage.py runserver
The backend will be accessible at http://127.0.0.1:8000.

Important Notes
Backend API Integration
Ensure that the backend is either running locally or accessible via the Heroku-deployed URL:

Base API URL: https://weather-appxqmoz-b8bc0ab20be7.herokuapp.com
Source Code Links
Frontend Repository: https://github.com/rahulxqmoz/weather_frontend.git
Backend Repository: https://github.com/rahulxqmoz/weatherapp_backend.git
License
This project is licensed under the MIT License - see the LICENSE file for details.


  
