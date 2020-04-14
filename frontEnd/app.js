const loginForm = document.querySelector('.login')

loginForm.addEventListener('submit', handleLogin)

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
    })
    
    fetch("http://localhost:3000/users", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
    })
    event.target.reset()
}
// function websiteLogo() {
//     const div = document.querySelector('#logo')
//     const logo = document.createElement('img')
//     logo.src = 'images/logo.png'
//     div.appendChild(logo)
// }
// websiteLogo()