import React, {useState, useEffect} from "react";
import SelectInput from "../SelectInput";
import axios from "axios";

function DevForm({onSubmit}) {
  const [github_username, setGithubUsername] = useState('')
  const [techs, setTechs] = useState([])
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      console.err, { timeout: 30000 }
    )
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    })

    setGithubUsername('')
    setTechs([])
  }

  useEffect(() => { callGithub() }, [])
  function callGithub(){
    const code = new URLSearchParams(window.location.search).get("code")

    if(code) {
      const params = `client_id=603fd0d5f335bab20467&client_secret=a12c792fd70900c01d27c72fe942914da20c087e&code=${code}`

      axios.post(`https://github.com/login/oauth/access_token?${params}`)
      .then(response => {
        const token = response.data.access_token
        console.log(token)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          required
        />
        <a type="button" href="https://github.com/login/oauth/authorize?client_id=603fd0d5f335bab20467">Tentar com seu login</a>
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <SelectInput value={techs} onChange={value => setTechs(value)}/>
      </div>

      <div className="input-block">
        <div className="map">
          {/* TODO: Colocar o mapa aqui */}
        </div>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            id="latitude"
            type="number"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            disabled
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            id="longitude"
            type="number"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            disabled
            required
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
}

export default DevForm
