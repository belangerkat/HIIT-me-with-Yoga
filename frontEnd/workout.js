console.log("helllll yaaaaa brotherrrr")

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    const searchParam = new URLSearchParams(window.location.search)
    const id = searchParam.get('id')

    fetch("http://localhost:3000/exercises", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
    })
    .then(response => response.json())
    .then(result => renderExercises(result))

    function renderExercises(exercises) {
        const dataUl = document.querySelector('#data-ul')
        const exerciseCards = document.querySelector('.exercise-cards')
        const directions = document.createElement('h1')
        directions.innerText = "CLICK EXERCISES TO ADD THEM TO YOUR WORKOUT"
        exerciseCards.append(directions)
        exercises.forEach(exercise => {
            const exerciseCard = document.createElement('ul')
            const image = document.createElement('img')
            const name = document.createElement('div')
            const description = document.createElement('p')
            const exerciseId = exercise.id
            image.className = 'exercise-image'
            image.src = exercise.image
            name.innerText = exercise.name
            description.innerText = exercise.description
            exerciseCard.append(image, name, description)
            exerciseCards.append(exerciseCard)
            exerciseCard.addEventListener('click', (event) => {
                console.log(localStorage.id)
                console.log(id)
                console.log(exerciseId)
                const workoutExercise = {workout_exercises: {
                    user_id: localStorage.id,
                    hiit_workout_id: id,
                    exercise_id: exerciseId
                }}
                fetch("http://localhost:3000/workout_exercises", {
                    method: "POST",
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(workoutExercise)
                }).then(location.reload())
            })
        })
        dataUl.append(exerciseCards)
    }

    fetch(`http://localhost:3000/hiit_workouts/${id}`)
    .then(response => response.json())
    .then(result => getWorkoutExercises(result))


    function getWorkoutExercises(hiitWorkout) {
        const workoutUl = document.querySelector('#workout-ul')
        const name = document.createElement('h1')
        name.innerText = hiitWorkout.name
        console.log(hiitWorkout)
        let workoutExerciseArray = hiitWorkout.workout_exercises
        console.log(workoutExerciseArray)
        workoutExerciseArray.forEach(workoutExercise => {
            let exerciseId = workoutExercise.exercise_id
            fetch(`http://localhost:3000/exercises/${exerciseId}`)
            .then(response => response.json())
            .then(result => renderWorkoutExercises(result))
        })
        workoutUl.appendChild(name)
        
    }
    function renderWorkoutExercises(exercise) {
        const workoutUl = document.querySelector('#workout-ul')
        const name = document.createElement('li')
        const image = document.createElement('img')
        name.innerText = exercise.name
        image.src = exercise.image
        workoutUl.append(name, image)
    }
})