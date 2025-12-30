
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Validación de email - debe contener @
function isValidEmail(email) {
    return email.includes('@') && email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1;
}

// Validación de teléfono - solo números
function isValidPhone(phone) {
    if (phone.trim() === '') return true;
    const regex = /^[0-9]{10,15}$/;
    return regex.test(phone.replace(/\s/g, ''));
}

// Permitir solo números en el campo de teléfono
document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Mostrar error
function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    field.classList.add('invalid');
    error.textContent = message;
    error.classList.add('show');
}

// Limpiar error
function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    field.classList.remove('invalid');
    error.classList.remove('show');
}

// Validar campo en tiempo real
function setupRealtimeValidation(fieldId, errorId, validationFn) {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => {
        if (!validationFn()) {
            field.classList.add('invalid');
        } else {
            clearError(fieldId, errorId);
        }
    });
    field.addEventListener('input', () => {
        if (field.classList.contains('invalid') && validationFn()) {
            clearError(fieldId, errorId);
        }
    });
}

// Configurar validaciones en tiempo real
setupRealtimeValidation('name', 'nameError', () => {
    const name = document.getElementById('name').value.trim();
    return name.length > 0;
});

setupRealtimeValidation('email', 'emailError', () => {
    const email = document.getElementById('email').value.trim();
    return isValidEmail(email);
});

setupRealtimeValidation('phone', 'phoneError', () => {
    const phone = document.getElementById('phone').value.trim();
    return isValidPhone(phone);
});

setupRealtimeValidation('subject', 'subjectError', () => {
    const subject = document.getElementById('subject').value;
    return subject !== '';
});

setupRealtimeValidation('message', 'messageError', () => {
    const message = document.getElementById('message').value.trim();
    return message.length > 0;
});

setupRealtimeValidation('terms', 'termsError', () => {
    return document.getElementById('terms').checked;
});

// Controlar estado del botón según checkbox de términos
const termsCheckbox = document.getElementById('terms');

function updateButtonState() {
    submitBtn.disabled = !termsCheckbox.checked;
}

// Inicializar botón deshabilitado
updateButtonState();

// Actualizar cuando cambie el checkbox
termsCheckbox.addEventListener('change', updateButtonState);

// Manejar envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Limpiar mensajes previos
    successMessage.classList.remove('show');
    
    // Obtener valores
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const terms = document.getElementById('terms').checked;

    let isValid = true;

    // Validar nombre
    if (name === '') {
        showError('name', 'nameError', 'Por favor ingresa tu nombre');
        isValid = false;
    } else {
        clearError('name', 'nameError');
    }

    // Validar email
    if (!isValidEmail(email)) {
        showError('email', 'emailError', 'Por favor ingresa un correo válido');
        isValid = false;
    } else {
        clearError('email', 'emailError');
    }

    // Validar teléfono
    if (!isValidPhone(phone)) {
        showError('phone', 'phoneError', 'Por favor ingresa un teléfono válido');
        isValid = false;
    } else {
        clearError('phone', 'phoneError');
    }

    // Validar asunto
    if (subject === '') {
        showError('subject', 'subjectError', 'Por favor selecciona un asunto');
        isValid = false;
    } else {
        clearError('subject', 'subjectError');
    }

    // Validar mensaje
    if (message === '') {
        showError('message', 'messageError', 'Por favor ingresa tu mensaje');
        isValid = false;
    } else {
        clearError('message', 'messageError');
    }

    // Validar términos
    if (!terms) {
        showError('terms', 'termsError', 'Debes aceptar los términos');
        isValid = false;
    } else {
        clearError('terms', 'termsError');
    }

    if (!isValid) return;

    // Preparar datos para enviar
    const formData = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        terms: terms
    };

    // Deshabilitar botón mientras se envía
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        // Aquí integrarás con tu backend
        // Ejemplo con fetch:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }

        const data = await response.json();
        */

        // Simulación de envío (eliminar en producción)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Datos del formulario:', formData);
        
        // Mostrar mensaje de éxito
        successMessage.classList.add('show');
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
    }
});
