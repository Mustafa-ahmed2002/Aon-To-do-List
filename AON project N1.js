console.log("Script is running");

const inputBox = document.getElementById("input");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You Need To Write Something Here!!");
  } else {
    const taskText = inputBox.value;
    const listItem = createListItem(taskText);
    listContainer.appendChild(listItem);
    inputBox.value = "";
  }
}

function createListItem(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="description-button" onclick="addDescription(this)">Add Description</button>
    <button class="view-description-button" onclick="viewDescription(this)">View Description</button>
    <div class="img-container">
      <img src="images/3922739-200.png" class="delete-button" onclick="deleteTask(this)" />
    </div>
    <div class="dropdown">
      <div class="select">
        <span class="selected">High</span>
        <div class="caret"></div>
      </div>
      <ul class="menu">
        <li class="active">High</li>
        <li>Medium</li>
        <li>Low</li>
      </ul>
    </div>
    <div class="description"></div>
    <button class="edit-button" onclick="editTask(this)">Edit</button>
  `;

  const select = li.querySelector(".select");
  const caret = li.querySelector(".caret");
  const menu = li.querySelector(".menu");
  const options = li.querySelectorAll(".menu li");
  const selected = li.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });

  return li;
}

function deleteTask(button) {
  const listItem = button.parentElement.parentElement;
  listContainer.removeChild(listItem);
}

function toggleDropdown(selectElement) {
  const dropdown = selectElement.nextElementSibling;
  dropdown.classList.toggle("menu-open");
}

function selectPriority(priorityElement) {
  const selected = priorityElement.textContent;
  const selectElement =
    priorityElement.parentElement.parentElement.querySelector(".selected");
  selectElement.textContent = selected;
  const dropdown = priorityElement.parentElement;
  dropdown.classList.remove("menu-open");
}

function editTask(button) {
  const listItem = button.parentElement;
  const taskText = listItem.querySelector("span");
  const updatedTask = prompt("Edit the task:", taskText.textContent.trim());

  if (updatedTask !== null && updatedTask !== "") {
    taskText.textContent = updatedTask;
  }
}
// Add these functions to your JavaScript code

function addDescription(button) {
  const listItem = button.parentElement;
  const description = prompt("Add a description to this task:");
  if (description !== null) {
    // Store the description in a data attribute
    listItem.dataset.description = description;
  }
}

function viewDescription(button) {
  const listItem = button.parentElement;
  const description = listItem.dataset.description;
  if (description) {
    alert(description);
  } else {
    alert("No description added for this task.");
  }
}
