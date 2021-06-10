//Yargs is an npm that makes it easier to parse(in this context it means to take userinput and read it and organize it in a way that we can use it) user input from the command line. Yargs makes it easy to make command line commands with options/flags.
const yargs = require('yargs');
const chalk = require('chalk');
//notes is no and object that has two properties.Both of which are functions
const notes = require('./notes.js');  




//Customize yargs version. We can make different versions of yargs to fit our needs. 
yargs.version('1.1.0');

//Create add command. //.command makes it possible to create a new command
yargs.command({
  //the new command must have a name which is done with the command property.
  command: 'add',
  //describe adds a description that users can see.
  describe: 'Add a new note.',
  //builder is an object property that we are using to hold the title and body for adding a note. Builder will enclose the options we are creating for the user data that will be inputted.
  builder: {
    //title is an oject as well. It is the option the user will have to put in. --title="randomString" is the syntax.
    title: {
      describe: 'Note title',
      //Makes the option a requirement. Hence, the command cannot be used without this.
      demandOption: true,
      //This makes sure that the argument is string. The default value would be a boolean.
      type: 'string'
    },
    body: {
      describe: 'Note contents',
      demandOption: true,
      type: 'string'
    },
  },
  //Is the code that will run when somone calls this command (i.e add). Must have a function stored in the handler.
  //The argv object will be based as an argument for the handler function. You then access the title value by using the dot notation.
  handler: function(argv) {
    //notes is the object that has the function you've created to handle the addition of a new note.
    notes.addNote(argv.title, argv.body)
  }
});

//Create a remove command
yargs.command({
  command: 'remove',
  describe: 'Remove the note.',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
  }
});

//Create a read command 
yargs.command({
  command: 'read',
  describe: 'Read the note.',
  builder: {
    title: {
      describe: 'Read Note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function(argv){
    notes.readNotes(argv.title);
  }
});

//Create a list command
yargs.command({
  command: 'list',
  describe: 'List the items in the note.',
  handler() {
    notes.listNotes();
  }
});

//yargs.argv replaces process.argv due to its flexibility to parse userInput as we see fit.
//console.log(yargs.argv);

//yargs.parse goes through the process of parsing the arguments with all of the configuration details for your commands.
yargs.parse();