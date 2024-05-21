// Check if the browser supports the Web Speech API
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const startButton = document.getElementById('startButton');
    const textbox = document.getElementById('textbox');

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
        startButton.textContent = 'Listening...';
    };

    recognition.onend = function () {
        startButton.textContent = 'Start Listening';
    };

    recognition.onresult = function (event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                textbox.value += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        textbox.value += interimTranscript;
    };

    startButton.addEventListener('click', function () {
        recognition.start();
    });
} else {
    alert('Your browser does not support the Web Speech API');
}