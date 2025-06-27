//Set up an array that will hold the words that our crossword puzzle will show
let arrWords = new Array("Pippin", "Shire", "Mordor", "Maiar", "Istari");

// This function will build the crossword puzzle, the # of rows and columns is passed into the function
function buildCrossword(rows, cols){
    //Shortcut nickname to the HTML table
    let table = document.getElementById("tblPuzzle");

    //loop to create the rows that our table will need
    for (let i = 0; i < rows; i++){
        //create a table row HTML element that we can add the columns/tds to
        let row = document.createElement("tr");
        //nested loop to create the columns
        for (let j = 0; j < cols; j++){
            //create a table data HTML element that we can add to the row
            let col = document.createElement("td");
            //add the new td to the current row
            row.appendChild(col);
        }
        //need to add the row to the table
        table.appendChild(row);
    }
} 

buildCrossword(13, 9);

function buildWords(startingRow, startingColumn, wordIndex, direction, table, showAnswer, clueNumber){
let word = arrWords[wordIndex];

for (let i=0; i<word.length; i++){
    let rowIndex = 0;
    let colIndex = 0;

    //this will allow us to stay on the same row for the whole word
    //we will move over one clolmun each time the loop runs
    if(direction == "across"){
        rowIndex = startingRow;
        colIndex = startingColumn + i;
    }
    //this will allow us to stay on the same column for the whole word
    //we will move over one row each time the loop runs
    else{
        rowIndex = startingRow + i;
        colIndex = startingColumn;
    }

    //create a shortcut to the current row
    let tr = table.rows[rowIndex];
    //create a shortcut to the current column
    let td = tr.cells[colIndex];

    //if this is the first letter (i ==0), show the cklue number
    if (i == 0){
        //create a new span
        let number = document.createElement("span");
        //set the text on the span to the clue number
        number.textContent = clueNumber;
        //set the css style to the span so the number is tiny and in the top/left corner
        number.className = "clue-number";
        //add the spand to the cell
        td.appendChild(number);
    }

    //add a 1 character text box to each square where out letters will be
    //check and make sure that there isnt already a text input on the current table data/cell
    if (!td.querySelector("input")){
        //create a  new input
        let input = document.createElement("input");
        //specify that this is a text input which will build <input type="text">
        input.setAttribute("type", "text");
        //set max length so user can only type 1 character
        input.setAttribute("maxlength", "1");
        
        //check to see if we should show the letter or not
        if (showAnswer){
            input.value = word[i].toUpperCase();
        }
        //add the new text input to the table data
        td.appendChild(input);
    }
    else{
        let existingInput = td.getElementsByTagName("input")[0];

        if (showAnswer){
            existingInput.value = word[i].toUpperCase();
        }
    }

}
}

// let arrWords = new Array("Pippin", "Shire", "Mordor", "Maiar", "Istari");

let table = document.getElementById("tblPuzzle");
buildWords(3, 1, 0, "across", table, false, 1); //Pippin
buildWords(1, 2, 1, "down", table, false, 2); //Shire
buildWords(6, 7, 2, "down", table, false, 1); //Mordor
buildWords(8, 3, 3, "across", table, false, 2); // Maiar
buildWords(3, 5, 4, "down", table, false, 3); //Istari

function revealAnswers(){
buildWords(3, 1, 0, "across", table, true, 1); //Pippin
buildWords(1, 2, 1, "down", table, true, 2); //Shire
buildWords(6, 7, 2, "down", table, true, 1); //Mordor
buildWords(8, 3, 3, "across", table, true, 2); // Maiar
buildWords(3, 5, 4, "down", table, true, 3); //Istari
}