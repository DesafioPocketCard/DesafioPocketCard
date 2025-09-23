import IGiftCategory from '@/types/GiftCategory'
import { create } from 'zustand'

interface IUseCategory {
    category: IGiftCategory | null
    setCategory: (category: IGiftCategory) => void
    clearCategory: () => void
}

const useCategory = create<IUseCategory>((set) => ({
    category: null,
    setCategory: (category: IGiftCategory) => set({ category }),
    clearCategory: () => set({ category: null })
}))

export default useCategory;