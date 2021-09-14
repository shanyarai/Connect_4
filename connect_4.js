let player1 = prompt("Player One: Enter your name, you will be Blue");
let player1Color = 'rgb(86, 151, 255)';

let player2 = prompt("Player Two: Enter your name, you will be Red");
let player2Color = 'rgb(237, 45, 73)';

let game_on = true;
let table = $('table tr');


function reportWin(rowNum, colNum){
  console.log("You won starting at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function reportColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  let colorReport = reportColor(7,colIndex);
  for (let row =7; row > -1; row--) {
    colorReport = reportColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      // console.log(reportColor(row,col)==='rgb(128, 128, 128)', reportColor(row,col+1) ,reportColor(row,col+2), reportColor(row,col+3))
      if (colorMatchCheck(reportColor(row,col), reportColor(row,col+1) ,reportColor(row,col+2), reportColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col) ,reportColor(row+2,col), reportColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

//Diagonal Win Check
function diagonalWinCheck() {
  for (let col = 0; col <7; col++) {
    for (let row = 0; row < 7; row++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col+1) ,reportColor(row+2,col+2), reportColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(reportColor(row,col), reportColor(row-1,col+1) ,reportColor(row-2,col+2), reportColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}


function gameEnd(winningPlayer) {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}



let currentPlayer = 1;
let currentName= player1;
let currentColor = player1Color;


$('h3').text(player1+" it is your turn, pick a column to drop in!");

$('.board button').on('click',function(){
  let col = $(this).closest('td').index();
  let bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col, currentColor);
  console.log("At line 124");
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1;

  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+ " it is your turn")
    currentColor = player1Color;
  } else {
    currentName = player2;
    $('h3').text(currentName + " it is your turn")
    currentColor = player2Color;
  }
})
