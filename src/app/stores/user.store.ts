import User from "@/shared/api/models/user";
import { create } from "zustand";

const useUserStore = create<User>(() => ({
  id: "",
  name: "Тестовый пользователь",
  email: "tim@apple.com",
  avatar: "/logo.svg",
  flags: {},
}));

export default useUserStore;
