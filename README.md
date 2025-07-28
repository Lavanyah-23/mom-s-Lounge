# Mama's Lounge

This is a web Application for Mamas who wants to post stories about them and their kids

### Used technologies and concepts

#### Frontend
- React
- Redux
- Axios
- CSS

#### Backend
- Node.js
- Express REST API
- JWT & Bcrypt Authentication
- PostgreSQL database
- Sequelize ORM

### Backend Setup

1. Clone the repository and install dependencies:
   ```sh
   git clone <your-repo-url>
   cd moms-lounge-server
   npm install
   ```
2. Configure your database connection in `config/config.json` (the project uses PostgreSQL and supports SSL for Neon/Postgres).
3. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```
4. (Optional) Seed the database:
   ```sh
   npx sequelize-cli db:seed:all
   ```
5. Start the backend server:
   ```sh
   npm start
   ```

### API Testing

You can test the API endpoints using the sample request scripts in the `sampleRequests/` directory:

- To test signup:
  ```sh
  node sampleRequests/signup.js
  ```
- To test login:
  ```sh
  node sampleRequests/login.js
  ```
- To test authenticated endpoints, use the token returned from login in your requests.

You can also use tools like Postman or HTTPie to interact with the API directly.

### Goals for this project

- demonstrate the main skills I've learned at the Codaisseur Academy. 
- build a full-stack web app from a first idea into a working version within a two-week sprint
- practice planning with user-stories, wireframes, datamodels, a kanban projectboard and git version control
- extend my coding knowledge and try out new technologies. I chose to use this opportunity to learn upload images from local system 

### User stories

- As a user I can sign up to make an account and login.
- As a user I can be able to view all Stories
  - I can view all stories
  - I can update my story if i am an authenticated User
 - As a user I can be able to add a new story
   - I can give title to my story
   - I can add Image
   - I can add Description about my story

### Project Board

See the [Github projects kanban board](https://github.com/Lavanyah-23/moms-Lounge-client)

### Wireframe

See the [original wireframes at figma.com](https://www.figma.com/file/5xompwRJmXgvS2TBPkbuLj/MamaMia?node-id=0%3A1)
These are the wireframes I made at the beginning of the project. I stuck with them for the most part


### Datamodel

See the [database model at dbdiagram.io](https://lucid.app/lucidchart/fafc1710-552e-4261-b01d-b0832b1dfba9/edit?invitationId=inv_f352a55e-66f9-41e6-a153-c99d7d7c5eb4)

### Backend server repo
- See [this repository](<your-repo-url>)

### Plans to extend the project

On my project board I have added a list of features I have in mind to add to the project. Many of these features were already considered in the design of the project but I did not have time to add everything within two weeks. For example adding categories filter to view story and adding marketplace for mamas to buy an sell products

I believe the concept of the app provides a basis for a lot of potentially fun features, which I hope to add some day when I have the time.

