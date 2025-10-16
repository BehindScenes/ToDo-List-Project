let selected = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("addTask").addEventListener("click", () => {
  const taskName = document.getElementById("newTask").value;
  const taskDate = document.getElementById("dateInput").value;
  const taskColor = document.getElementById("colorSelect").value;
  const taskCategory = document.getElementById("Category").value;
  let chk = false;

  if (!taskName || !taskDate || !taskColor || !Category)
    return showAlert(
      "Somthing went wrong, please check your form and try again.",
      "alert-warning",
      "bi bi-exclamation-circle"
    );

  selected.push({ taskName, taskDate, taskColor, chk, taskCategory });
  localStorage.setItem("tasks", JSON.stringify(selected));

  renderTasks();

  document.getElementById("newTask").value = "";
  document.getElementById("dateInput").value = "";

  showAlert(
    "New task has been add successfully.",
    "alert-success",
    "bi bi-file-earmark-plus"
  );
  autoDeleteAlert();
});

function renderTasks(filter = null) {
  selected = JSON.parse(localStorage.getItem("tasks")) || [];

  const tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.innerHTML = "";

  if (selected.length === 0)
    return (tasksContainer.innerHTML = `<p class="text-muted fw-bold fs-4 text-center mt-4">No Tasks yet to do.</p>`);

  selected.forEach((task, index) => {
    if (filter === true && !task.chk) return;
    if (filter === false && task.chk) return;
    tasksContainer.innerHTML += `
            <div class="task-item border border-${
              task.taskColor
            } rounded px-3 py-2 mb-1">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="fw-semibold text-${
                      task.taskColor
                    } fs-6" style="${
      task.chk ? "text-decoration: line-through;" : ""
    }">
                        📌 ${task.taskName} <span class="badge text-bg-${
      task.taskColor
    }">${task.taskCategory}</span>
                    </div>
                    <button class="btn btn-sm btn-outline-danger border-0 p-1" title="delete" onclick="deleteTask(${index}, this)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <small class="text-${task.taskColor}">📅 ${
      task.taskDate
    }</small>
                    <span class="vr text-${task.taskColor}"></span>

                    <small class="text-${
                      task.taskColor
                    }"><i class="bi bi-caret-right-fill"></i>Status:  ${
      task.chk ? "Completed" : "Panding / In progress"
    }</small>
                    <span class="vr text-${task.taskColor}"></span>
                    <div class="form-check">
                        <label class="form-check-label text-${
                          task.taskColor
                        } small">Completed</label>
                        <input class="form-check-input border-${
                          task.taskColor
                        }" type="checkbox" ${
      task.chk ? "checked" : ""
    } title="${
      !task.chk ? "Completed" : "Not Completed"
    }" id="taskCheckbox" onchange="toggleCompleted(${index}, this)">
                    </div>
                </div>
            </div>
        `;
    countTasks();
  });
}

function deleteTask(index) {
  selected.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(selected));

  countTasks();
  renderTasks();

  showAlert(
    "Your task has been deleted successfully.",
    "alert-danger",
    "bi bi-trash"
  );
  autoDeleteAlert();
}

function toggleCompleted(index, checkbox) {
  selected[index].chk = checkbox.checked;
  localStorage.setItem("tasks", JSON.stringify(selected));

  renderTasks();
}

function showCompleted() {
  renderTasks(true);
}

function showUncompleted() {
  renderTasks(false);
}

function showAll() {
  renderTasks(null);
}

document.getElementById("colorSelect").addEventListener("change", () => {
  let circleColor = document.getElementById("circleColor");
  let colorSelect = document.getElementById("colorSelect").value;

  const colors = ["success", "danger", "primary", "warning", "info"];
  colors.forEach((color) => {
    circleColor.classList.remove(`text-${color}`);
  });

  if (colorSelect) return circleColor.classList.add(`text-${colorSelect}`);
});

function countTasks() {
  selected = JSON.parse(localStorage.getItem("tasks"));
  let count = document.getElementById("countTasks");

  count.textContent = `Tasks: ${selected.length}`;
}

function showAlert(message, color, icon) {
  let alertBox = document.getElementById("alertBox");

  alertBox.innerHTML = `
        <div class="alert ${color}" role="alert">
            <i class="${icon}"></i> ${message}
        </div>
    `;
}

function autoDeleteAlert() {
  let findAlert = document.querySelector(".alert");
  if (findAlert) {
    setTimeout(() => {
      findAlert.remove();
    }, 3000);
  }
}

window.onload = renderTasks;

let clicked = false;

const handleClick = () => {
  clicked = !clicked;

  localStorage.setItem("theme", clicked ? "dark" : "light");

  themeRender();
};

const themeRender = () => {
  const switcherIcon = document.getElementById("themeController");
  const theme = localStorage.getItem("theme") || "dark";

  document.documentElement.setAttribute("data-bs-theme", theme);

  switcherIcon.innerHTML =
    theme === "dark"
      ? '<i class="bi bi-brightness-high-fill text-light"></i>'
      : '<i class="bi bi-moon-fill text-light"></i>';
};

window.addEventListener("DOMContentLoaded", themeRender);
