import { Request, Response } from 'express';
import { NoteModel } from '../models/note';

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find({});
    return res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { note, id } = req.body;
    const getUpdateNote = await NoteModel.findOneAndUpdate({ _id: id }, note, {
      new: true,
    });
    if (getUpdateNote) {
      return res.status(200).json({ note: getUpdateNote });
    }
    throw new Error('Note not updated');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const addNote = async (req: Request, res: Response) => {
  try {
    const { note } = req.body;
    const addedNote = await NoteModel.create(note);
    if (addedNote) {
      return res.status(200).json({ note: addedNote });
    }
    throw new Error('Note not added');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    const getDeleteNotes = await NoteModel.deleteMany({ _id: ids });
    if (!getDeleteNotes.acknowledged) {
      throw new Error('Note not deleted');
    }
    return res.status(203).json({ ids });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
