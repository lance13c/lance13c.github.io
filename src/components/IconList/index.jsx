import React, {Component} from "react"
import PropType from 'prop-types';


class HomePage extends Component {

  static PropType = {
    icons: PropType.arrayOf(PropType.object).isRequired
  }

  render() {
    const {
      icons
    } = this.props
    return (
     <span>
       {
         icons.map( icon => {
           return <a href={icon.link} style={`background-color: ${icon.color}`}>
             <i className={icon.name}></i>
            </a>
         })
       }
     </span>
    )
  }
}

export default HomePage