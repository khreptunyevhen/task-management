const addCardBtn = document.querySelector("#add-card");
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
    cardEl.draggable = "true";
    cardEl.textContent = cardValue;

    clearForm();

    list.appendChild(cardEl);
  });
}

addCard();

// Clear add a card form
function clearForm() {
  cardForm.style.display = "none";
  addCardBtn.style.display = "block";
  cardContent.value = "";
}
