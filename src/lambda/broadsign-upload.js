import axios from "axios"

export async function handler(event, context, callback) {
  console.log("Handler starting")
  console.log(event.body)

  const bodyObj = JSON.parse(event.body)
  console.log(bodyObj)

  const data = {
    url: bodyObj.contentUrl,
    name: bodyObj.title,
    domain_id: bodyObj.domainId,
  }
  console.log(data)
  try {
    // Make the request
    const response = await axios.post(
      "https://api-sandbox.broadsign.com:10889/rest/content/v11/import_from_url",
      data,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bodyObj.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
    console.log(response)
    const data = response.data
    console.log(data)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
