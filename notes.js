import chalk from 'chalk'
import fs from 'fs'

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.find((note) => note.title === title);
  if (!duplicate) {
    notes.push({
      title,
      body,
    });
    console.log(chalk.green.inverse("Note Saved"));
    return saveNote(notes);
  }
  console.log(chalk.red.inverse("This title has already been taken"));
};

const removeNote = (title) => {
  const notes = loadNotes();
  const find = notes.find((note) => note.title === title);
  if (find) {
    const newNotes = notes.filter((note) => note.title !== title);
    console.log(chalk.green.inverse("Note Removed"));
    return saveNote(newNotes);
  }
  console.log(chalk.red.inverse("Note not found"));
};

const listNote = () => {
    const notes = loadNotes();
    if(notes.length === 0) {
        return console.log(chalk.red.inverse("No note found"))
    }
    console.log(chalk.green.inverse("Your Notes: "))
    notes.forEach((note) =>{
        console.log(chalk.white.inverse(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const find = notes.find((note) =>{
      return note.title === title;
    })
    if(find){
        console.log(chalk.inverse(find.title + ": "))
        console.log(find.body);
    }else{
        console.log(chalk.red.inverse("Note not found"))
    }
}

const saveNote = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync("notes.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

export { addNote, removeNote, listNote, readNote }; // if we need to export more than one thing we can use {} like {addNote, getNote}
