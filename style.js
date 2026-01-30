// Array para almacenar las respuestas del usuario
let userAnswers = [];

// Definición de las recomendaciones de productos basadas en el tipo de piel
const recommendations = {
    seca: {
        tipo: "Piel Seca",
        mensaje: "Tu piel necesita una dosis extra de hidratación y lípidos para restaurar su barrera protectora. Prioriza productos ricos y nutritivos.",
        producto: "Crema Facial Nutrición Esencial. Formulada con mantecas naturales y aceites ricos para una hidratación profunda y duradera."
    },
    grasa: {
        tipo: "Piel Grasa",
        mensaje: "Tu piel se beneficia de productos que controlan el sebo sin resecarla. Las arcillas y los geles ligeros son tus aliados.",
        producto: "Mascarilla de Arcilla Verde Detox. Desintoxica, reduce poros y equilibra la producción de grasa sin irritar."
    },
    mixta: {
        tipo: "Piel Mixta",
        mensaje: "Necesitas balance: hidratación para las zonas secas y control para la zona T. Busca fórmulas que equilibren.",
        producto: "Gel Hidratante Equilibrio y Frescura. Proporciona hidratación ligera, matifica la zona T y calma las áreas secas."
    }
};


/**
 * Muestra la siguiente pregunta del quiz y registra la respuesta.
 * @param {number} currentStep El número de la pregunta actual (1, 2, 3).
 * @param {string} answer La respuesta seleccionada ('seca', 'grasa', 'mixta').
 */
function nextQuestion(currentStepzz, answer) {
    // 1. Guardar la respuesta
    userAnswers.push(answer);
    
    // 2. Ocultar la pregunta actual
    const currentQuestionId = `question-${currentStep}`;
    document.getElementById(currentQuestionId).classList.add('hidden');

    // 3. Decidir qué hacer a continuación
    if (currentStep < 3) {
        // Mostrar la siguiente pregunta
        const nextQuestionId = `question-${currentStep + 1}`;
        document.getElementById(nextQuestionId).classList.remove('hidden');
    } else {
        // Si es la última pregunta, calcular y mostrar los resultados
        showResults();
    }
}


/**
 * Calcula el tipo de piel dominante y muestra la recomendación.
 */
function showResults() {
    // Contar ocurrencias de cada tipo
    const counts = userAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    // Determinar el tipo de piel con más votos
    let dominantType = 'seca'; // Valor por defecto
    let maxCount = 0;
    
    for (const type in counts) {
        if (counts[type] > maxCount) {
            maxCount = counts[type];
            dominantType = type;
        }
    }
    
    // Obtener la recomendación
    const result = recommendations[dominantType];

    // Mostrar el mensaje de resultados
    document.getElementById('skin-type-message').innerHTML = `
        ¡Felicitaciones! Tu tipo de piel dominante parece ser **${result.tipo}**.<br>${result.mensaje}
    `;
    
    // Mostrar la recomendación del producto
    document.getElementById('product-recommendation').innerHTML = `
        <p class="font-bold text-primary">${result.producto}</p>
        <a href="productos.html" class="inline-block mt-3 text-sm text-accent font-semibold hover:underline">
            Ver detalles del producto &rarr;
        </a>
    `;

    // 4. Mostrar el contenedor de resultados
    document.getElementById('quiz-results').classList.remove('hidden');
    
    // Desplazar a la sección de resultados
    document.getElementById('quiz-results').scrollIntoView({ behavior: 'smooth' });
}


/**
 * Reinicia el quiz para que el usuario pueda volver a empezar.
 */
function resetQuiz() {
    userAnswers = []; // Limpiar respuestas
    
    // Ocultar resultados
    document.getElementById('quiz-results').classList.add('hidden');
    
    // Mostrar la primera pregunta
    document.getElementById('question-1').classList.remove('hidden');
    document.getElementById('question-2').classList.add('hidden');
    document.getElementById('question-3').classList.add('hidden');
    
    // Desplazar al inicio del quiz
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.scrollIntoView({ behavior: 'smooth' });
}


// ===============================================
// Lógica para la página de productos (productos.html)
// ===============================================

/**
 * Muestra u oculta la lista de productos de una categoría (efecto acordeón).
 * @param {string} categoryId El ID del contenedor de la lista de productos.
 */
function toggleProducts(categoryId) {
    const list = document.getElementById(categoryId);
    const header = list.previousElementSibling; // El botón/encabezado

    // Toggle de visibilidad (Tailwind 'hidden')
    list.classList.toggle('hidden');
    
    // Toggle del ícono de flecha
    const arrow = header.querySelector('.arrow-icon');
    if (arrow) {
        if (list.classList.contains('hidden')) {
            arrow.textContent = '▼'; // Cerrado
        } else {
            arrow.textContent = '▲'; // Abierto
        }
    }

    // Opcional: Cerrar otros acordeones (si queremos un acordeón simple)
    // Descomentar si se desea que solo una categoría esté abierta a la vez
    /*
    document.querySelectorAll('.product-list').forEach(otherList => {
        if (otherList.id !== categoryId && !otherList.classList.contains('hidden')) {
            otherList.classList.add('hidden');
            const otherHeader = otherList.previousElementSibling;
            const otherArrow = otherHeader.querySelector('.arrow-icon');
            if (otherArrow) {
                otherArrow.textContent = '▼';
            }
        }
    });
    */
}