#To-Do List App
Welcome to the To-Do List application! This README.md file provides clear instructions on how to use the app and insights into its code structure.

Table of Contents
1. Registration
2. Task Creation
3. Code Structure and Key Decisions
1. Registration
Begin your journey by accessing the app through the provided Firebase hosting URL.
On the sign-in/register page, create your account by entering a distinctive display name, a valid email address, and a secure password.
Click "Sign In" or "Register" to initiate the account creation process.
2. Task Creation
Once signed in, you'll find yourself on the intuitive task manager page.
To add a new task, seamlessly click the "Add New Task" button, triggering the task creation modal.
Within the modal, furnish details such as the task title, a concise description, due date, and assignee.
Upon completion, click "Add Task" to seamlessly save it. Witness the new task seamlessly integrated into the "My Tasks" table.
3. Code Structure and Key Decisions
Let's dive into the code structure and key decisions made during the development of this To-Do List application:

3.1 Login and Register
Firebase is used for authentication, and React hook forms are employed to collect user data.
User data is dispatched to the AuthSlice using React Redux for state management.
The Firebase functions signInWithEmailAndPassword and createUserWithEmailAndPassword are used for sign-in and registration.
Display name is added using the updateProfile function after user registration.
3.2 Root Layout
Tailwind CSS is utilized for styling, and useState is employed for managing modal states.
handleSignout function in AuthSlice handles user signout by setting the logged-in user to null.
3.3 Taskbar and Add New Task
React hook forms are used for data collection in the Add New Task modal.
The createTask function is used to add a new task to the database, with error handling and success toasts.
3.4 Task Tables
Two tables are implemented: "My Tasks" and "Assigned Tasks."
Tasks are retrieved from the database using the getAllTasks function, which categorizes them into "My Tasks" and "Assigned Tasks" arrays.
The useEffect hook ensures tasks are loaded upon component mounting.
3.5 Conclusion
This To-Do List application is built with a clear structure, utilizing React, Redux, and Firebase for seamless user authentication and task management. The code structure is modular and easy to follow, making it extensible for future enhancements. Feel free to explore, contribute, and enhance the application for your own productivity needs!
