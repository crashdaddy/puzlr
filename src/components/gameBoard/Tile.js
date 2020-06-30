import React, { Component } from "react";

class Tile extends Component {

  showId = (event) => {
    this.props.clearSelected(event);
  }

  render() {
    let borderStyle = '1px solid black';
    if(this.props.cheatMode && this.props.tile.shouldBe!==this.props.tile.pos) { borderStyle = '1px solid red' }
    if (this.props.tile.selected) { borderStyle = '1px solid white' }
    let tileStyle = {
      height: `${this.props.tile.size}px`, 
      width: `${this.props.tile.size}px`, 
      background: `url(${this.props.bgImg})`, 
      backgroundSize: '600px 600px', 
      backgroundRepeat: 'no-repeat', 
      backgroundPosition: this.props.tile.pos, 
      border: `${borderStyle}`, 
      float: 'left', 
      boxSizing: 'border-box' 
    }
    return (
      <div onClick={this.showId} id={this.props.id} style={tileStyle}>

      </div>
    )
  }
}

export default Tile;