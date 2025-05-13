
# TaskList

TaskList is a clean and secure task manager with Google login where Guests can view task listings and Admins perform CRUD operations on it.
-
Kindly use the Admin password as "**Admin@123**" if you **login as an Admin**.
- Live Link of the App: https://task-list-five-beta.vercel.app
- Backend is deployed on render: https://tasklist-4.onrender.com




## Features

- ✨ **Google OAuth Login** – Secure and quick sign-in using Google.
- 👥 **Role-Based Access** – Admin and Guest roles with different permissions.
- 📝 **CRUD for Admins** – Admins can Create, Read, Update, and Delete tasks.

-  👁️ **Read-Only for Guests** – Guests can only view task listings.

-  💡 **Modern UI** – Clean, responsive, and user-friendly interface.

-  🌐 **Deployed on Vercel** – Live and accessible anywhere.


## Tech Stack

- **Frontend**: React, Bootstrap, Axios

- **Backend**: Node.js, Express

- **Database**: MongoDB

- **Auth**: Google OAuth with Passport.js

- **Hosting**: Vercel (Frontend), Render (Backend + DB)


## Run Locally

### Backend Setup:

Clone the project

```bash
    git clone https://github.com/ByteBreez/tasklist-backend.git
    git clone https://github.com/ByteBreez/tasklist-frontend.git

```

Go to the project directory

```bash
    cd tasklist-backend
    npm install
```

Create a .env file in the backend folder:
```bash
    MONGO_URI=your_local_or_cloud_mongodb_url
    CLIENT_URL=http://localhost:3000
    SESSION_SECRET=your_secret_key
```

Install dependencies

```bash
  npm install
```

Run the server:

```bash
  nodemon index.js
```

### frontend Setup

Go to the project directory:

```bash
    cd tasklist-frontend
    npm install
```

Run the frontend:
```bash
    npm run dev
```
