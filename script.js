/* Global Variables */
var current_operand = "0" // used to determine the value of the current operand screen
var previous_operand = "" // used to determine the value of the previous operand screen
var point = false // used to determine if a point can be placed
var negate = false // used to determine if a number can be negated
var left_parentheses = false // used to determine if a left parenthese can be placed
var right_parentheses = true // used to determine if a right parenthese can be placed
var parenthesesState = 0 // used to determine if the user closed the parentheses

/* Set calculator display to 0 */
document.getElementById("current-operand").innerHTML = current_operand

/* If the user has not placed a point, it is placed, otherwise it does nothing */
document.getElementById("point").addEventListener('click', function(event) {
    if (point === false) {
        current_operand = current_operand + '.'
        point = true // Point is now placed
        updateCurrentOperand(current_operand)
    }
})

/* Appends the number the user pressed on the current operand screen */

document.getElementById("zero").addEventListener('click', function(event) {
    appendNumber("0")
})

document.getElementById("one").addEventListener('click', function(event) {
    appendNumber("1")
})

document.getElementById("two").addEventListener('click', function(event) {
    appendNumber("2")
})

document.getElementById("three").addEventListener('click', function(event) {
    appendNumber("3")
})

document.getElementById("four").addEventListener('click', function(event) {
    appendNumber("4")
})

document.getElementById("five").addEventListener('click', function(event) {
    appendNumber("5")
})

document.getElementById("six").addEventListener('click', function(event) {
    appendNumber("6")
})

document.getElementById("seven").addEventListener('click', function(event) {
    appendNumber("7")
})

document.getElementById("eight").addEventListener('click', function(event) {
    appendNumber("8")
})

document.getElementById("nine").addEventListener('click', function(event) {
    appendNumber("9")
})

document.getElementById("division").addEventListener('click', function(event) {
    operators("÷")
})

document.getElementById("times").addEventListener('click', function(event) {
    operators("×")
})

document.getElementById("minus").addEventListener('click', function(event) {
    operators("-")
})

document.getElementById("plus").addEventListener('click', function(event) {
    operators("+")
})

/* Calculates the result */
document.getElementById("equals").addEventListener('click', function(event) {
    if (previous_operand !== "") { // If the previous operand screen is empty, it does nothing, otherwise it calculates the result
        parenthesesState = (previous_operand.match(/\(/g) || []).length + (previous_operand.match(/\)/g) || []).length + (current_operand.match(/\)/g) || []).length // Calculates how many parentheses the user has placed

        if (parenthesesState % 2 == 0 === false) {
            current_operand = current_operand + ")" // If the user did not close the parentheses, then it does
        }

        if (current_operand.slice(0, 1) == "-") {
            current_operand = "(" + current_operand + ")" // If it is a negative number, it adds parentheses around it
        }

        expression = previous_operand + current_operand // Creates the final expression by adding the current operand
        expression = expression.replace(/÷/g, "/").replace(/×/g, "*") // Replaces these typical characters with others so the Eval function does not present an error 
        var result = eval(expression) // Calculates the result using the Eval function
        current_operand = result.toString() // Passes result as string so there are no errors
        previous_operand = previous_operand.slice(-1) // Set previous operand screen as empty
        previous_operand = previous_operand.slice(1)
        updatePreviousOperand(previous_operand)
        updateCurrentOperand(current_operand)
        
        if (current_operand.includes(".")) { // If there is a point in the result the user cannot place another one, otherwise they can
            point = true
        } else {
            point = false
        }

        if (current_operand == "NaN") { // If the result is an error, it will be displayed as 0
            current_operand = 0
            updateCurrentOperand(current_operand)
        }

        /* Set variable values to default */
        if (current_operand.includes("-")) { // If the result is negative, the user cannot negate it, otherwise they can
            negate = true
        } else {
            negate = false
        }

        /* Set variable values to default */
        left_parentheses = false
        right_parentheses = true
    }
})

document.getElementById("parentheses").addEventListener('click', function(event) {
    if (left_parentheses === false) { // If a left parentheses is not placed, it does
        current_operand = "(" + current_operand
        left_parentheses = true // Left parentheses is now placed
        updateCurrentOperand(current_operand)
        return
    } else if (right_parentheses === false) { // If a right parentheses is not placed, it does
        current_operand = current_operand + ")"
        right_parentheses = true // Right parentheses is now placed
        updateCurrentOperand(current_operand)
    }
})

document.getElementById("negate").addEventListener('click', function(event) {
    if (negate === false && current_operand.slice(0, 1) == "(") {
        current_operand = current_operand.slice(1)
        current_operand = "(-" + current_operand  // Places the minus sign inside the parentheses
        updateCurrentOperand(current_operand)
        negate = true // Number has been negated
        return
    }

    if (negate === false && current_operand != "0") {
        current_operand = "-" + current_operand // Negates the number
        updateCurrentOperand(current_operand)
        negate = true // Number has been negated
    }

    if (negate === false && current_operand == "0") {
        current_operand = "-0" // Negates zero
        updateCurrentOperand(current_operand)
        negate = true // Number has been negated
    }

    if (negate === false && current_operand == "(0") {
        current_operand = "(-0" // Places the minus sign inside the parentheses
        updateCurrentOperand(current_operand)
        negate = true // Number has been negated
    }
})

/* Deletes the last character of the current operand screen */
document.getElementById("delete").addEventListener('click', function(event) {
    if (current_operand == "0") return // If the number is zero, it does nothing

    if (current_operand == "(0") {
        current_operand = 0

        // Set variable values to default
        point = false
        left_parentheses = false
        right_parentheses = true
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand.length = 2 && current_operand.slice(0, 1) == "(" && current_operand.slice(0, 2) == "(0" === false) { // If there is only one parentheses and a number that is not zero, it will be replaced by "(0"
        current_operand = "(0"

        // Set variable values to default
        point = false
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand == "-0)") {
        current_operand = "-0"

        // Set variable values to default
        point = false
        left_parentheses = true
        right_parentheses = false
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand == "(-0") {
        current_operand = "(0"

        // Set variable values to default
        point = false
        negate = false
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand == "(-0.") {
        current_operand = "(-0"

        // Set variable values to default
        point = false
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand == "-0") {
        current_operand = "0"

        // Set variable values to default
        point = false
        negate = false
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand.length == 3 && current_operand.slice(0, 2) == "(-" && current_operand.slice(0, 3) != "(-0") { // If there is only one parentheses and a negative number that is not zero, it will be replaced by "(-0"
        current_operand = "(-0"
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand.length != 1 && current_operand.length != 2) { // If a number has 3 characters or more, remove the last character, and if it is a point, it can be placed again
        // If a point will be deleted, it can be placed again
        if (current_operand.slice(-1) == ".") {
            point = false
        }

        current_operand = current_operand.slice(0, -1)
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand.length == 1) { // If there is only one number, it will be replaced by zero
        current_operand = '0'
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand.length == 2 && current_operand.slice(0, 1) != "-") { // If a non-negative number has two characters, remove the last character, and if it is a point, it can be placed again
        // If a point will be deleted, it can be placed again
        if (current_operand.slice(-1) == ".") {
            point = false
        }

        current_operand = current_operand.slice(0, -1)
        updateCurrentOperand(current_operand)
        return
    }

    if (current_operand.length == 2 && current_operand.slice(0, 1) == "-") { // If there is only one negative number, it will be replaced by zero
        current_operand = "0"
        negate = false
        updateCurrentOperand(current_operand)
        return
    }
})

/* Clear the screen */
document.getElementById("all-clear").addEventListener('click', function(event) {
    // Set variable values to default
    current_operand = "0"
    previous_operand = previous_operand.slice(-1)
    previous_operand = previous_operand.slice(1)
    point = false
    negate = false
    left_parentheses = false
    right_parentheses = true
    updateCurrentOperand(current_operand)
    updatePreviousOperand(previous_operand)
})

/* Updates current operand screen */
function updateCurrentOperand(value) {
    document.getElementById("current-operand").innerHTML = value
}

/* Updates previous operand screen */
function updatePreviousOperand(value) {
    document.getElementById("previous-operand").innerHTML = value
}

// Appends the number to current operand screen
function appendNumber(number) {
    /* If the number is not equal zero, it appends a number */
    if (current_operand != "0" && current_operand != "-0" && current_operand != "(0" && current_operand != "0)" && current_operand != "(-0" && current_operand != "-0)") {
        current_operand = current_operand + number
        updateCurrentOperand(current_operand)
    /* If the number is equal zero, it is replaced by another number */
    } else if (current_operand == "0"){
        current_operand = number
        updateCurrentOperand(current_operand)
    } else if (current_operand == "-0"){
        current_operand = "-" + number
        updateCurrentOperand(current_operand)
    } else if (current_operand == "(0") {
        current_operand = "(" + number
        updateCurrentOperand(current_operand)
    } else if (current_operand == "0)") {
        current_operand = number + ")"
        updateCurrentOperand(current_operand)
    } else if (current_operand == "(-0") {
        current_operand = "(-" + number
        updateCurrentOperand(current_operand)
    } else if (current_operand == "-0)") {
        current_operand = "-" + number + ")"
        updateCurrentOperand(current_operand)
    }
}

/* Appends operator to current operand screen */
function operators(operator) {
    /* If 0 has a minus sign attached to it, it is removed */
    if (current_operand == "-0") {
        current_operand = "0"
    }

    if (current_operand == "(-0") {
        current_operand = "(0"
    }

    if (current_operand == "-0)") {
        current_operand = "0)"
    }

    if (current_operand.slice(-1) == ".") { // If last character is a point, it is removed
        current_operand = current_operand.slice(0, -1)
    }

    if (current_operand.slice(-2) == ".)") { // If penultimate character is a point, it is removed
        current_operand = current_operand.slice(0, -2)
        current_operand = current_operand + ")"
    }

    if (current_operand.slice(0, 1) == "-") { // If number is negative, it is placed in parentheses
        current_operand = "(" + current_operand + ")"
    }

    appendExpressions(operator)
}

function appendExpressions(operator) {
    previous_operand = previous_operand + " " + current_operand + " " + operator // Appends current operand number and operator to previous operand screen

    if (left_parentheses === true && right_parentheses === false) { // If the user did not close the parentheses, they cannot start another one
        right_parentheses = false
    }

    if (right_parentheses === true && left_parentheses === false) { // If the user closed the parentheses, they can start another one
        left_parentheses = false
    }

    parenthesesState = (previous_operand.match(/\(/g) || []).length + (previous_operand.match(/\)/g) || []).length // Calculates how many parentheses the user placed

    if (left_parentheses === true && right_parentheses === true && (parenthesesState % 2 == 0 === false)) { // If the user did not close the parentheses, they cannot start another one
        left_parentheses = true
        right_parentheses = false
    }

    if (left_parentheses === true && right_parentheses === true && (parenthesesState % 2 == 0 === true)) { // If the user closed the parentheses, they can start another one
        left_parentheses = false
        right_parentheses = true
    }

    /* Set variable values to default and updates screen */
    current_operand = "0"
    point = false
    negate = false
    updateCurrentOperand(current_operand)
    updatePreviousOperand(previous_operand)
}