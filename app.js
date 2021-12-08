import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {addNote, removeNote, listNote, readNote } from './notes.js'

const y = yargs(hideBin(process.argv))
y.version('2.0.0')

y.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            required: true,         // Instead of required we can use demandOption
            type: 'string'          // default is boolean
        },
        body: {
            describe: 'Note description',
            required: true,
            type: 'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

y.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Note title',
            required: true,
            type: 'string'
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})

y.command({
    command: 'list',
    describe: 'Listing out all the notes',
    handler() {
        listNote()
    }
})

y.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            type: 'string',
            required: true,
            describe: 'Note title'
        }
    },
    handler(argv) {
        readNote(argv.title)
    }
})

y.parse()   // or yargs.argv

