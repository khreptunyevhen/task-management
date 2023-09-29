const addCardBtn = document.querySelector("#add-card");
const addBoardBtn = document.querySelector(".add-board");
const cardContent = document.querySelector(".card-text");
const cardForm = document.querySelector(".card-form");

// Add new card into list
function addCard() {
  const addContentBtn = document.querySelector("#add-content");
  const cancelBtn = document.querySelector(".cancel-card");
  const list = document.querySelector(".list");

  let cardValue;

  cardForm.addEventListener("submit", (e) => e.preventDefault());

  cardContent.addEventListener("input", (e) => {
    cardValue = e.target.value;

    if (cardValue) {
      addContentBtn.style.display = "block";
    } else {
      addContentBtn.style.display = "none";
    }
  });

  addCardBtn.addEventListener("click", (e) => {
    cardForm.style.display = "block";
    addCardBtn.style.display = "none";
    addContentBtn.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    clearForm();
  });

  addContentBtn.addEventListener("click", () => {
    const cardEl = document.createElement("li");
    cardEl.classList.add("list-item");
    cardEl.innerHTML = `
      <span>${cardValue}</span>
      <button class="delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>`;
    cardEl.draggable = true;

    clearForm();

    list.appendChild(cardEl);
    dragNdrop();
  });
}

addCard();
changeTitle();

// Add a new board
function addNewBoard() {
  let board = document.createElement("div");
  board.classList.add("boards-item");

  board.innerHTML = `
    <h2 class="title" contenteditable="true">Card name</h2>
    <ul class="list"></ul>
  `;

  document.querySelector(".boards").appendChild(board);

  changeTitle();
  dragNdrop();
}

// Clear add a card form
function clearForm() {
  cardForm.style.display = "none";
  addCardBtn.style.display = "block";
  cardContent.value = "";
}

// Change a card name
function changeTitle() {
  const titles = document.querySelectorAll(".title");

  titles.forEach((title) =>
    title.addEventListener("click", (e) => (e.target.textContent = ""))
  );
}

// DragNdrop

let draggableItem = null;

function dragNdrop() {
  const listItems = document.querySelectorAll(".list-item");
  const lists = document.querySelectorAll(".list");

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const deleteBtn = item.querySelector(".delete-btn");

    item.addEventListener("dragstart", function () {
      draggableItem = item;
      this.style.color = "red";
      // this.style.transform = "rotate(-10deg)";

      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", function () {
      this.style.color = "black";
      // this.style.transform = "rotate(0deg)";

      setTimeout(() => {
        item.style.display = "flex";
        draggableItem = null;
      }, 0);
    });

    deleteBtn.addEventListener("click", () => item.remove());

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "red";
      });

      list.addEventListener("dragleave", function (e) {
        e.preventDefault();
        console.log("leave", this.offsetHeight);
        this.style.backgroundColor = "";
      });

      list.addEventListener("drop", function (e) {
        this.appendChild(draggableItem);
      });
    }
  }
}

dragNdrop();

// Events
addBoardBtn.addEventListener("click", addNewBoard);
