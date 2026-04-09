import Note from "../models/Note.js";

// show all notes
export const getAllNotes = async (_,res)=>{
    try {
        const notes = await Note.find().sort({createdAt : -1});  // -1 will sort in desc.. order (newest first)
        res.status(200).json(notes);
    } catch (error) {
        console.log("error in getAllNotes controller",error);
        res.status(500).json({"message": "internal server error"})
    }
};

// show a single note using id
export const getNoteById = async (req,res)=>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({"message" : "note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.log("error in getNoteById controller",error);
        res.status(500).json({"message": "internal server error"})
    }
};


// create a note
export const createNote = async (req,res)=>{
    try {
        const {title,content} = req.body;
        const note = new Note({title:title, content:content});
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log("error in createNote controller",error);
        res.status(500).json({"message": "internal server error"});
    }
};

// update note
export const updateNote = async(req,res)=>{
    try {
        const {title,content} =  req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{ title , content },{returnDocument:"after"});

        if(!updatedNote) return res.status(404).json({"message" : "note not found"});

        res.status(200).json(updatedNote);

    } catch (error) {
        console.log("error is updateNote controller",error);
        res.status(500).json({"message": "internal server error"});
    }
};

// delete a note
export const deleteNote = async (req,res)=>{
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote) return res.status(404).json({"message" : "note not found"});

        res.status(200).json({"message" : "Note not found"});

    } catch (error) {
        console.log("error in deleteNote controller",error);
        res.status(500).json({"message": "internal server error"});
    }
};