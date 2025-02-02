document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('color-picker');

    let drawing = false;
    let currentColor = colorPicker.value;

    colorPicker.addEventListener('input', function () {
        currentColor = this.value;
    });

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('mouseleave', function () {
        drawing = false;
    });

    // Define clearCanvas globally
    window.clearCanvas = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
});

// Drag-and-drop functions
let draggedEmoji = null;

function onDragStart(event, emoji) {
    draggedEmoji = emoji;
}

// Function to allow drop
function allowDrop(event) {
    event.preventDefault();
}

// Function to handle drop on paragraph
function onDrop(event, paragraphId) {
    event.preventDefault();
    if (draggedEmoji) {
        const tagContainer = document.getElementById(`tags-${paragraphId}`);

        // Create and add emoji tag
        const tag = document.createElement("span");
        tag.className =
            "inline-block text-2xl cursor-pointer";
        tag.innerText = draggedEmoji;
        tagContainer.appendChild(tag);

        draggedEmoji = null; // Reset the dragged emoji
            }
        }

// Function to handle sentence/paragraph hover highlighting
function highlightCorresponding(sentenceId, isHovering) {
    const sentence = document.getElementById(sentenceId);
    if (isHovering) {
        sentence.classList.add("bg-yellow-100", "ring-1", "ring-yellow-300");
    } else {
        sentence.classList.remove("bg-yellow-100", "ring-1", "ring-yellow-300");
    }
}

// Scenario functions
let userChoice = null;

function selectScenario(choice) {
    console.log(`Scenario chosen: ${choice}`);
    // Reset button highlights
    document.getElementById('choice-hesitate').classList.remove('bg-blue-200');
    document.getElementById('choice-approach').classList.remove('bg-blue-200');

    if (choice === 'hesitate') {
        document.getElementById('choice-hesitate').classList.add('bg-blue-200');
        loadHesitateScenario();
    } else if (choice === 'approach') {
        document.getElementById('choice-approach').classList.add('bg-blue-200');
        loadApproachScenario();
    }
}

function loadHesitateScenario() {
    console.log('Loading "Hesitate and Wait" scenario');
    for (let i = 4; i <= 8; i++) {
        document.getElementById(`p${i}-auggie`).style.display = 'block';
        document.getElementById(`p${i}-summer`).style.display = 'block';
    }
    document.getElementById('p9-auggie').style.display = 'none';
    document.getElementById('p9-summer').style.display = 'none';
}


function loadApproachScenario() {
    console.log('Loading "Walk Directly and Say Hi" scenario');
    for (let i = 4; i <= 8; i++) {
        document.getElementById(`p${i}-auggie`).style.display = 'none';
        document.getElementById(`p${i}-summer`).style.display = 'none';
    }
    document.getElementById('p9-auggie').style.display = 'block';
    document.getElementById('p9-summer').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    loadHesitateScenario();
});


// Toggling reflection popup
function toggleReflectionPopup() {
    const popup = document.getElementById("reflection-popup");
    popup.classList.toggle("hidden");
}

function toggleReflectionPopup2() {
    const popup2 = document.getElementById("reflection-popup2");
    popup2.classList.toggle("hidden");
}


let draggedWord = null;

// Function to handle drag start
function onWordDragStart(event) {
    draggedWord = event.target.textContent.trim(); // Capture the dragged word's text
    event.dataTransfer.setData("text/plain", draggedWord); // Set data for drag event
}

// Function to allow drop
function allowDrop(event) {
    event.preventDefault(); // Prevent default behavior to allow dropping
}

// Function to handle drop into a sentence
function onDropSentence(event, sentenceId) {
    event.preventDefault();
    const draggedData = event.dataTransfer.getData("text/plain"); // Retrieve dragged data
    const sentence = document.getElementById(sentenceId);
    const placeholder = sentence.querySelector('.text-blue-500');

    if (placeholder && draggedData) {
        placeholder.textContent = draggedData; // Replace placeholder text with dragged word
        placeholder.classList.remove('text-blue-500');
        placeholder.classList.add('text-green-500');
        draggedWord = null; // Reset dragged word
    }
}

// Function to clear sentences
function clearSentences() {
    document.querySelectorAll('.text-green-500').forEach(el => {
        el.textContent = '[drag emotion here]'; // Reset placeholder text
        el.classList.remove('text-green-500');
        el.classList.add('text-blue-500');
    });
}

