import axios from "axios"

export async function handler(event, context, callback) {
  console.log("Handle form submit")

  const data = {
    "url": event.body.contentUrl,
    "name": event.body.title,
    "domain_id": event.body.domainId,
  }
  console.log(data)
  // Make the request
  const response = await axios.post(
    "https://api-sandbox.broadsign.com:10889/rest/content/v11/import_from_url",
    data,
    {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${event.body.token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    },
  )
  console.log(response)
  const result = await response.json()
}
