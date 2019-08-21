import React, { useState } from "react"

const BroadsignForm = () => {
  const [domainId, setDomainId] = useState("")
  const [token, setToken] = useState("")
  const [contentUrl, setContentUrl] = useState("")
  const [title, setTitle] = useState("")
  const [result, setResult] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    setResult(null)
    console.log("Handle form submit")
    const bodyData = {
      contentUrl,
      title,
      domainId,
      token,
    }
    fetch("/.netlify/functions/broadsign-upload", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(json => setResult(json))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section">
        <label htmlFor="domain-id">Domain ID</label>
        <input
          type="text"
          name="domain-id"
          value={domainId}
          onChange={e => setDomainId(e.target.value)}
        />
      </div>
      <div className="form-section">
        <label htmlFor="token">Token</label>
        <input
          type="text"
          name="token"
          value={token}
          onChange={e => setToken(e.target.value)}
        />
      </div>
      <div className="form-section">
        <label htmlFor="content-url">Content URL</label>
        <input
          type="text"
          name="content-url"
          value={contentUrl}
          onChange={e => setContentUrl(e.target.value)}
        />
      </div>
      <div className="form-section">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-section">
        <input type="submit" value="Submit" />
      </div>
      <div className="form-section">{result && <pre>{result}</pre>}</div>
    </form>
  )
}

export default BroadsignForm
