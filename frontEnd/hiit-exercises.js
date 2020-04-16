document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
    fetch("http://localhost:3000/exercises")
    .then(response => response.json())
    .then(result => renderExercises(result))

    function renderExercises(exercises) {
        const exerciseCards = document.createElement('ul')
        exerciseCards.className = 'exercise-cards'
        exercises.forEach(exercise => {
            const exerciseCard = document.createElement('li')
            exerciseCard.className = 'card'
            const image = document.createElement('img')
            image.className = 'exercise-image'
            const name = document.createElement('div')
            name.innerText = exercise.name
            image.src = exercise.image
            exerciseCard.append(image, name)
            exerciseCards.appendChild(exerciseCard)
        })
        document.body.appendChild(exerciseCards)
    }
})
