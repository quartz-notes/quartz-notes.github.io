import { Block } from '@blocknote/core'
import { create } from 'zustand'
import localStorageService from '../services/localStorage.service'


export interface Note {
  id: number
  content: Block[]
}

export interface NoteData {
  notes: Note[]
  currentNote: number | undefined
}

export interface NoteState extends NoteData {
  setCurrentNote: (id: number) => void
  createNote: () => void,
  updateNote: (id: number, content: Block[]) => void,
  saveData: () => void
  loadData: () => Promise<void>
}

const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  currentNote: undefined,

  setCurrentNote: (id: number) => set(() => ({ currentNote: id })),
  
  createNote: () => set((state) => {
    const id = state.notes.length
    return {
      notes: [...state.notes, { id, content: [] }],
      currentNote: id,
    }
  }),

  updateNote: (id: number, content: Block[]) => { 
    set((state) => ({
    notes: state.notes.map((note, index) => 
      index === id ? { ...note, content } : note
    ),
    }))
    get().saveData()
  },

  saveData: () => set((state) => {
    localStorageService.save({
      notes: state.notes,
      currentNote: state.currentNote
    })
    return {}
  }),

  loadData: async () => {
      if (get().notes.length > 0) return

      const data = await localStorageService.load()
      
      if (!data) {      
        set(() => ({
          notes: [{id: 0, content: []}],
          currentNote: 0
        }))
        return
      }  
      
      set(() => ({
        notes: data.notes,
        currentNote: data.currentNote
      }))
  },
}))

export default useNoteStore