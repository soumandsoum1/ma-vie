const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const micButton = document.getElementById("micButton");
const taskList = document.getElementById("taskList");
const voiceStatus = document.getElementById("voiceStatus");

// Ajouter une tâche
function createTask(text) {
    const task = text.trim();

    if (task === "") {
        alert("Écris une tâche avant de l'ajouter !");
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = task;

    checkbox.addEventListener("change", function() {
        li.classList.toggle("completed", checkbox.checked);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✕";
    deleteButton.style.width = "45px";
    deleteButton.style.padding = "10px";
    deleteButton.style.background = "#e45b65";

    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
}

// Bouton ajouter
addTask.addEventListener("click", function() {
    createTask(taskInput.value);
});

// Ajouter avec la touche Entrée
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        createTask(taskInput.value);
    }
});

// Reconnaissance vocale
const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener("click", function() {
        voiceStatus.textContent = "Je t'écoute...";
        recognition.start();
    });

    recognition.onresult = function(event) {
        const spokenText =
            event.results[0][0].transcript;

        taskInput.value = spokenText;

        voiceStatus.textContent =
            "Ta tâche a été reconnue. Tu peux l'ajouter.";
    };

    recognition.onerror = function() {
        voiceStatus.textContent =
            "Erreur du micro. Réessaie.";
    };

    recognition.onend = function() {
        micButton.disabled = false;
    };

} else {
    micButton.disabled = true;
    voiceStatus.textContent =
        "La reconnaissance vocale n'est pas disponible dans ce navigateur.";
}
