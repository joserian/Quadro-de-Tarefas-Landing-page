//constante que guardará todos os botões de "+" em um array
const addTaskBtn = document.querySelectorAll(".add-task"); 
const removeTaskBtn = document.querySelectorAll(".remove-card");
const taskContainer = document.querySelectorAll(".tasks-container");

//variavel que vai definir os id's dos cards

import Card from "./card.js";
const card = new Card;

for(var i = 0; i< addTaskBtn.length; i++) {
    addTaskBtn[i].addEventListener("click", function(e) {
        card.createCard(e, true);
    });
};




for(var i = 0; i < removeTaskBtn.length; i++) {
    removeTaskBtn[i].addEventListener("click", (e) => {

        const collumns = ["collumn0", "collumn1", "collumn2"];

        for(var j = 0; j < collumns.length; j++) {
            if(card.focusElement.classList.contains(collumns[j]) && e.target.parentNode.classList.contains(collumns[j])) {
                card.focusElement.remove();
            }
        }

    })
}

taskContainer.forEach(task => {
    task.addEventListener("dragenter", (e) => {
        if(card.taskContainerFocus != task.id) {
            if(card.taskContainerFocus != undefined) document.getElementById(card.taskContainerFocus).classList.remove("focus")
                card.taskContainerFocus = task.id;

            task.classList.add("focus")
        }
    });

    task.addEventListener("dragover", function(e) { //evento acionado quando um objeto dragged estiver em cima dele 
        e.preventDefault(); //preventDefault: evita o comportamento padrão da area (section) quando um objeto dragged esta em cima dele
    });

    task.addEventListener("drop", function(e) {
        document.getElementById(card.taskContainerFocus).classList.remove("focus");

        e.preventDefault();

        var data_ = e.dataTransfer.getData("id"); //pega a data que estava guardada no nome de "id"
        var newCard = document.getElementById(data_); //pega o elemento pelo id conseguido
        newCard.className = "task " + e.target.id;

        document.getElementById(card.taskContainerFocus).appendChild(newCard); //adiciona o cartão na section
        card.taskContainerFocus = undefined;
    });
});

document.body.onload = () => {
    document.body.style.display = "block";
}