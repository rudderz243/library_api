## INSY Library_API Example

### Requirements
| App      | Link (Windows) |
|-----------|-----|
| Node.js | https://nodejs.org/en/download |
| Visual Studio Code | https://code.visualstudio.com/Download |
| Git | https://git-scm.com/downloads |
| Postman | https://www.postman.com/downloads/ |

### Getting Started
1. Clone down the repo.
2. Open the folder containing the files in Visual Studio Code.
3. Open a new terminal inside VS Code and run the command `npm i` to install all required packages.
4. Create a new file in the root directory called `.env`.
   - Add a variable called `API_PORT` for the port you would like the API to run on (number > 1024).
   - Add a variable called `CONN_STRING` with the MongoDB connection URI.
5. In the VS Code terminal, run `npm run dev` to launch the API using nodemon (meaning it will automatically relaunch when changes are made).

### How to Test
1. Open Postman, and create a new HTTP request.
2. Point it to the address `localhost:port/v1/test/healthcheck`
3. If you recieve a response, the API is running correctly! :)