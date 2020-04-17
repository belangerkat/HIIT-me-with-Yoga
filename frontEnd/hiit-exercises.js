document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
    
    fetch(`http://localhost:3000/users/${localStorage.id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
    }).then(response => response.json())
    .then(result => renderWorkouts(result))

    function renderWorkouts(user) {
        const banner = document.querySelector('.banner')
        console.log(user)
        let workoutArray = user.hiit_workouts
        console.log(workoutArray)
        workoutArray.forEach(workout => {
            console.log(workout)
            const userWorkout = document.querySelector('.banner-head')
            
            const workoutName = document.createElement('h1')
            workoutName.innerHTML = `<a href='workout.html?id=${workout.id}'>${workout.name}</a>`
            userWorkout.appendChild(workoutName)
        })
    }
})
