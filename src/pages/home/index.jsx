import React, { Component } from "react"
import Grid from '@material-ui/core/Grid';


class HomePage extends Component {

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1>Dominic Cicilio</h1>
        <Grid
          direction="row"
          justify="center"
          alignItems="center"
        >
          <a href="/#"><i className="fas fa-flask"></i>Projects</a>
          <a href="/#"><i className="fas fa-flask"></i>Blog</a>
          <a href="/#"><i className="fas fa-flask"></i>Life</a>

        </Grid>

      </Grid>
    )
  }
}

export default HomePage