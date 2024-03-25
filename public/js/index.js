import { client } from "./client.js";

const boards = await client.boards.getAll()

boards.forEach(board => {
    const div = document.createElement("div")
    div.innerHTML = board.name
    document.body.appendChild(div)

    const buttonDelete = document.createElement("button")

    buttonDelete.innerHTML = "X"
    buttonDelete.addEventListener("click", () => {
        client.boards.delete(board.name)
    })
    div.appendChild(buttonDelete)
    
    const buttonList = document.createElement("button")

    buttonList.innerHTML = "Scores"
    buttonList.addEventListener("click", async () => {
        console.log(await client.scores.getAll(board.name))
    })
    div.appendChild(buttonList)

    const buttonAddScore = document.createElement("button")

    buttonAddScore.innerHTML = "Add score"
    buttonAddScore.addEventListener("click", () => {
        client.scores.create(board.name, 10, "Jean")
    })
    div.appendChild(buttonAddScore)
});

const buttonCreate = document.createElement("button")

buttonCreate.innerHTML = "Create new board"
buttonCreate.addEventListener("click", () => {
    client.boards.create("test2")
})
document.body.appendChild(buttonCreate)

console.log(await client.boards.getByName("test2"))