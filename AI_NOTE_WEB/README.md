# AI_EXAM_NOTE

AI_EXAM_NOTE is a MERN stack based web application designed to help students create well-structured and exam-focused study notes with the help of AI.

The main purpose of the application is to make exam preparation more organized and efficient. Students can generate structured notes on a topic, use quick-revision content for last-minute preparation, and include visual explanations such as diagrams and pie charts where required. Generated notes can also be downloaded as PDF files for offline use.

The application also provides a credit-based system where users can top up their credits through online payment, create new notes whenever required, and access their previously generated notes from their history. The project focuses on combining AI-assisted note generation with a simple and practical user experience.

> **Important Note:**
> This project is currently deployed using Render's free-tier hosting. Because of the limitations of the free hosting environment, the application may take some additional time to load when it has not been accessed for a while. In some cases, the backend service may enter an idle/sleep state and require some time to become active again when a new request is made. So, the first request or initial page load may occasionally be slower than usual.

---

## Features

### AI-Powered Note Generation

Students can generate structured and exam-oriented notes based on the topic or subject they provide. The generated content is organized in a way that makes it easier to understand and revise.

### Quick Revision

The application provides concise revision-oriented content so students can quickly review important points before an exam without going through lengthy notes.

### Diagrams and Visual Explanations

The application supports diagrams using Mermaid, making it possible to represent concepts visually whenever a diagram can improve understanding.

### Pie Charts

Pie charts can be generated and displayed using Recharts to provide a visual representation of suitable data or concepts.

### PDF Download

Students can download their generated notes as PDF files for offline study, printing, or future reference.

### Notes History

Previously generated notes are stored and can be accessed later. Users can view their old notes instead of creating the same content again.

### Create New Notes

Users can create new notes whenever they want and keep multiple generated notes available in their account.

### Credit-Based System

The application uses a credit system for AI-powered functionality. Users can top up their credits through the available payment option and continue using the note-generation features.

### Authentication

User authentication is implemented using Firebase, with secure application-level authentication and authorization using JWT where required.

### Online Payment

Stripe is integrated to handle credit top-up payments securely.

### Responsive User Interface

The frontend is designed using React and Tailwind CSS with a responsive layout so that the application can be used across different screen sizes.

---

## Technologies Used

### Frontend

* React.js
* React Router DOM
* Redux Toolkit
* Tailwind CSS
* Axios
* React Icons
* Motion
* Recharts
* Mermaid

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* REST APIs

### AI & Integrations

* Google Generative AI (Gemini)
* Firebase Authentication
* Stripe
* PDFKit

### Development Tools

* Git
* GitHub
* Visual Studio Code
* Code0

---

## Application Architecture

The project follows a standard MERN stack architecture where the frontend and backend are maintained separately.

The **React.js frontend** is responsible for the user interface, routing, state management, API communication, authentication-related interactions, note generation screens, note history, payment flow, and visualization of diagrams and charts.

The **Node.js and Express.js backend** handles REST API requests, authentication-related operations, business logic, database operations, credit management, PDF generation, payment integration, and communication with external services.

**MongoDB** is used as the primary database for storing application data.

The frontend communicates with the backend through REST APIs using Axios.

---

## Project Setup and Installation

### Prerequisites

Before running the project locally, make sure the following are installed and configured:

* Node.js
* npm
* MongoDB or MongoDB Atlas
* Git
* A Firebase project
* Google Generative AI / Gemini API access
* Stripe account and API credentials

---

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd AI_EXAM_NOTE
```

---

### 2. Install Frontend Dependencies

Move into the frontend/client directory:

```bash
cd client
```

Install the required dependencies:

```bash
npm install
```

Create the required frontend environment configuration and add the necessary values for services such as Firebase and other frontend-side integrations.

---

### 3. Install Backend Dependencies

Open another terminal or move to the server directory:

```bash
cd ../server
```

Install backend dependencies:

```bash
npm install
```

Create the required backend environment configuration and add the required credentials for:

* MongoDB
* JWT
* Google Generative AI
* Stripe
* Other backend services used by the application

> **Note:** Environment variables should be kept inside `.env` files and should never be committed to GitHub.

---

### 4. Run the Backend

From the server directory, run the backend using the script configured in the project's `package.json`.

For example:

```bash
npm run dev
```

The Express server will start and handle API requests from the frontend.

---

### 5. Run the Frontend

Open another terminal and move to the client directory:

```bash
cd client
```

Run the frontend using the configured development script:

```bash
npm run dev
```

The React application will then be available through the local development URL provided by the frontend development server.

---

## How the Application Works

A typical user flow in AI_EXAM_NOTE is:

1. The user opens the application and signs in or creates an account.
2. The user selects or enters the topic for which notes are required.
3. The frontend sends the request to the backend through a REST API.
4. The backend processes the request and communicates with the Google Generative AI service.
5. The generated content is structured into useful exam notes.
6. Appropriate visual elements such as diagrams or charts can be displayed along with the notes.
7. The generated note can be saved and accessed later from the user's notes history.
8. The user can download the generated note as a PDF.
9. When additional credits are required, the user can top up credits through the Stripe payment flow.
10. The application updates the user's available credits and allows further usage of the AI-powered functionality.

---

## AI Development Experience

I used **Code0** as the AI development tool during the development of this project.

I used Code0 selectively throughout the development process as a development assistant rather than relying on it to build the complete application automatically. It was mainly used for specific implementation tasks, debugging, integration support, and testing-related assistance.

A major part of the development and understanding of the project was done manually. I reviewed the generated suggestions, integrated the required changes into the existing application, tested the functionality, and fixed issues based on the actual project requirements.

The AI tool was used mainly in the following areas:

### 1. Firebase Authentication Setup

Code0 was used to assist with setting up Firebase authentication for the login and signup functionality.

It helped with implementation guidance and resolving configuration-related issues while integrating authentication into the application.

### 2. Google Generative AI Integration

Code0 was also used while integrating Google Generative AI into the application for AI-powered note generation.

The AI tool helped with implementation details and API-related development so that the frontend and backend could communicate correctly with the AI service.

### 3. API Development

Code0 was used in selected backend development tasks, including creating some APIs, middleware, and a few controller-level implementations.

It was used as an assistant during development rather than generating the complete backend architecture. The implementation was reviewed and adjusted according to the requirements of the project.

### 4. PDF Generation and Stripe Payment Integration

Code0 was used while creating the PDF generation API using **PDFKit** and while integrating **Stripe** for the credit top-up/payment functionality.

The AI assistance was mainly useful for understanding integration steps, handling implementation details, and resolving issues during development.

### 5. Debugging and Testing

Code0 was also used for debugging selected errors and assisting during testing.

When an issue occurred, I used the tool to understand possible causes and solutions, then tested the suggested changes in the actual application and modified the implementation wherever necessary.

---

## AI Usage Approach

I used AI as a development assistant, not as a replacement for understanding the codebase.

The application was developed by combining my own implementation with selective AI assistance for specific tasks. Any AI-generated suggestions were reviewed, tested, modified when necessary, and integrated according to the actual requirements of the project.

This approach helped me speed up certain development tasks while still maintaining an understanding of how the application, APIs, authentication, database operations, payments, and integrations work.

---

## GitHub Submission

The project is maintained in a public GitHub repository with the frontend and backend source code organized separately.

The repository contains:

* Frontend source code
* Backend source code
* API implementation
* Database-related logic
* Authentication implementation
* Payment integration
* AI integration
* PDF generation functionality
* Project documentation

---

## Deployment

The application has been deployed using **Render**.

The frontend/client and backend/server are hosted as separate services, allowing the application to run as a complete MERN stack web application.

### Live Application

**Live Demo:** `<Add your Render live URL here>`

### GitHub Repository

**GitHub:** `<Add your public GitHub repository URL here>`

---

## Future Improvements

Some possible improvements for future versions of AI_EXAM_NOTE include:

* More advanced note customization options
* Additional visualization types
* Improved PDF formatting
* More detailed revision modes
* Better credit and usage analytics
* Additional payment options
* Improved performance and production hosting
* More comprehensive automated testing

---

## Conclusion

AI_EXAM_NOTE was built as a practical MERN stack application focused on solving a real student-oriented problem: making exam preparation more structured, faster, and easier to manage.

The project gave me hands-on experience with React.js, Node.js, Express.js, MongoDB, REST API development, authentication, AI integration, payment processing, PDF generation, state management, and deployment.

It also gave me practical experience in using AI-assisted development tools while understanding, reviewing, testing, and debugging the resulting implementation myself.
