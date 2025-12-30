// 1. CONTADOR
let counter = 0;
function incrementCounter() {
    counter++;
    document.getElementById('counter').textContent = counter;
}
function decrementCounter() {
    counter--;
    document.getElementById('counter').textContent = counter;
}
function resetCounter() {
    counter = 0;
    document.getElementById('counter').textContent = counter;
}

// 2. CALCULADORA
let calcDisplay = '0';
function appendToCalc(value) {
    if (calcDisplay === '0' && value !== '+' && value !== '-' && value !== '×' && value !== '÷') {
        calcDisplay = value;
    } else {
        calcDisplay += value;
    }
    document.getElementById('calcDisplay').textContent = calcDisplay;
}
function clearCalc() {
    calcDisplay = '0';
    document.getElementById('calcDisplay').textContent = calcDisplay;
}
function calculateResult() {
    try {
        let result = calcDisplay
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        calcDisplay = eval(result).toString();
        document.getElementById('calcDisplay').textContent = calcDisplay;
    } catch (e) {
        calcDisplay = 'Error';
        document.getElementById('calcDisplay').textContent = calcDisplay;
    }
}

// 3. CAMBIO DE TEMA
function toggleTheme() {
    const themeDemo = document.getElementById('themeDemo');
    const currentTheme = document.getElementById('currentTheme');
    if (themeDemo.classList.contains('light')) {
        themeDemo.classList.remove('light');
        themeDemo.classList.add('dark');
        currentTheme.textContent = 'Oscuro';
    } else {
        themeDemo.classList.remove('dark');
        themeDemo.classList.add('light');
        currentTheme.textContent = 'Claro';
    }
}

// 4. LISTA DE TAREAS
let todos = [];
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        input.value = '';
        renderTodos();
    }
}
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}
function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        li.innerHTML = `
            <span onclick="toggleTodo(${index})" style="cursor: pointer;">${todo.text}</span>
            <button onclick="deleteTodo(${index})">❌</button>
        `;
        list.appendChild(li);
    });
}

// 5. RELOJ DIGITAL
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dateStr = `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} ${now.getFullYear()}`;
    document.getElementById('date').textContent = dateStr;
}
setInterval(updateClock, 1000);
updateClock();

// 6. GENERADOR DE COLORES
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    const colorBox = document.getElementById('colorBox');
    colorBox.style.background = color;
    colorBox.textContent = color;
}

// 7. VALIDACIÓN DE FORMULARIO
function validateName() {
    const input = document.getElementById('userName');
    const error = document.getElementById('nameError');
    if (input.value.length < 3 && input.value.length > 0) {
        input.classList.add('error');
        input.classList.remove('success');
        error.classList.add('show');
    } else if (input.value.length >= 3) {
        input.classList.remove('error');
        input.classList.add('success');
        error.classList.remove('show');
    } else {
        input.classList.remove('error', 'success');
        error.classList.remove('show');
    }
}
function validateEmail() {
    const input = document.getElementById('userEmail');
    const error = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value && !emailRegex.test(input.value)) {
        input.classList.add('error');
        input.classList.remove('success');
        error.classList.add('show');
    } else if (input.value && emailRegex.test(input.value)) {
        input.classList.remove('error');
        input.classList.add('success');
        error.classList.remove('show');
    } else {
        input.classList.remove('error', 'success');
        error.classList.remove('show');
    }
}
function validateForm(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    if (name.length >= 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('¡Formulario válido! ✅');
    } else {
        alert('Por favor, completa todos los campos correctamente. ❌');
    }
}

// 8. CARRUSEL
let currentSlide = 0;
let autoplay = true;
let autoplayInterval;

function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    items[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % 3;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + 3) % 3;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function toggleAutoplay() {
    const btn = document.getElementById('autoplayBtn');
    if (autoplay) {
        clearInterval(autoplayInterval);
        btn.textContent = '▶️ Reanudar';
        autoplay = false;
    } else {
        autoplayInterval = setInterval(nextSlide, 3000);
        btn.textContent = '⏸️ Pausar';
        autoplay = true;
    }
}

autoplayInterval = setInterval(nextSlide, 3000);

// 9. BUSCADOR
function filterItems() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const items = document.querySelectorAll('#itemsList li');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// 10. MODAL
function openModal() {
    document.getElementById('modalOverlay').classList.add('show');
}
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
}

// 11. TEMPORIZADOR
let timerSeconds = 30;
let timerInterval;
let timerRunning = false;

function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    document.getElementById('timer').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerRunning = false;
                alert('¡Tiempo terminado! ⏰');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 30;
    updateTimerDisplay();
}

// 12. ACORDEÓN
function toggleAccordion(index) {
    const content = document.getElementById('content' + index);
    const icon = document.getElementById('icon' + index);
    
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        icon.textContent = '+';
    } else {
        // Cerrar todos los demás
        for (let i = 0; i < 3; i++) {
            document.getElementById('content' + i).classList.remove('show');
            document.getElementById('icon' + i).textContent = '+';
        }
        // Abrir el actual
        content.classList.add('show');
        icon.textContent = '-';
    }
}

// Permitir agregar tareas con Enter
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});
