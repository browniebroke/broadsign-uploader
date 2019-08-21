import React, { useState } from 'react';

const BroadsignForm = () => {
  const [domainId, setDomainId] = useState('');
  const [token, setToken] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [title, setTitle] = useState('');
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
    fetch(
      "/.netlify/functions/broadsign-upload",
      {
        method: "POST",
        headers: { "Accept": "application/json"},
        body: JSON.stringify(bodyData),
      }
    )
      .then(response => response.json())
      .then(json => setResult(json))
  }

  return (
      <form onSubmit={handleSubmit}>
        <label>
          Domain ID
          <input type="text" value={domainId} onChange={(e) => setDomainId(e.target.value)}/>
        </label>
        <br/>
        <label>
          Token
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)}/>
        </label>
        <br/>
        <label>
          Content URL
          <input type="text" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)}/>
        </label>
        <br/>
        <label>
          Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </label>
        <br/>
        <input type="submit" value="Submit"/>
        {result && <pre>{result}</pre>}
      </form>
    )
}

export default BroadsignForm
