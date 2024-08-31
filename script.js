document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the ATIS letter field
    document.getElementById('atisLetter').addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });
});

function generateRequest() {
    // Retrieve values from the form fields
    const flightNumber = document.getElementById('flightNumber').value.trim();
    const atisLetter = document.getElementById('atisLetter').value.trim().toUpperCase();
    const acType = document.getElementById('acType').value.trim().toUpperCase();
    const departure = document.getElementById('departure').value.toUpperCase();
    const arrival = document.getElementById('arrival').value.toUpperCase();
    const stand = document.getElementById('stand').value.toUpperCase();
    const freeText = document.getElementById('freeText').value.trim();

    // Check if all required fields are filled
    if (!flightNumber || !atisLetter || !acType || !departure || !arrival || !stand) {
        showError("All fields except 'Additional Remarks' must be filled.");
        return; // Exit the function if validation fails
    }

    // Remove punctuation from freeText
    const cleanFreeText = removePunctuation(freeText);

    // Start constructing the request string
    let request = `REQUEST PREDEP CLEARANCE ${flightNumber} ${acType} TO ${arrival} AT ${departure} STAND ${stand} ATIS ${atisLetter}`;

    // Append free text if provided
    if (cleanFreeText) {
        request += ` RMK ${cleanFreeText}`;
    }

    // Display the formatted request
    document.getElementById('requestPreview').textContent = request;

    // Hide any previous error message
    document.getElementById('error-message').style.display = 'none';
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.opacity = '1';

    // Fade out the error message after 3 seconds
    setTimeout(() => {
        errorMessage.style.opacity = '0';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 1000); // Match the fade-out duration
    }, 3000); // Display for 3 seconds
}

function removePunctuation(text) {
    return text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

function capitalizeFreeText() {
    const freeTextElement = document.getElementById('freeText');
    freeTextElement.value = freeTextElement.value.toUpperCase();
}
