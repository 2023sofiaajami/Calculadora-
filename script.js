// ==========================================
// CALCULADORA CIENTÍFICA
// ==========================================


// Obtener la pantalla

const display = document.getElementById("display");


// Variables de la calculadora

let current = "0";

let previous = null;

let operator = null;

let waitingForOperand = false;

let memory = 0;


// ==========================================
// ACTUALIZAR PANTALLA
// ==========================================

function updateDisplay() {

    display.textContent = current;

}


// ==========================================
// INGRESAR NÚMEROS
// ==========================================

function inputNumber(value) {

    // Si estamos esperando un nuevo número

    if (waitingForOperand) {

        current =
            value === "."
                ? "0."
                : value;

        waitingForOperand = false;

        return;
    }


    // Evitar dos puntos

    if (
        value === "." &&
        current.includes(".")
    ) {

        return;
    }


    // Reemplazar el cero inicial

    if (
        current === "0" &&
        value !== "."
    ) {

        current = value;

    } else {

        current += value;

    }

}


// ==========================================
// SELECCIONAR OPERACIÓN
// ==========================================

function setOperator(nextOperator) {

    const inputValue =
        Number(current);


    // Cambiar operador

    if (
        operator &&
        waitingForOperand
    ) {

        operator =
            nextOperator;

        return;
    }


    // Guardar primer número

    if (previous === null) {

        previous =
            inputValue;

    }

    // Realizar operación anterior

    else if (operator) {

        const result =
            calculate(
                previous,
                inputValue,
                operator
            );

        current =
            formatResult(result);

        previous =
            result;
    }


    operator =
        nextOperator;

    waitingForOperand =
        true;

}


// ==========================================
// REALIZAR OPERACIONES
// ==========================================

function calculate(a, b, op) {

    switch (op) {

        case "add":

            return a + b;


        case "subtract":

            return a - b;


        case "multiply":

            return a * b;


        case "divide":

            if (b === 0) {

                return NaN;

            }

            return a / b;


        case "power":

            return Math.pow(a, b);


        default:

            return b;
    }

}


// ==========================================
// IGUAL
// ==========================================

function equals() {

    if (
        operator === null ||
        previous === null
    ) {

        return;
    }


    const result =
        calculate(
            previous,
            Number(current),
            operator
        );


    current =
        formatResult(result);


    previous =
        null;

    operator =
        null;

    waitingForOperand =
        true;

}


// ==========================================
// FORMATEAR RESULTADO
// ==========================================

function formatResult(value) {

    // Error matemático

    if (
        !Number.isFinite(value)
    ) {

        return "Error";
    }


    // Evitar demasiados decimales

    return String(
        Number(
            value.toPrecision(12)
        )
    );

}


// ==========================================
// FUNCIONES CIENTÍFICAS
// ==========================================

function unaryOperation(action) {

    const value =
        Number(current);

    let result;


    switch (action) {


        // --------------------------
        // RAÍZ CUADRADA
        // --------------------------

        case "sqrt":

            if (value < 0) {

                result = NaN;

            } else {

                result =
                    Math.sqrt(value);

            }

            break;


        // --------------------------
        // PORCENTAJE
        // --------------------------

        case "percent":

            result =
                value / 100;

            break;


        // --------------------------
        // CUADRADO
        // --------------------------

        case "square":

            result =
                value ** 2;

            break;


        // --------------------------
        // SENO
        // --------------------------

        case "sin":

            result =
                Math.sin(
                    toRadians(value)
                );

            break;


        // --------------------------
        // COSENO
        // --------------------------

        case "cos":

            result =
                Math.cos(
                    toRadians(value)
                );

            break;


        // --------------------------
        // TANGENTE
        // --------------------------

        case "tan":

            result =
                Math.tan(
                    toRadians(value)
                );

            break;


        // --------------------------
        // LOGARITMO
        // --------------------------

        case "log":

            if (value <= 0) {

                result = NaN;

            } else {

                result =
                    Math.log10(value);

            }

            break;


        // --------------------------
        // LOGARITMO NATURAL
        // --------------------------

        case "ln":

            if (value <= 0) {

                result = NaN;

            } else {

                result =
                    Math.log(value);

            }

            break;


        // --------------------------
        // PI
        // --------------------------

        case "pi":

            result =
                Math.PI;

            break;


        default:

            return;
    }


    current =
        formatResult(result);


    waitingForOperand =
        true;

}


// ==========================================
// CONVERTIR GRADOS A RADIANES
// ==========================================

function toRadians(degrees) {

    return (
        degrees *
        Math.PI /
        180
    );

}


// ==========================================
// BORRAR TODO
// ==========================================

function clearAll() {

    current = "0";

    previous = null;

    operator = null;

    waitingForOperand = false;

}


// ==========================================
// BORRAR ÚLTIMO CARÁCTER
// ==========================================

function deleteLast() {

    if (
        waitingForOperand ||
        current === "Error"
    ) {

        current = "0";

        waitingForOperand = false;

        return;
    }


    if (current.length > 1) {

        current =
            current.slice(0, -1);

    } else {

        current = "0";

    }

}


// ==========================================
// MEMORIA
// ==========================================

function memoryAction(action) {

    const value =
        Number(current);


    // M+

    if (
        action === "memory-add"
    ) {

        memory += value;
    }


    // M-

    if (
        action === "memory-subtract"
    ) {

        memory -= value;
    }


    // MR

    if (
        action === "memory-recall"
    ) {

        current =
            formatResult(memory);

        waitingForOperand =
            true;
    }


    // MC

    if (
        action === "memory-clear"
    ) {

        memory = 0;
    }

}


// ==========================================
// MANEJAR BOTONES
// ==========================================

function handleAction(action) {

    switch (action) {


        // OPERACIONES

        case "add":

        case "subtract":

        case "multiply":

        case "divide":

        case "power":

            setOperator(action);

            break;


        // IGUAL

        case "equals":

            equals();

            break;


        // BORRAR

        case "clear":

            clearAll();

            break;


        // DELETE

        case "delete":

            deleteLast();

            break;


        // FUNCIONES CIENTÍFICAS

        case "sqrt":

        case "percent":

        case "square":

        case "sin":

        case "cos":

        case "tan":

        case "log":

        case "ln":

        case "pi":

            unaryOperation(action);

            break;


        // MEMORIA

        case "memory-add":

        case "memory-subtract":

        case "memory-recall":

        case "memory-clear":

            memoryAction(action);

            break;
    }


    updateDisplay();

}


// ==========================================
// BOTONES
// ==========================================

const buttons =
    document.querySelectorAll(
        ".key, .clear"
    );


buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            // Número

            const value =
                button.dataset.value;


            // Acción

            const action =
                button.dataset.action;


            if (
                value !== undefined
            ) {

                inputNumber(value);

                updateDisplay();

                return;
            }


            handleAction(action);

        }
    );

});


// ==========================================
// USAR TECLADO
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key;


        // Números

        if (
            /^[0-9.]$/.test(key)
        ) {

            inputNumber(key);

        }


        // Suma

        else if (
            key === "+"
        ) {

            setOperator("add");

        }


        // Resta

        else if (
            key === "-"
        ) {

            setOperator("subtract");

        }


        // Multiplicación

        else if (
            key === "*"
        ) {

            setOperator("multiply");

        }


        // División

        else if (
            key === "/"
        ) {

            event.preventDefault();

            setOperator("divide");

        }


        // Igual

        else if (
            key === "Enter" ||
            key === "="
        ) {

            equals();

        }


        // Escape = borrar

        else if (
            key === "Escape"
        ) {

            clearAll();

        }


        // Backspace

        else if (
            key === "Backspace"
        ) {

            deleteLast();

        }


        // Si no es ninguna tecla válida

        else {

            return;

        }


        updateDisplay();

    }
);
