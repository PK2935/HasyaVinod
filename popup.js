const jokeElement = document.getElementById('joke');
const newJokeButton = document.getElementById('new-joke');
const copyJokeButton = document.getElementById('copy-joke');

async function getJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    return data;
}

function displayJoke() {
    newJokeButton.disabled = true;
    copyJokeButton.disabled = true;
    newJokeButton.textContent = 'Loading...';
    getJoke()
        .then(data => {
            jokeElement.textContent = `${data.setup} ${data.punchline}`;
            newJokeButton.disabled = false;
            newJokeButton.textContent = 'New Joke';
            copyJokeButton.disabled = false;
        });
}

function copyJoke() {
    const jokeText = jokeElement.textContent;
    navigator.clipboard.writeText(jokeText)
        .then(() => {
            copyJokeButton.textContent = 'Copied!';
            setTimeout(() => {
                copyJokeButton.textContent = 'Copy Joke';
            }, 1000);
        })
        .catch(error => {
            console.error(error);
            copyJokeButton.textContent = 'Error';
        });
}

newJokeButton.addEventListener('click', displayJoke);
copyJokeButton.addEventListener('click', copyJoke);

function init() {
    displayJoke();
}

init();