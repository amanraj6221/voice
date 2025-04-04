function runSpeechRecognition() {
    var output = document.getElementById("output");
    var action = document.getElementById("action");

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        action.innerHTML = "<small>Listening, please speak...</small>";
    };

    recognition.onspeechend = function () {
        action.innerHTML = "<small>Stop</small>";
        recognition.stop();
    };

    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        output.value = transcript; 
    };

    recognition.onerror = function (event) {
        action.innerHTML = "<small>Error: " + event.error + "</small>";
        console.error("Speech recognition error:", event.error);
    };

    recognition.start();
}



function convertTextToWords() {
    var outputText = document.getElementById("output").value;
    var wordPopup = document.getElementById("wordPopup");

    if (!outputText.trim()) {
        wordPopup.innerHTML = "<span style='color: red;'>No text to convert. Please enter or speak something.</span>";
        return;
    }

    var words = outputText.split(" ");
    wordPopup.innerHTML = ""; 

    let index = 0;

    function displayWord() {
        if (index < words.length) {
            wordPopup.innerHTML = words[index];
            index++;
            setTimeout(displayWord, 1500); 
        }
    }

    displayWord(); 
}
