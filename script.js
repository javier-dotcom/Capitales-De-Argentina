const provinces = [
    { name: "Buenos Aires", capital: "La Plata" },
    { name: "Catamarca", capital: "San Fernando del Valle de Catamarca" },
    { name: "Chaco", capital: "Resistencia" },
    { name: "Chubut", capital: "Rawson" },
    { name: "Córdoba", capital: "Córdoba" },
    { name: "Corrientes", capital: "Corrientes" },
    { name: "Entre Ríos", capital: "Paraná" },
    { name: "Formosa", capital: "Formosa" },
    { name: "Jujuy", capital: "San Salvador de Jujuy" },
    { name: "La Pampa", capital: "Santa Rosa" },
    { name: "La Rioja", capital: "La Rioja" },
    { name: "Mendoza", capital: "Mendoza" },
    { name: "Misiones", capital: "Posadas" },
    { name: "Neuquén", capital: "Neuquén" },
    { name: "Río Negro", capital: "Viedma" },
    { name: "Salta", capital: "Salta" },
    { name: "San Juan", capital: "San Juan" },
    { name: "San Luis", capital: "San Luis" },
    { name: "Santa Cruz", capital: "Río Gallegos" },
    { name: "Santa Fe", capital: "Santa Fe" },
    { name: "Santiago del Estero", capital: "Santiago del Estero" },
    { name: "Tierra del Fuego", capital: "Ushuaia" },
    { name: "Tucumán", capital: "San Miguel de Tucumán" }
];

let selectedProvinces = [];
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = []; // Array para almacenar respuestas incorrectas

function getRandomProvinces() {
    const shuffled = provinces.sort(() => 0.5 - Math.random());
    selectedProvinces = shuffled.slice(0, 10);
}

function createConfusingOption(correctAnswer) {
    let confusingOption = correctAnswer;
   

    if (correctAnswer=="La Plata"){
        confusingOption=" Mar del Plata "
    }
    if (correctAnswer=="San Fernando del Valle de Catamarca"){
        confusingOption="San Fernando de los  Valles de Catamarca"
    }
    if (correctAnswer=="San Salvador de Jujuy"){
        confusingOption="Salvador de Jujuy"
    }
    if (correctAnswer=="Resistencia"){
        confusingOption="La Resistencia"
    }
    if (correctAnswer=="Rawson"){
        confusingOption="Rawson del Sur"
    }
    if (correctAnswer=="Córdoba"){
        confusingOption="Carlos Paz"
    }
    if (correctAnswer=="Corrientes"){
        confusingOption="La Corrientes"
    }
    if (correctAnswer=="Paraná"){
        confusingOption="Entre Rios Capital"
    }
    if (correctAnswer=="Formosa"){
        confusingOption="Formoseña"
    }
    if (correctAnswer=="Santa Rosa"){
        confusingOption="La Rosa"
    }
    if (correctAnswer=="La Rioja"){
        confusingOption="Rioja"
    }
    if (correctAnswer=="Mendoza"){
        confusingOption="San salvador de Mendoza"
    }
    if (correctAnswer=="Posadas"){
        confusingOption="Misiones"
    }
    if (correctAnswer=="Neuquén"){
        confusingOption="Neuquén del Sur"
    }
    if (correctAnswer=="Viedma"){
        confusingOption="Rio Negro"
    }
    if (correctAnswer=="Salta"){
        confusingOption="La Salta"
    }
    if (correctAnswer=="San Juan"){
        confusingOption="Salvador de San Juan"
    }
    if (correctAnswer=="San Luis"){
        confusingOption="Salvador de San Luis"
    }
    if (correctAnswer=="Río Gallegos"){
        confusingOption="Rio De Santa Cruz"
    }
    if (correctAnswer=="Santa Fe"){
        confusingOption="Rosario"
    }
    if (correctAnswer=="Santiago del Estero"){
        confusingOption="Santiago De Los Esteros"
    }
    if (correctAnswer=="Ushuaia"){
        confusingOption="Tierra del Fuego"
    }
    if (correctAnswer=="San Miguel de Tucumán"){
        confusingOption="Miguel de Tucumán"
    }
    return confusingOption;
}

function createQuestion() {
    if (currentQuestion >= selectedProvinces.length) {
        showScore();
        return;
    }

    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const province = selectedProvinces[currentQuestion];
    questionContainer.innerHTML = `¿Cuál es la capital de ${province.name}?`;

    const correctAnswer = province.capital;
    const options = [correctAnswer];
    while (options.length < 3) {
        const randomProvince = provinces[Math.floor(Math.random() * provinces.length)];
        if (!options.includes(randomProvince.capital)) {
            options.push(randomProvince.capital);
        }
    }

    const confusingOption = createConfusingOption(correctAnswer);
    options.push(confusingOption);

    options.sort(() => 0.5 - Math.random());
    optionsContainer.innerHTML = "";
    options.forEach(option => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.innerHTML = option;
        button.onclick = () => checkAnswer(option, correctAnswer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        incorrectAnswers.push({
            question: `¿Cuál es la capital de ${selectedProvinces[currentQuestion].name}?`,
            selectedAnswer: selectedAnswer,
            correctAnswer: correctAnswer
        });
    }
    currentQuestion++;
    createQuestion();
}

function showScore() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    questionContainer.innerHTML = `¡Juego terminado! Obtuviste ${score} de ${selectedProvinces.length} puntos.`;
    optionsContainer.innerHTML = "";

    if (incorrectAnswers.length > 0) {
        const incorrectContainer = document.createElement("div");
        incorrectContainer.innerHTML = "<h3>Respuestas incorrectas:</h3>";
        
        incorrectAnswers.forEach(item => {
            const incorrectItem = document.createElement("p");
            incorrectItem.innerHTML = `${item.question}<br>
                                       <span class="incorrect-answer">Tu respuesta: ${item.selectedAnswer}</span><br>
                                       <span class="correct-answer">Respuesta correcta: ${item.correctAnswer}</span>`;
            incorrectContainer.appendChild(incorrectItem);
        });

        optionsContainer.appendChild(incorrectContainer);
    }

    // Crear botón de reinicio
    const restartButton = document.createElement("button");
    restartButton.innerHTML = "Reiniciar juego";
    restartButton.className = "restart-btn";
    restartButton.onclick = resetGame;
    optionsContainer.appendChild(restartButton);
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    getRandomProvinces();
    createQuestion();
}

// Inicializar el juego
getRandomProvinces();
createQuestion();
