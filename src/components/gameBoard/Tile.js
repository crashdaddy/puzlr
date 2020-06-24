import React, { Component } from "react";

class Tile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberPosition: this.props.numberPosition,
      pos: this.props.pos,
      tile: this.props.tile,
    }
  }

  showId = (event) => {
    this.props.clearSelected(event);
  }

  render() {
    let borderStyle = '1px solid black'
    if (this.props.selected) { borderStyle = '1px solid white' }
    return (
      <div onClick={this.showId} id={this.props.id} style={{ height: `${this.props.size}px`, width: `${this.props.size}px`, background: `url(${this.props.bgImg})`, backgroundSize: '600px 600px', backgroundRepeat: 'no-repeat', backgroundPosition: this.props.pos, border: `${borderStyle}`, float: 'left', boxSizing: 'border-box' }}>

      </div>
    )
  }
}

export default Tile;