# My Calendar App

## Overview
This project is a test task for the position of Middle/Strong Junior JavaScript/TypeScript Full-Stack Developer. The main goal of the application is to showcase my skills and demonstrate the use of required technologies listed in the test task description and the job listing.

## Features
Interactive Calendar: Displays a monthly calendar with draggable tasks.
UI Implementation: Layout was created to match the provided design sample.

### **Month Display**. 
- By default, the current month is displayed.
- Buttons <img src="./public/buttons-uppdown.jpg" alt="Buttons" width="77" height="29">   allow navigation to the next or previous months, and all displayed months have active functionality.

- Buttons for week and month views were added for layout purposes only. The default view is a 7x6 day calendar grid, corresponding to the active "month" button.

### **Task Management**:
- Inline creation and editing of tasks, with a maximum of 15 tasks per day.
- Each day card includes a counter for the number of tasks.
- Drag and drop tasks between calendar days or reorder tasks within the same day.

### **Holidays Display**:
- Fetches and shows worldwide holidays for each day using an external API.
- In this project, holiday data is fetched for Ukraine.

### **Task Filtering**:
- Includes a search field for filtering tasks. Matching tasks are displayed, while others are hidden.
- Holiday names are fixed at the top of the calendar cells and are not included in task reordering.

## Technologies Used
This project demonstrates proficiency with the following technologies and tools:

### Frontend
- React: For building the user interface.
- React Hooks – Used for state and lifecycle management.
- TypeScript: Ensures static typing for improved code reliability.
- Emotion/styled: Provides component-level styling for better modularity and reusability.
- @hello-pangea/dnd: Implements drag-and-drop functionality efficiently.
- Uuid - Used for generating unique IDs for tasks, ensuring that each task has a distinct identifier. This is particularly useful for Task Management and Drag-and-Drop Functionality.
### Testing
- Vitest: Used for writing and running unit and integration tests.
- React Testing Library: Facilitates testing of React components.Tools
### Tools
- Vite: Ensures fast development and build processes.
- ESLint & Prettier: Maintain code quality and enforce consistent style.
- Git & GitHub: Version control and project collaboration.Project Structure

## Project Structure 
```
my-calendar-app/
│
├── public/                # Contains static files such as images, icons, and the index.html file
│   ├── buttons-uppdown.jpg # Image used for the navigation buttons
│   └── sprite.svg          #
│
├── src/                   # Contains all source code files
│   ├── components/         # Reusable components for the calendar app
│   ├── styles/             # SCSS or CSS files for styling the app
│   ├── App.tsx             # Main React component
│   ├── index.tsx           # Entry point for the React app
│   └── ...
│
├── .gitignore             # Specifies files and directories Git should ignore
├── package.json           # Contains dependencies and scripts for the app
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration file
```

## Installation
1.	Clone the repository:
`git clone https://github.com/MaksymChukhrai/my-calendar-app.git .`
2.	Navigate to the project directory:
`cd my-calendar-app`
3.	Install dependencies:
`npm install`
4.	Start the development server:
`npm run dev`
5. Open the browser page at <a href="http://localhost:5173/my-calendar-app/" target="_blank">Live local page</a>

## Testing
To run the tests, use the following command: `npm run test`

## Deployment
The application is deployed and accessible at: <a href="https://maksymchukhrai.github.io/my-calendar-app/" target="_blank">My Calendar App live GH page</a>

## Contact
Feel free to reach out for any questions or feedback:
- Email: m.chukhrai.job@gmail.com
- GitHub: [MaksymChukhrai](https://github.com/MaksymChukhrai)
