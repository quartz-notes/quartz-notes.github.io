import { create } from 'zustand'

interface State {
  notes: { id: number }[]
  currentNote: number
  setNote: (id: number) => void
  addNote: () => void
}

const useStore = create<State>((set) => ({
  notes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
  currentNote: 0,
  setNote: (id: number) => set(() => ({ currentNote: id })),
  addNote: () => set((state) => ({ notes: [...state.notes, { id: state.notes.length }], currentNote: state.notes.length })),
}))

export default useStore