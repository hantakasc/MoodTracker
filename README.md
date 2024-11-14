# Mood Tracker App

## 📝 Project Description

The Mood Tracker App is a user-friendly tool designed to help users log their emotions, reflect on their mental health over time, and gain insights through visualizations and mindfulness exercises. This app promotes mental health awareness by encouraging daily emotional check-ins and providing helpful quotes for mindfulness.

## 🌟 Features

- Mood Logging: Users can select their mood, add notes, and track emotions over time.
- Mood History: View a history of logged moods with dates and notes.
- Mindfulness Quotes: Daily inspirational quotes fetched from an external API.
- User Authentication: Secure login and signup using Auth0.
- Accessibility: Designed with accessible color schemes and keyboard navigation.
- Testing: Comprehensive unit and integration tests using Jest and React Testing Library.

## 🚀 Technologies Used

- Frontend: React, React Router, CSS
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: Auth0
- Deployment: Render (for both frontend and backend)
- Testing: Jest, React Testing Library
- External API: Mindfulness Quotes API (RapidAPI)

## 🛠️ Installation and Setup

Prerequisites

- Node.js and npm
-  PostgreSQL
-    Git

Clone the Repository

git clone https://github.com/hantakasc/MoodTracker.git
cd MoodTracker

### Backend Setup

    1.    Navigate to the server folder:

```cd server```


    2.    Install dependencies:

```npm install```


    3.    Set up the .env file:

DATABASE_URI=your_database_uri
RAPIDAPI_KEY=your_rapidapi_key


    4.    Start the server:

```npm start```



### Frontend Setup

    1.    Navigate to the client folder:

```cd ../client```


    2.    Install dependencies:

```npm install```


    3.    Set up the .env file:
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
REACT_APP_API_URL=your_backend_url


    4.    Start the React app:

```npm start```

## 📊 Testing

Run tests to ensure the components function as expected:

```npm test```

- Tests for MoodLogger and MoodHistory demonstrate unit and integration tests.


## 🛡️ Accessibility

This app follows accessibility best practices:
- High contrast colors for readability.
- Keyboard navigability.
- Accessible forms and buttons.

## 🧪 Testing Highlights

- MoodLogger:
- Tests for mood submission and validation.
- MoodHistory:
- Tests for rendering moods and handling delete/edit functionality.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue to discuss what you’d like to change.

## 📧 Contact

For questions or feedback, please reach out to hantakasc@gmail.com
