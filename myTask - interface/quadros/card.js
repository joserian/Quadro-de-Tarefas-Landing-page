export default class Card {

    constructor() {
        this.focusElement = undefined;
        this.taskContainerFocus = undefined;

        this.newCardId = 0;
        
        this.taskContainers = {
            collumn0: {

            },
            collumn1: {

            },
            collumn2: {

            }
        }
        
        //  this.localClear();
        this.localGet();
    }

    localAdd() {
        console.log("adicionando")

        const parse = new DOMParser();

        const containers = ["collumn0", "collumn1", "collumn2"];

        for(var i = 0; i < containers.length; i++) {
            const currentContainer = containers[i];
            const containerLen = Object.keys(this.taskContainers[currentContainer]).length;

            for(var j = 0; j < containerLen; j++) {
                var index = this.taskContainers[currentContainer][j];
                index = parse.parseFromString(index, "text/html");
                index = index.body.firstChild;

                const cardId = index.id;

                document.getElementById(currentContainer).append(index);
                this.events(index)

                console.log(index);
            }
        }

    }

    localGet() {
        if(localStorage.getItem("new-id") == null || localStorage.getItem("task-containers") == null) return

        console.log("pegando os dados no local");


        this.newCardId =  parseInt(localStorage.getItem("new-id"));
        console.log("resgatado do new-id -> " + this.newCardId);

        this.taskContainers = JSON.parse(localStorage.getItem("task-containers"));
        console.log("resgatado do task-containers ->");
        console.log(this.taskContainers);


        console.log("------------------");
        
        this.localAdd();
    }

    localSet(cardElement_, targetContainer_) {
        const cardId = cardElement_.id;
        const collumnId = targetContainer_.id;
        
        cardElement_ = cardElement_.outerHTML;
        
        this.taskContainers[collumnId][cardId] = cardElement_;

        this.localUpdate(this.newCardId, this.taskContainers)
    }

    localUpdate(newCardId_, taskContainers_) {
        localStorage.setItem("new-id", newCardId_);

        localStorage.setItem("task-containers", JSON.stringify(taskContainers_));
    }

    localClear() {
        localStorage.clear("new-id");
        localStorage.clear("task-containers");
    }

    createPrimaryContainer(target_) {
        //criando a div principal do card
        var cardElement = document.createElement("div");
        cardElement.className = "task " + target_.id;
        cardElement.id = this.newCardId;
        cardElement.draggable = true;

        return cardElement;
    }

    createDescriptionContainer() {
        //criando a descrição do card
        var cardDescription = document.createElement("div");
        cardDescription.className = "task-description";
        cardDescription.contentEditable = true;

        return cardDescription;
    }

    createCard(e, setLocal_) {
        var taskContainer = e.currentTarget.parentElement.parentElement.querySelector(".tasks-container");
        
        const cardContainer = this.createPrimaryContainer(taskContainer);
        const cardDescriptionContainer = this.createDescriptionContainer();
        
        //adicionando a descrição a div principal do card
        cardContainer.append(cardDescriptionContainer);

        taskContainer.append(cardContainer);

        cardDescriptionContainer.focus();

        this.events(cardContainer);
        
        if(setLocal_) {
            this.newCardId++;
            this.localSet(cardContainer, taskContainer);
        }
    }

    events(cardElement_) {
        //adicionando um evento que será acionado quando o card começar a ser arrastado
        cardElement_.addEventListener("dragstart", function(e) {
            //vou guardar o id do meu objeto em uma data com o nome de "id"
            e.dataTransfer.setData("id", e.target.id); //param: nome da data, data em si
        });
        cardElement_.addEventListener("dragend", (e) => {
            if(this.taskContainerFocus != undefined) {
                document.getElementById(this.taskContainerFocus).classList.remove("focus");
                this.taskContainerFocus = undefined;
            }
        })
        cardElement_.addEventListener("focusout", (e) => {
            this.focusElement = e.target.parentNode;
        })
        cardElement_.addEventListener("focus", () => {
            console.log("asdfasd")
        })
    }
}