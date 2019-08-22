import axios from "axios"

export async function handler(event, context, callback) {
  console.log("Handler starting")
  const bodyObj = JSON.parse(event.body)

  try {
    // Make the request
    console.log("About to send data...")
    const response = await axios.get(
      "https://api.broadsign.com:10889/rest/user/v12/self",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bodyObj.token}`,
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
