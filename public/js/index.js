// Dans public/js/index.js
import { client } from "./client.js";
// import io from "socket.io-client";

const socket = io(); // Initialisez une connexion Socket.io

const boardsContainer = document.getElementById("boards-container");

const renderBoards = async () => {
  const boards = await client.boards.getAll();
  boardsContainer.innerHTML = ""; // Efface le contenu actuel du conteneur

  boards.forEach((board) => {
    const div = document.createElement("div");
    div.innerHTML = board.name;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
      client.boards.delete(board.name);
    });

    div.appendChild(deleteButton);
    boardsContainer.appendChild(div);
  });
};

// boards.forEach(board => {
//     const div = document.createElement("div")
//     div.innerHTML = board.name
//     document.body.appendChild(div)

//     const buttonDelete = document.createElement("button")

//     buttonDelete.innerHTML = "X"
//     buttonDelete.addEventListener("click", () => {
//         client.boards.delete(board.name)
//     })
//     div.appendChild(buttonDelete)
    
//     const buttonList = document.createElement("button")

//     buttonList.innerHTML = "Scores"
//     buttonList.addEventListener("click", async () => {
//         console.log(await client.scores.getAll(board.name))
//     })
//     div.appendChild(buttonList)

//     const buttonAddScore = document.createElement("button")

//     buttonAddScore.innerHTML = "Add score"
//     buttonAddScore.addEventListener("click", () => {
//         client.scores.create(board.name, 10, "Jean")
//     })
//     div.appendChild(buttonAddScore)
// });


renderBoards();

socket.on("databaseChange", (payload) => {
  console.log("Database change detected:", payload);
  renderBoards(); // Mettez à jour votre tableau lorsque vous détectez un changement dans la base de données
});

const buttonCreate = document.createElement("button");

buttonCreate.innerHTML = "Create new board";
buttonCreate.addEventListener("click", () => {
  client.boards.create("test2");
});
document.body.appendChild(buttonCreate);

console.log(await client.boards.getByName("test2"));





  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    try {
      console.log("test")
      const { message } = await client.auth.register(emailInput.value, passwordInput.value);
      console.log(message); // Affichez un message de succès après l'inscription
    } catch (error) {
      console.error("Registration error:", error);
      // Affichez un message d'erreur si l'inscription échoue
    }
  });
