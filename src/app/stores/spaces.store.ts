import Space from "@/shared/api/models/space";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SpaceState {
  spaces: Space[];
  currentSpace: string;

  setCurrentSpace: (spaceId: string) => void;
  sync: () => Promise<Space[]>;
}

const mock: Space[] = [
  {
    id: "qwa",
    name: "Основное",
    logo: "star",
  },
  {
    id: "qwb",
    name: "Работа",
    logo: "command",
  },
  {
    id: "qwc",
    name: "Учёба",
    logo: "book",
  },
  {
    id: "qwd",
    name: "Спорт",
    logo: "volleyball",
  },
];

const useSpaceStore = create<SpaceState>()(
  persist(
    (set) => ({
      spaces: mock,
      currentSpace: "qwd",

      setCurrentSpace: (spaceId: string) =>
        set(() => ({ currentSpace: spaceId })),
      sync: async () => {
        return [];
      },
    }),
    { name: "store:spaces" }
  )
);

export default useSpaceStore;
