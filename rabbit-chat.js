**rabbit-chat.js**:
```js
const chat = document.getElementById("chat");
const userInput = document.getElementById("user-input");
let currentQuestionIndex = 0;
let retry = false;

function addMessage(text, sender, emoji = "") {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerHTML = emoji + " " + text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function askQuestion() {
    const questions = [
        { q: "מה ההורים כל הזמן אומרים בשיר ההורים המקטרים?", a: ["צריך"] },
        { q: "מה איתמר מלמד את הארנב לעשות בשיר החולצה?", a: ["חולצה"] },
    ];
    addMessage(questions[currentQuestionIndex].q, "rabbit");
}

function sendAnswer() {
    const answer = userInput.value.trim();
    if (!answer) return;
    addMessage(answer, "user");
    userInput.value = "";

    if (questions[currentQuestionIndex].a.some(word => answer.toLowerCase().includes(word.toLowerCase()))) {
        addMessage("נכון מאוד! 😊", "rabbit", "✅");
        currentQuestionIndex++;
        retry = false;
        if (currentQuestionIndex < questions.length) {
            setTimeout(askQuestion, 1000);
        } else {
            addMessage("כל הכבוד, סיימת את המשחק! 🎉", "rabbit");
        }
    } else {
        if (retry) {
            addMessage("לא נכון.. אבל לא נורא! נמשיך הלאה. 😊", "rabbit", "❌");
            currentQuestionIndex++;
            retry = false;
            setTimeout(askQuestion, 1000);
        } else {
            addMessage("לא נכון... נסה שוב. 😢", "rabbit", "❌");
            retry = true;
        }
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendAnswer();
    }
}

askQuestion();
