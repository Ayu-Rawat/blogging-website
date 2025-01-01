# Appwrite Authentication and Post Management System

This project is a React-based application that integrates Appwrite for user authentication and post management. It allows users to sign up, log in, create, edit, and manage posts. The application uses Redux for state management and follows a modular structure for scalability and maintainability.

---

## Features

### Authentication
- User Sign-Up with email and password.
- User Login with session management.
- Logout functionality.

### Post Management
- Create posts with a title, slug, content, featured image, and status.
- Edit existing posts.
- Preview uploaded featured images.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **React Router**: For navigation.
- **Redux Toolkit**: For state management.
- **React Hook Form**: For form validation and handling.
- **Tailwind CSS**: For styling.

### Backend
- **Appwrite**: For authentication, database, and file storage.

---

## Prerequisites

1. **Node.js** (>= 14.x)
2. **Appwrite Server**
   - Set up an Appwrite instance.
   - Create a project and configure the following:
     - Authentication (Email/Password enabled).
     - Database for posts.
     - File storage for featured images.
3. **React App**
   - Install dependencies using `npm install`.

---

## Getting Started

### 1. Clone the Repository
```bash
$ git clone https://github.com/your-username/blogging-website.git
$ cd blogging-website
```

### 2. Install Dependencies
```bash
$ npm install
```

### 3. Configure Appwrite
 Update the Appwrite configuration in `src/appwrite/conf.js`:
  ```javascript
  const conf = {
      //yours api keys and ids
  };

  export default conf;
  ```

### 4. Run the Application
```bash
$ npm start
```
---

## Key Files and Functions

### `auth.js`
Handles Appwrite authentication tasks such as:
- Creating user accounts.
- Logging in users.
- Fetching the current user.
- Logging out users.

### `PostForm.js`
Manages post creation and editing, including:
- File uploads for featured images.
- Slug generation based on the title.
- Form validation using React Hook Form.

---

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

---


## Acknowledgments

- [Appwrite Documentation](https://appwrite.io/docs) for excellent resources.
- [React Hook Form](https://react-hook-form.com/) for seamless form handling.
- [Tailwind CSS](https://tailwindcss.com/) for styling simplicity.
