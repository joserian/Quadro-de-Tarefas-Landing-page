//constante que guardará todos os botões de "+" em um array
const addTaskBtn = document.querySelectorAll(".add-task"); 
const removeTaskBtn = document.querySelectorAll(".remove-card");
const taskContainer = document.querySelectorAll(".tasks-container");

//variavel que vai definir os id's dos cards
var newCardId = 1; 

for(var i = 0; i< addTaskBtn.length; i++) {
    addTaskBtn[i].addEventListener("click", function(e) {
        var realTarget = e.currentTarget.parentElement.parentElement.querySelector(".tasks-container");
        
        //criando a div principal do card
        var cardElement = document.createElement("div");
        cardElement.className = "task " + realTarget.id;
        cardElement.id = newCardId;
        newCardId++;
        cardElement.draggable = true;

        //adicionando um evento que será acionado quando o card começar a ser arrastado
        cardElement.addEventListener("dragstart", function(e) {
            //vou guardar o id do meu objeto em uma data com o nome de "id"
            e.dataTransfer.setData("id", e.target.id); //param: nome da data, data em si
        });
        cardElement.addEventListener("dragend", (e) => {
            if(taskContainerFocus != undefined) {
                
                document.getElementById(taskContainerFocus).classList.remove("focus");
                taskContainerFocus = undefined;
            }
        })
        
        cardElement.addEventListener("focusout", (e) => {
            focusElement = e.target.parentNode;
        })
        
        //criando a descrição do card
        var cardDescription_ = document.createElement("div");
        cardDescription_.className = "task-description";
        cardDescription_.contentEditable = true;

        //adicionando a descrição a div principal do card
        cardElement.append(cardDescription_);

        realTarget.append(cardElement);

        cardDescription_.focus();
    });
};



var focusElement = undefined;
var taskContainerFocus = undefined;

for(var i = 0; i < removeTaskBtn.length; i++) {
    removeTaskBtn[i].addEventListener("click", (e) => {

        const collumns = ["collumn0", "collumn1", "collumn2"];

        for(var j = 0; j < collumns.length; j++) {
            if(focusElement.classList.contains(collumns[j]) && e.target.parentNode.classList.contains(collumns[j])) {
                focusElement.remove();
            }
        }

    })
}

taskContainer.forEach(task => {
    task.addEventListener("dragenter", (e) => {
        if(taskContainerFocus != task.id) {
            if(taskContainerFocus != undefined) document.getElementById(taskContainerFocus).classList.remove("focus")
            taskContainerFocus = task.id;

            task.classList.add("focus")
        }
    });

    task.addEventListener("dragover", function(e) { //evento acionado quando um objeto dragged estiver em cima dele 
        e.preventDefault(); //preventDefault: evita o comportamento padrão da area (section) quando um objeto dragged esta em cima dele
    });

    task.addEventListener("drop", function(e) {
        document.getElementById(taskContainerFocus).classList.remove("focus");

        e.preventDefault();

        var data_ = e.dataTransfer.getData("id"); //pega a data que estava guardada no nome de "id"
        var newCard = document.getElementById(data_); //pega o elemento pelo id conseguido
        newCard.className = "task " + e.target.id;

        document.getElementById(taskContainerFocus).appendChild(newCard); //adiciona o cartão na section
        taskContainerFocus = undefined;
    });
});

document.body.onload = () => {
    document.body.style.display = "block";
}