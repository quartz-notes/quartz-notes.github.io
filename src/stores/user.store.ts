import { create } from 'zustand'

export interface UserState {
  id: number
  name: string
  completedOnboarding: boolean
}

const useUserStore = create<UserState>((set, get) => ({
  id: 0,
  name: '',
  completedOnboarding: false,
}))

export default useUserStore