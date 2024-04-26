# Code Community

Code Community is an interactive web application designed with the primary focus of creating a community-driven approach to teaching people how to write code. The bulk of the learning material available to a student utilising the application comes from a voluntary contribution system similar to that found on websites like Wikipedia. In essence, each course offered to a student by the application is made up of material that has been added and edited by the community at large.

Aside from the above, Code Community also provides a number of social features to keep users engaged with the community aspect of the application. Adding friends, private messaging, public posting, and contribution leaderboards are all additional features of the application.

## Technologies Used

- **Express:** Express is used to build the application's server-side. It provides a framework for creating and handling HTTP requests and routes.

- **Node:** Node is used as the runtime environment for the application. It allows server-side JavaScript execution and facilitates the handling of asynchronous operations.

- **Angular:** Angular is used to create the client-side of the application. It provides a robust framework for building dynamic and responsive web user interfaces that interact with the Express-based server.

- **MongoDB:** MongoDB is used as the primary database for the application. It stores all of the application's text-based data.

- **Cloudinary:** Cloudinary is used as the secondary database for the application. It stores all of the application's image-based data.

- **Firebase Auth:** Firebase Auth is used to implement user authentication in the application. It allows users to sign up, sign in, and securely access the application's features and data.

## Prerequisites

### Software Installations

Before running the application, the following software must be installed:

- [Node](https://nodejs.org/)
- [Angular Cli](https://angular.io/cli)

### Environment Variables

Before running the application, the following environment variables must be set, these variables should be stored in a `.env` file at the project root:

| **Environment Variable**          | **Description**                                     |
|-----------------------------------|-----------------------------------------------------|
| **CLOUDINARY_API_KEY**            | The API key for Cloudinary services.                |
| **CLOUDINARY_API_SECRET**         | The API secret for Cloudinary services.             |
| **CLOUDINARY_CLOUD_NAME**         | The cloud name for Cloudinary image storage.        |
| **DEV_SERVER_URL**                | The URL of the development server.                  |
| **FIREBASE_API_KEY**              | The API key for Firebase services.                  |
| **FIREBASE_APP_ID**               | The Firebase application ID.                        |
| **FIREBASE_AUTH_DOMAIN**          | The authentication domain for Firebase.             |
| **FIREBASE_MEASUREMENT_ID**       | The measurement ID for Firebase Analytics.          |
| **FIREBASE_MESSAGING_SENDER_ID**  | The sender ID for Firebase Cloud Messaging.         |
| **FIREBASE_PROJECT_ID**           | The project ID for Firebase.                        |
| **FIREBASE_STORAGE_BUCKET**       | The storage bucket for Firebase.                    |
| **MONGODB_URI**                   | The connection string for MongoDB.                  |
| **PROD_SERVER_URL**               | The URL of the production server.                   |
| **SERVER_PORT**                   | The port on which the server should listen.         |
| **WHITELISTED_CORS_URLS**         | A list of URLs allowed for Cross-Origin requests.   |

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/fiachrahealy/Code_Community.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Code_Community
    ```

3. Install the dependencies for both the server and client:

    ```bash
    npm install
    ```

4. Create the `.env` file (see prerequisites section above for file contents):

    ```bash
    cat > .env
    ```

5. Set up the client environment:

    ```bash
    npm run client-setup
    ```

6. Populate the database:

    ```bash
    npm run database-setup
    ```

7. Start the server and the client:

    To start both the server and the client:

    ```bash
    npm start
    ```

    To start the client only:

    ```bash
    npm run client
    ```

     To start the server only:

    ```bash
    npm run server
    ```

8. Access the application:

    Access the client in a web browser at http://localhost:4200.

    Access the server in a web browser or API platform at http://localhost:[SERVER_PORT].

## Features

### Registration and Authentication

When a user navigates to the web application for the first time, they are presented with a landing page prompting them to either sign in or sign up.

When a user signs up, a number of checks take place. Before the request is sent to the server, a check is carried out to ensure the username is of a minimum length and the passwords entered in both password fields match. Then, the user's email address and password are sent to Firebase to facilitate future authentication. An additional check is carried out here to ensure the email address is not already used by another user. If any of these checks fail, the form returns an error message. If all checks pass, the user's details (but not their password) are sent to the server and stored in the database. After a successful sign-up, the server automatically signs the user in.

When a user signs in, authentication is carried out client-side by Firebase Auth. If the sign-in is successful, the user is redirected to the courses page, and a Firebase session cookie is assigned to the user’s browser. If the sign-in is unsuccessful, an error message is displayed to the user. Every time the user makes a request to the server, a unique token accompanies the request. This token is used to identify the user on the server and ensure they are signed in and authorised to make such a request.

### Customisation

Code Community provides five different colour schemes to allow the user to customise their experience while using the application. The paintbrush icon in the top right of the navbar opens the colour scheme panel. The chosen colour scheme is stored using a browser cookie and is not linked to the current signed-in user. As such, changing the colour scheme is one of the few features of the application that can be used from the signed-out landing page.

### Contributing to Course Material

Upon signing in to the application, a user is presented with the course library. Here, they have the option to contribute to any course (providing they have not begun the course as a student) by selecting the course’s “edit” button. Selecting the “edit” button opens the course editor. From the Course Editor, a user can create a new lesson using the “new lesson” button, re-arrange the order of the current lessons using the “drag” button, edit the course’s title from an input box in the top right-hand corner, delete a lesson using the “trash” button, and proceed to the lesson editor using the “pen” button.

A user can also access the course’s contribution history from the Course Editor. Tracking who edits, adds, and removes content is important with an application of this nature. If a user with malicious intentions chooses to vandalise a course or lesson, the contribution tracking system can easily identify the culprit. There are nine different types of edit records, and every piece of material removed from a course or lesson remains stored in the database. As such, material removed in malice or error can be re-instated by administrators if necessary.

When a user proceeds to the lesson editor, they can add, remove, or edit that particular lesson’s chunks. There are 4 different types of lesson chunks:

- Text Chunks
- Image Chunks
- Code Chunks
- Quiz Chunks

A user can add a chunk using the “chunk toolbar” at the bottom of the lesson, delete a chunk using the “trash” button, re-arrange the order of a lesson’s chunks using the “drag” button, and edit a chunk directly from the editor.

A user can edit a text chunk’s text and font size.

A user can edit an image chunk’s image file.

A user can edit a code chunk’s code and programming language. A code chunk supports 10 different programming languages. The application uses an embedded code editor, Ace, to obtain code input and provide syntax highlighting, automatic indentation, and automatic bracket closure.

A user can edit a quiz chunk’s question, possible answers, and correct answer selection.

### Learning from Course Material 

Upon signing in to the application, a user is presented with the course library. Here, they have the option to participate in any course by selecting that course's “start” button. The “start” button will instead read “resume” if a user has already begun the course or “restart” if the user has already completed the course in its entirety. Note that a course can no longer be edited by the user if they have already started it.

Selecting any of these three buttons opens the course view. Only four lessons will be available to the user initially. As the user progresses through the course, they unlock access to the more difficult lessons and material. A user can also rate a course out of five stars from the course view area. This rating is added to others provided for this course, and the average rating is displayed.

Upon selecting a lesson, the user is shown the lesson view area. If a user attempts to complete a course without correctly answering a quiz, they are presented with an error popup. When a lesson is completed, the colour of the lesson in the course view area changes, and another lesson (if available) unlocks.

### Social Features 

Code Community aims to build a community around teaching and learning how to code. When a user navigates to the people tab, all of the community members are listed. If the user is friends with the member listed, they have the options to remove them as a friend or send them a private message. If the user has sent the member a friend request and it’s still pending, the user will see the pending icon, and if the user has not added the member, they’ll see the option to add them as a friend.

From the navigation bar at the top of the application, a user can view a list of their private message conversations by selecting the "envelope" icon and a list of their incoming friend requests by selecting the “add friend” icon. These icons flash when a new message or friend request comes in that a user hasn’t seen yet.

When a private message conversation is selected from the list or when the user clicks the envelope icon on the people list or on a specific user’s profile, the messaging chat box pops up. Messages sent in this chat are only visible to the user and the recipient.

Clicking another user’s username anywhere in the application will bring the user to that person’s profile. If friends with the profile’s user, the user will be able to see this user’s public post history, as well as options to send them a message or remove them as a friend. If they are not friends with the profile’s user, they will be prompted to send them a friend request to view their posts.

When a user navigates to the newsfeed tab, they can view all public posts made by themselves and their friends. A user can create a new post using the form at the top of the feed. These posts show up with a pen icon next to them. Automatic posts are made upon the competition of courses and lessons; these posts show up with a trophy icon next to them. Automatic posts are also generated when a user contributes to a course or lesson. These posts show up with a graduation cap next to them.

### Gamification

Code Community adds some game mechanics to the learning and contribution process to encourage user participation and healthy competition. A user can earn Learn XP (learn experience points) when they complete learning material and Edit XP (edit experience points) when they contribute to the learning material.

The XP is distributed as follows:

- Changing a course title earns the user 3 Edit XP.
- Adding a lesson to a course earns the user 5 Edit XP.
- Removing a lesson from a course earns the user 5 Edit XP.
- Re-ordering a course’s lessons earns the user 3 Edit XP.
- Adding a chunk to a lesson earns the user 5 Edit XP.
- Removing a chunk from a lesson earns the user 5 Edit XP.
- Editing a lesson’s chunk earns the user 3 Edit XP.
- Re-ordering a lesson’s chunks earns the user 3 Edit XP.
- Changing a lesson title earns the user 3 Edit XP.
- Completing a course earns the user 30 Learn XP.
- Completing a lesson earns the user 5 Learn XP.

When a user navigates to the leaderboards tab, they can view the top 10 Edit XP and Learn XP holders on the entire application.

## Authors

- [Fiachra Healy](https://www.linkedin.com/in/fiachrahealy/)

## Acknowledgments

The following is a list of 3rd party libraries and tools used in the production of Code Community:

- [Ace](https://ace.c9.io/)
- [Angular](https://angular.io/)
- [Bluebird](https://www.npmjs.com/package/mongodb-bluebird)
- [Bootstrap](https://getbootstrap.com/)
- [Cloudinary](https://cloudinary.com/)
- [ESLint](https://eslint.org/)
- [Express](https://expressjs.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Font Awesome](https://fontawesome.com/)
- [GitHub](https://github.com/)
- [Hydra](https://www.kali.org/tools/hydra/)
- [Jasmine](https://jasmine.github.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Node](https://nodejs.org/en/)
- [Passport](https://www.passportjs.org/)
- [Sass](https://sass-lang.com/)
