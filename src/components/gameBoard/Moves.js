import $ from 'jquery';

    ////////////////////////////////
//
//  functions to move the rows
//
//

// move the selected row to the right
const moveRight = (rowCol,width) => {
    let tempId = rowCol.split("-");
    let row = tempId[0];
  
    // store the information from the last div
    let tempColor = $(`#${row}-${width-1}`).css('background-color');
    let tempPOS = $(`#${row}-${width-1}`).css('background-position');
  
    // move each div's values to the div on the right of it
    for (let i=width;i>0;i--) {
        $(`#${row}-${i}`).css('background-color',$(`#${row}-${i-1}`).css('background-color'));
        $(`#${row}-${i}`).css('background-position',$(`#${row}-${i-1}`).css('background-position'));
    }
  
    // move the stored last div's values into the first div
    $(`#${row}-0`).css('background-color',tempColor);
    $(`#${row}-0`).css('background-position',tempPOS);
  
  }
  
const moveLeft = (rowCol,width) => {
        let tempId = rowCol.split("-");
        let row = tempId[0];
    
        let tempColor = $(`#${row}-0`).css('background-color');
        let tempPOS = $(`#${row}-0`).css('background-position');
    
        for (let i=0;i<width-1;i++){
            $(`#${row}-${i}`).css('background-color',$(`#${row}-${i+1}`).css('background-color'));
            $(`#${row}-${i}`).css('background-position',$(`#${row}-${i+1}`).css('background-position'));
        }
    
        $(`#${row}-${width-1}`).css('background-color',tempColor);
        $(`#${row}-${width-1}`).css('background-position',tempPOS);
    }
  
const moveUp = (rowCol,width) => {
      let tempId = rowCol.split("-");
      let col = tempId[1];
  
      let tempColor = $(`#0-${col}`).css('background-color');
      let tempPOS = $(`#0-${col}`).css('background-position');
  
      for (let i = 0; i< width-1;i++) {
          $(`#${i}-${col}`).css('background-color',$(`#${i+1}-${col}`).css('background-color'));
          $(`#${i}-${col}`).css('background-position',$(`#${i+1}-${col}`).css('background-position'));
      }
  
      $(`#${width-1}-${col}`).css('background-color',tempColor);
      $(`#${width-1}-${col}`).css('background-position',tempPOS);
  }
  
const moveDown = (rowCol,width) => {
      let tempId = rowCol.split("-");
      let col = tempId[1];
  
      let tempColor = $(`#${width-1}-${col}`).css('background-color');
      let tempPOS   = $(`#${width-1}-${col}`).css('background-position');
  
      for (let i = width-1;i>0;i--) {
          $(`#${i}-${col}`).css('background-color',$(`#${i-1}-${col}`).css('background-color'));
          $(`#${i}-${col}`).css('background-position',$(`#${i-1}-${col}`).css('background-position'));
      }
  
      $(`#0-${col}`).css('background-color',tempColor);
      $(`#0-${col}`).css('background-position',tempPOS);
  }

  export {moveDown,moveLeft,moveRight,moveUp}
