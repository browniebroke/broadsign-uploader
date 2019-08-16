import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


class BroadsignForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      domainId: "",
      token: "",
      contentUrl: "",
      title: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event, key) {
    this.setState({ [key]: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log("Handle form submit")
    const data = {
      "url": this.state.contentUrl,
      "name": this.state.title,
      "domain_id": this.state.domainId,
    }
    console.log(data)
    // Make the request
    const response = await fetch(
      "https://api-sandbox.broadsign.com:10889/rest/content/v11/import_from_url",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${this.state.token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      },
    )
    console.log(response)
    const result = await response.json()
    console.log(result)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Domain ID
          <input type="text" value={this.state.domainId} onChange={(e) => this.handleChange(e, "domainId")}/>
        </label>
        <br/>
        <label>
          Token
          <input type="text" value={this.state.token} onChange={(e) => this.handleChange(e, "token")}/>
        </label>
        <br/>
        <label>
          Content URL
          <input type="text" value={this.state.contentUrl} onChange={(e) => this.handleChange(e, "contentUrl")}/>
        </label>
        <br/>
        <label>
          Title
          <input type="text" value={this.state.title} onChange={(e) => this.handleChange(e, "title")}/>
        </label>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}


const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ marginBottom: `1.45rem` }}>
      <BroadsignForm/>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
