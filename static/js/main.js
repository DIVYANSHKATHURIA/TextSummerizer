document.addEventListener('DOMContentLoaded', () => {
    const summarizeButton = document.getElementById('summarizeButton');
    const textInput = document.getElementById('textInput');
    const summaryLength = document.getElementById('threePointSlider');
    const resultTextarea = document.getElementById('resultTextarea');
    const copyButton = document.getElementById('copyButton');
    const inputWordCount = document.getElementById('inputWordCount');
    const wordCount = document.getElementById('wordCount');
    const form = document.getElementById('summarizeForm');
    const loadingOverlay = document.getElementById('loadingOverlay');

    summarizeButton.addEventListener('click', () => {
        loadingOverlay.style.display = 'flex';

        const formData = new FormData(form);

        fetch('https://textsummerizer.onrender.com/summerize', {  // Local development URL; change to production URL if needed
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultTextarea.value = data.result || 'Error occurred';
            wordCount.textContent = `Word Count: ${data.word_count || 0}`;
            inputWordCount.textContent = `Input Word Count: ${data.input_word_count || 0}`;
        })
        .catch(error => {
            resultTextarea.value = "An error occurred: " + error;
            wordCount.textContent = 'Word Count: 0';
            inputWordCount.textContent = 'Input Word Count: 0';
        })
        .finally(() => {
            loadingOverlay.style.display = 'none';
        });
    });

    copyButton.addEventListener('click', () => {
        resultTextarea.select();
        document.execCommand('copy');
        alert('Text copied to clipboard!');
    });

    textInput.addEventListener('input', () => {
        inputWordCount.textContent = `Input Word Count: ${textInput.value.trim().split(/\s+/).length}`;
    });
});
