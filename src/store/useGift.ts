import IGift from "@/types/Gift";
import { create } from "zustand";

interface IUseGift {
    gift: IGift | null,
    setGift: (gift: IGift) => void
}

const useGift = create<IUseGift>((set) => ({
    gift: null,
    setGift: (gift: IGift) => set({ gift })
}))

export default useGift;