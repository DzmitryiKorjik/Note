const taskInput = document.querySelector('#taskInput');

taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const taskText = taskInput.value; // Obtenir du texte à partir d'une entrée
        if (taskText.trim() === '') return; // Vérifier la présence d'une chaîne vide
        const newTask = document.createElement('li'); // Création d'un nouvel élément
        newTask.textContent = taskText; // Ajouter du texte à un élément

        const taskList = document.querySelector('#taskList'); // Recherche de l'élément parent
        if (taskList) {
            taskList.appendChild(newTask); // Ajouter une nouvelle tâche à la liste
            taskInput.value = ''; // Effacer le champ de saisie

            // Ajouter un gestionnaire d'événement pour le clic
            let isCrossed = false; // Drapeau pour la surveillance de l'état
            newTask.addEventListener('click', function() {
                if (!isCrossed) {
                    newTask.style.textDecoration = 'line-through'; // Rayer le texte
                    isCrossed = true;
                } else {
                    newTask.remove(); // Supprimer un élément
                }
            });
        }
    }
});

