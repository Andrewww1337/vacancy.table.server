import { Request, Response } from 'express';
import { NoteModel } from '../models/note';

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find({});
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { note, id } = req.body;
    const getUpdateNote = await NoteModel.updateOne({ _id: id }, note);
    if (!getUpdateNote.acknowledged) {
      throw new Error('Note not updated');
    }
    const notes = await NoteModel.find({});
    if (notes) {
      return res.status(200).json({ notes });
    }
    throw new Error('Something went wrong');
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const addNote = async (req: Request, res: Response) => {
  try {
    const { note } = req.body;
    await NoteModel.create(note);
    const notes = await NoteModel.find({});
    if (notes) {
      return res.status(200).json({ notes });
    }
    throw new Error('Something went wrong');
  } catch (error) {
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
    const notes = await NoteModel.find({});

    if (!notes) {
      throw new Error('Note not found');
    }
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
