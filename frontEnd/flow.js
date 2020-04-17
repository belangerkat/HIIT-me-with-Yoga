document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    const searchParam = new URLSearchParams(window.location.search)
    const id = searchParam.get('id')

    fetch("http://localhost:3000/poses", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        }
    })
    .then(response => response.json())
    .then(result => renderPoses(result))

    function renderPoses(poses) {
        const dataUl = document.querySelector('#data-ul')
        const poseCards = document.querySelector('.pose-cards')
        const directions = document.createElement('h1')
        directions.innerText = "CLICK POSES TO ADD THEM TO YOUR FLOW"
        poseCards.append(directions)
        poses.forEach(pose => {
            const poseCard = document.createElement('ul')
            const image = document.createElement('img')
            const name = document.createElement('div')
            const description = document.createElement('p')
            const poseId = pose.id
            image.className = 'pose-image'
            image.src = pose.image
            name.innerText = pose.name
            description.innerText = pose.description
            poseCard.append(image, name, description)
            poseCards.append(poseCard)
            poseCard.addEventListener('click', (event) => {
                console.log(localStorage.id)
                console.log(id)
                console.log(poseId)
                const flowPose = {flow_pose: {
                    user_id: localStorage.id,
                    yoga_flow_id: id,
                    pose_id: poseId
                }}
                fetch("http://localhost:3000/flow_poses", {
                    method: "POST",
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(flowPose)
                }).then(location.reload())
            })
            poseCard.append(image, name)
            poseCards.appendChild(poseCard)
        })
        dataUl.append(poseCards)
    }

    fetch(`http://localhost:3000/yoga_flows/${id}`)
    .then(response => response.json())
    .then(result => getFlowPoses(result))


    function getFlowPoses(yogaFlow) {
        const flowUl = document.querySelector('#flow-ul')
        const name = document.createElement('h1')
        name.innerText = yogaFlow.name
        let flowPoseArray = yogaFlow.flow_poses
        console.log(flowPoseArray)
        flowPoseArray.forEach(flowPose => {
            let poseId = flowPose.pose_id
            fetch(`http://localhost:3000/poses/${poseId}`)
            .then(response => response.json())
            .then(result => renderFlowPoses(result))
        })
        flowUl.appendChild(name)
        
    }
    function renderFlowPoses(pose) {
        const flowUl = document.querySelector('#flow-ul')
        const name = document.createElement('li')
        const image = document.createElement('img')
        name.innerText = pose.name
        image.src = pose.image
        flowUl.append(name, image)
    }
})