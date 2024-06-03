import create from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  dopen: boolean;
  updateOpen: (dopen: boolean) => void;
}

const AppStore = create<AppState>()(
  persist(
    (set) => ({
      dopen: true,
      updateOpen: (dopen: boolean) => set({ dopen }),
    }),
    {
      name: "my_app_store",
    }
  )
);

export default AppStore;
