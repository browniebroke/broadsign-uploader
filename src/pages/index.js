import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


class BroadsignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domainId: '',
      token: '',
      contentUrl: '',
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }

  async handleSubmit(event) {
    const data = {
        "url": this.state.contentUrl,
        "name": this.state.title,
        "domain_id": this.state.domainId,
    };
    // Make the request
    const response = await fetch(
        'https://api-sandbox.broadsign.com:10889/rest/content/v11/import_from_url',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.state.token}`,
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();
    console.log(result)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Domain ID
          <input type="text" value={this.state.domainId} onChange={(e) => this.handleChange(e, 'domainId')} />
        </label>
        <label>
          Token
          <input type="text" value={this.state.token} onChange={(e) => this.handleChange(e, 'token')} />
        </label>
        <label>
          Content URL
          <input type="text" value={this.state.contentUrl} onChange={(e) => this.handleChange(e, 'contentUrl')} />
        </label>
        <label>
          Title
          <input type="text" value={this.state.title} onChange={(e) => this.handleChange(e, 'tile')} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <BroadsignForm/>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
