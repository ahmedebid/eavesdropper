// Select the div with the "words" class
const words = document.querySelector(".words");
// Select the paragraph
let p = document.querySelector("p");
// Select the erase button
const eraseButton = document.querySelector("button");

// Allow working with different browsers (e.g in Firefox it is called "SpeechRecognition" 
// while in Chrome it is called "webkitSpeechRecognition")
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create an instance of SpeechRecognition()
const recognition = new SpeechRecognition();

// Allow showing the text results while speaking (not after you finish speaking)
recognition.interimResults = true;

// Start listening to the user's speech
recognition.start();

// Listen to the "result" event of the Web Speech API which is fired 
// when the speech recognition service returns a result
recognition.addEventListener("result", e => {

    // Convert "e.results" to an array
    const transcript = Array.from(e.results)
        // Map over the array to get the "SpeechRecognitionAlternative" array
        .map(result => result[0])
        // Map over the "SpeechRecognitionAlternative" array to get the "transcript" array
        .map(result => result.transcript)
        // Join the array elements into a string
        .join("")

    // Update the paragraph text with the "transcript". 
    // .textContent is used here instead of .innerText to avoid "Reflow" 
    p.textContent = transcript;

    // When the speaking is finished, create a new paragraph to hold the new speech
    if (e.results[0].isFinal) {
        p = document.createElement("p");
        words.append(p);
    }
});

// Listen to the "end" event of the Web Speech API which is fired when 
// the speech recognition service has disconnected and start the service again
recognition.addEventListener("end", recognition.start);

// Erase all the text when the "Erase" button is clicked
eraseButton.addEventListener("click", function() {
    const paragraphs = document.querySelectorAll("p");
    for (const paragraph of paragraphs) {
        // Select the parentElement of the paragraph and then remove the paragraph from it
        paragraph.parentElement.removeChild(paragraph);
    }
    // Add a new paragraph to receive the new speech
    p = document.createElement("p");
    words.append(p);
})