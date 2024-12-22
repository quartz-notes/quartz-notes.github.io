import { NoteData } from "../stores/notes.store";

interface LocalStorageService {
  save: (noteState: NoteData) => void;
  load: () => Promise<NoteData | undefined>;
}

const localStorageService: LocalStorageService = {
  save: async (noteState: NoteData) => {
    localStorage.setItem("noteData", JSON.stringify(noteState));
  },
  load: async () => {
    const storageString = localStorage.getItem("noteData");
    return storageString
      ? (JSON.parse(storageString) as NoteData)
      : undefined;
  },
};

export default localStorageService;