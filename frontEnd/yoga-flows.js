document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    fetch(`http://localhost:3000/users/${localStorage.id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
    }).then(response => response.json())
    .then(result => renderFlows(result))

    function renderFlows(user) {
        const banner = document.querySelector('.banner')
        console.log(user)
        let flowArray = user.yoga_flows
        console.log(flowArray)
        flowArray.forEach(flow => {
            const userFlow = document.querySelector('.banner-head')
            // const userFlow = document.createElement('div')
            // userFlow.className = 'user-flow'
            const flowName = document.createElement('h1')
            flowName.innerHTML = `<a href='flow.html?id=${flow.id}'>${flow.name}</a>`
            userFlow.appendChild(flowName)
        })
    }
})