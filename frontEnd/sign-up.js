document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    const signUpForm = document.querySelector('.sign-up-form')
    signUpForm.addEventListener('submit', createUser)

    function createUser(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const username = formData.get('username')
        const password = formData.get('password')
        const user = {user: {
          username: username, 
          password: password
        }}
        console.log(user)
        addUser(user)
        event.target.reset()
    }
    function addUser(user) {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }).then(message)
    }
    function message() {
      const success = document.createElement('p1')
      success.innerText = "Successfully Created Account!"
      const homeButton = document.createElement('a')
      homeButton.innerText = "HOME"
      homeButton.href = "index.html"
      document.body.append(success, homeButton)
    }
})