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
        const poseCards = document.createElement('ul')
        poseCards.className = 'pose-cards'
        const directions = document.createElement('li')
        directions.innerText = "CLICK POSES TO ADD THEM TO YOUR FLOW"
        poses.forEach(pose => {
            const poseCard = document.createElement('li')
            poseCard.className = 'card'
            const image = document.createElement('img')
            image.className = 'pose-image'
            const poseId = pose.id
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
            const name = document.createElement('div')
            name.innerText = pose.name
            image.src = pose.image
            poseCard.append(image, name)
            poseCards.appendChild(poseCard)
        })
        document.body.append(directions, poseCards)
    }

    fetch(`http://localhost:3000/yoga_flows/${id}`)
    .then(response => response.json())
    .then(result => getFlowPoses(result))


    function getFlowPoses(yogaFlow) {
        const flowUl = document.querySelector('#flow-ul')
        const name = document.createElement('li')
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