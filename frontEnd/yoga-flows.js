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
        console.log(user)
        let flowArray = user.yoga_flows
        console.log(flowArray)
        flowArray.forEach(flow => {
            const user_flow = document.createElement('ul')
            user_flow.className = 'user-flow'
            const flowName = document.createElement('li')
            flowName.innerHTML = `<a href='flow.html?id=${flow.id}'>${flow.name}</a>`
    
            // fetch(`http://localhost:3000/yoga_flows/${flowId}`)
            // .then(response => response.json())
            // .then(console.log)
            user_flow.appendChild(flowName)
            document.body.appendChild(user_flow)
        })
        const createFlowForm = document.createElement('a')
        createFlowForm.innerText = "CREATE A NEW YOGA FLOW"
        createFlowForm.href = "new-flow.html"
        document.body.appendChild(createFlowForm)

        

    }
})