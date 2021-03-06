const mainContainer = document.querySelector(".container")

const applicationState = {
    teams: [],
    players: [],
    teamScores: [],
    state: {}
}

const API = "https://coral-app-qn2zm.ondigitalocean.app"

export const sendTeamScores = (teamSubmission) => {
    const fetchOptions = {
        method: "POST", //creation request, "please create"
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamSubmission)
    }
    return fetch(`${API}/teamScores`,
        fetchOptions) //here's the url i wanna send a request to
        .then(response => response.json()) //when response happens, returns string of json data, string => data structure(response.json)
        .then(() => { //then, do this (alert! things have changed)
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchTeams = () => {
    return fetch(`${API}/teams`) //default method is GET = i want data, give it to me please, give all of the requests
        .then(response => response.json()) //returns array of objects in this scenario
        .then(
            (teams) => { //array of objects is the argument here
                // Store the external state in application state
                applicationState.teams = teams //put in transient state
            }
        )
}

export const fetchPlayers = () => {
    return fetch(`${API}/players`) //default method is GET = i want data, give it to me please, give all of the requests
        .then(response => response.json()) //returns array of objects in this scenario
        .then(
            (players) => { //array of objects is the argument here
                // Store the external state in application state
                applicationState.players = players //put in transient state
            }
        )
}

export const fetchTeamScores = () => {
    return fetch(`${API}/teamScores`) //default method is GET = i want data, give it to me please, give all of the requests
        .then(response => response.json()) //returns array of objects in this scenario
        .then(
            (scores) => { //array of objects is the argument here
                // Store the external state in application state
                applicationState.teamScores = scores //put in transient state
            }
        )
}






export const getTeams = () => {
    return applicationState.teams.map(team => ({ ...team }))
}

export const getPlayers = () => {
    return applicationState.players.map(player => ({ ...player }))
}

export const getTeamScores = () => {
    return applicationState.teamScores.map(score => ({ ...score }))
}

export const getState = () => {
    return { ...applicationState.state }
}

export const setTeamId = (id) => {
    applicationState.state.teamId = id
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setSelectedTeams = (obj) => {
    applicationState.state.selectedTeams = obj
}

export const setStartGame = (boolean) => {
    applicationState.state.startGame = boolean

}

export const setRoundNumber = (number) => {
    applicationState.state.roundNumber = number
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setTeamScores = (object) => {
    applicationState.state.teamScores = object

}



export const updateTeamScores = (score, teamId) => {

    fetch(`http://localhost:8088/teamScores/${teamId}`, {
        method: "PATCH", //please create this object I sent you in permanent state
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "score": score
        })
    })
    .then(response => response.json()) //when response happens, returns string of json data, string => data structure(response.json)
        .then(() => { //then, do this (alert! things have changed)
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendTeam = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/teams`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}


export const sendPlayer = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/players`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}