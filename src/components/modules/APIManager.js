const remoteURL = "http://localhost:5002"

export default {
  get (resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`).then(e => e.json())
  },

  getPlaylist (code) {
    return fetch(`${remoteURL}/playlists?access_code=${code}`)
    .then(e => e.json())
  },

  getAll (resource) {
    return fetch(`${remoteURL}/${resource}`).then(e => e.json())
  },

  delete (resource, id) {
    return fetch(`http://localhost:5002/${resource}/${id}`, {
        method: "DELETE"
    })
    .then(data => data.json())
    .then(() => fetch(`${remoteURL}/${resource}`))
    .then(data => data.json());
  },

  post(resource, newObject) {
    return fetch(`${remoteURL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    }).then(data => data.json())
  },

  put(resource, editedObject) {
    return fetch(`${remoteURL}/${resource}/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObject)
    }).then(data => data.json());
  },

    // removeAndList (id) {
    //     return fetch(`http://localhost:5002/animals/${id}`, {
    //         method: "DELETE"
    //     })
    //     .then(e => e.json())
    //     .then(() => fetch(`http://localhost:5002/animals`))
    //     .then(e => e.json())
    //     .then(animals => this.setState({
    //         animals: animals
    //         })
    //     )
    // }
}