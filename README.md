# PixHub: Cloud-based User Friendly Image Gallery

PixHub is a microservices-based web application designed to provide users with an intuitive and efficient platform for managing and viewing their image collections. Built with scalability and user experience in mind, PixHub leverages various microservices to handle different aspects of the application.

## Microservices Overview

1. **User Management:**

   - Responsible for user authentication, including login and registration functionalities.

2. **Photos Management:**

   - Handles image upload, deletion, and display functionalities.

3. **Storage Management:**

   - Monitors and manages user storage, providing 100 MB of free storage for each user.

4. **Usage Management:**

   - Monitors network usage, enforcing a limit of 150 MB per day for each user.

5. **Query Handling:**

   - Listens to queries from the frontend and caches user information for fast data retrieval.

6. **Event Handler:**

   - Connects all microservices according to their relations, ensuring smooth communication between components.

7. **Frontend (View):**
   - Provides the user interface for interacting with the application, allowing users to view, upload, and delete their photos. Built with React.js, Redux Toolkit, and styled with Material-UI and CSS modules.

## Technologies Used

- **Frontend:**

  - React.js
  - Redux Toolkit
  - Material-UI
  - CSS Modules
  - Lucide-react

- **Backend:**
  - Express.js
  - Mongodb
  - bcrypt
  - Mongoose
  - Jsonwebtoken
  - Cloudinary
  - express-fileupload
