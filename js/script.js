document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.querySelector("#taskInput");
  const taskList = document.querySelector("#taskList");

  // Fonction pour sauvegarder les tâches dans le local storage
  function saveTasks() {
    const tasks = []; // Array
    taskList.querySelectorAll("li").forEach((task) => {
      tasks.push({
        text: task.textContent,
        isCrossed: task.style.textDecoration === "line-through",
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Enregistrer les tâches
  }

  // Fonction pour charger les tâches à partir du local storage
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((taskData) => {
      addTask(taskData.text, taskData.isCrossed);
    });
  }

  // Fonction générique pour ajouter une tâche
  function addTask(text, isCrossed = false) {
    const newTask = document.createElement("li");
    newTask.textContent = text;
    if (isCrossed) {
      newTask.style.textDecoration = "line-through";
    }

    let crossed = isCrossed; // Utiliser une variable locale pour suivre l'état
    newTask.addEventListener("click", function () {
      if (!crossed) {
        newTask.style.textDecoration = "line-through";
        crossed = true;
      } else {
        newTask.remove(); // Supprimer un élément
        saveTasks(); // Enregistrer les modifications
      }
    });

    taskList.appendChild(newTask);
  }

  // Charger les tâches au démarrage
  loadTasks();

  // Écouteur pour ajouter une nouvelle tâche
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim(); // Supprimer les espaces inutiles
      if (taskText === "") return; // Vérifier les entrées vides

      addTask(taskText); // Ajouter la tâche
      taskInput.value = ""; // Effacer le champ d'entrée
      saveTasks(); // Enregistrer les tâches
    }
  });
});
