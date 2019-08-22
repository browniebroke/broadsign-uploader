import axios from "axios"

export async function handler(event, context, callback) {
  console.log("Handler starting")
  const bodyObj = JSON.parse(event.body)

  const requestData = {
    url: bodyObj.contentUrl,
    name: bodyObj.title,
    domain_id: bodyObj.domainId,
  }

  try {
    // Make the request
    console.log("About to send data...")
    const response = await axios.post(
      "https://api-sandbox.broadsign.com:10889/rest/content/v11/import_from_url",
      requestData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bodyObj.token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
    console.log("Received response %s", response)
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    }
  } catch (err) {
    if (err.response) {
      console.error("Received a status code > 2XX (%s)", err.message)
      // Respond with the same status code
      return {
        statusCode: err.response.status,
        body: JSON.stringify(err.response.data),
      }
    } else {
      const errMessage = err.request
        ? "The request did not receive a response: %s"
        : "Unexpected error when sending the request"
      console.error(errMessage, err)
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message }),
      }
    }
  }
}
