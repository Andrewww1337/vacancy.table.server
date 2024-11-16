import { model, Schema } from 'mongoose';

interface INote {
  company: string;
  vacancy: string;
  salary: string;
  response: string;
  note: string;
}

export const noteSchema: Schema = new Schema({
  company: {
    type: String,
    required: true,
  },
  vacancy: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

const NoteModel = model<INote>('Note', noteSchema);

export { NoteModel };
