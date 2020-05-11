document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
    
    const loginForm = document.querySelector('.login')
    const create = document.querySelector('.create')
    const workouts = document.querySelector('.workout-options')

    loginForm.addEventListener('submit', handleLogin)
    create.addEventListener('click', createNav)

    function handleLogin(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const username = formData.get('username')
        const password = formData.get('password')
        const loginBody = {username, password}
        
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginBody)
        }).then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("token", result.token)
            localStorage.setItem("id", result.user_id)
        })

        
        event.target.reset()
    }

    function createNav(event) {
        event.preventDefault()
        workouts.scrollIntoView()
    }
})  

// heyyyy