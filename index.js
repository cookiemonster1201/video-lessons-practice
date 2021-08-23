const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

//this line is required to parse the request body
app.use(express.json());
app.use(cors());

/* Create - POST method */
app.post("/user/add", (request, response) => {
  const existingUsers = getUserData();
  const userData = request.body;

  existingUsers.push(userData);
  saveUserData(existingUsers);

  response.send({
    success: true,
    message: `${userData.fullname} data added successfully`,
  });
});

/* Read - GET method */
app.get("/user/list", (request, response) => {
  const users = getUserData();
  response.send(users);
});

/* Update - PUT method */
app.put("/user/update/:username", (request, response) => {
  const userName = request.params.username;
  const userData = request.body;
  const existingUsers = getUserData();
  const updatedUsers = existingUsers.map((user) => {
    if (userName === user.username) {
      return userData;
    }
    return user;
  });

  saveUserData(updatedUsers);

  response.send({
    success: true,
    msg: `${userData.fullname} data updated successfully`,
  });
});
/* Delete - DELETE method */
app.delete("/user/delete/:username", (request, response) => {
  const userName = request.params.username;
  const existingUsers = getUserData();
  const filteredUsers = existingUsers.filter(
    (user) => user.username !== userName
  );

  saveUserData(filteredUsers);
  response.send({
    success: true,
    msg: `${userName} removed successfully`,
  });
});
// util functions
/* --> 1) read the user data from json file */
const saveUserData = (data) => {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("users.json", stringifiedData);
};

/* --> 2) get the user data from json file */
const getUserData = () => {
  const jsonData = fs.readFileSync("users.json");
  return JSON.parse(jsonData);
};
// util functions end

/* configure the server port */
app.listen(3000, () => {
  console.log("Server runs on port 3000 ");
});
