const fs = require('fs');
const chalk = require('chalk');

const addNote = function(title, body) {
    const notes = loadNotes();
    //.push adds a new element to the end of the array.
    //the filter method will return a new array with all the elements who tested true for the condition tested inside the function.
    // const duplicateNotes = notes.filter(function (note){
    //   return note.title === title
    // })

    //.find() will find the first element that meets the condition and will then stop looking. This is better than the filter() which will look through the entire index even if it already finds a value that meets the established condition.
    //The element that satisfies the condition will be stored in the constant.
    const duplicateNote = notes.find((note) => note.title === title)
    
    //if .find() finds nothing it will return undefined into the variable. !undefined equals true and hence would just in the loop. 
    //if .find() finds a matching title it will store it in the constant. !"string" will return false, and the else statement will run.
    if (!duplicateNote) {
      notes.push(
        {
          title: title,
          body: body
        }
      )
      saveNotes(notes);
      console.log(chalk.green.inverse('New note added!'));
    } else {
      console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

function loadNotes () {
  try {
    //The variable is used to hold the return value of the document if it exist. If the file doesn't exist you will get an error. Hence, the reason for putting the block of code in a try/catch statement. This can handle the error if one arises.
    const dataBuffer = fs.readFileSync('notes.json')
    //if the file exist, the data returned will be buffer data which will have to be converted into JSON.
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)

  } catch (e) {
    //If there's an error the catch statement will deal with it. In this case, an empty array will be created and it will be stored in the note constant that called the load function.
      return []
  }

}

//Remove Notes Command Section
const removeNote = function(title) {
  const notes = loadNotes();
  const filter = notes.filter(function(noteCheck){
    return noteCheck.title !== title
  });
  saveNotes(filter);

  if (notes.length === filter.length) {
    console.log(chalk.red.inverse("No note found!"))
  }

  if (notes.length > filter.length) {
    console.log(chalk.green.inverse("Note removed!"))
  }

}

//listNotes Command Section
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse('Your Notes'));

  notes.forEach(note => console.log(note.title))
}

//readNotes Command Section 
const readNotes = function(title){
    const notes = loadNotes();
    
    const noteTitle = notes.find((note) => note.title === title)
//noteTitle.title === title would produce an error. You cannot access .title if the value contained within it is undefined.
//Values by default are either truthy or falsy. Strings are an example of a truthy value. Hence, if noteTile is a string it's the equivalent of it being true. If its undefined its the equivalent of it being false.
//.find() will either return a value that matches the condition or it will return undefined.
    if (noteTitle){
      console.log(chalk.blue.inverse(noteTitle.title));
      console.log(noteTitle.body);
    } else {
      console.log(chalk.red.inverse('No note found with the entered title.'));
    }
}

//In order to export multiple properties you export a single object with multiple properties.
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};