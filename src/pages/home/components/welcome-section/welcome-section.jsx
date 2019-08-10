import React, {Component} from "react"

import IconList from ''


class HomePage extends Component {

  render() {
    return (
      <section>
        <h1>Dominic Cicilio</h1>
        <span>
          <IconList
            icons={[
              {
                'name': 'fa-home',
                'link': 'www.google.com',
                'color': 'green'
              }
            ]}
          />
        </span>
      </section>
    )
  }
}

export default HomePage