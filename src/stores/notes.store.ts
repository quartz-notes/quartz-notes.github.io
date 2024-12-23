import { Block } from '@blocknote/core'
import { create } from 'zustand'
import localStorageService from '../services/localStorage.service'


export interface Note {
  id: number
  title: string
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
  removeNote: (id: number) => void

  saveData: () => void
  loadData: () => Promise<void>
}

const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  currentNote: undefined,

  setCurrentNote: (id: number) => set(() => ({ currentNote: id })),

  createNote: () => {
    set((state) => {
      const id = state.notes.length > 0 ? state.notes[state.notes.length - 1].id + 1 : 0
      return {
        notes: [...state.notes, { id, title: `заметка ${id}`, content: [] }],
        currentNote: id,
      }
    })
    get().saveData()
  },

  updateNote: (id: number, content: Block[]) => {
    let title = undefined
    
    for (const block of content) {
      if (block.type == "heading" && block.props.level == 1) {
        title = block.content.filter((item) => item.type == "text")[0].text
      }
    }
    
    set((state) => ({
    notes: state.notes.map((note) => 
      note.id === id ? { ...note, content: content, title: title || note.title } : note
    ),
    }))
    
    get().saveData()
  },

  removeNote: (id: number) => {
    if (get().notes.length === 1) return
    
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }))
    set((state) => ({
      currentNote: state.currentNote === id ? (state.notes[0].id) : state.currentNote,
    }))

    get().saveData()
  },

  saveData: () => localStorageService.save({
      notes: get().notes,
      currentNote: get().currentNote
  }),

  loadData: async () => {
      if (get().notes.length > 0) return

      const data = await localStorageService.load()
      
      if (!data) {      
        set(() => ({
          notes: [{id: 0, title: `заметка ${0}`, content: []}],
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