"use client";

import { create } from "zustand";

interface TagStore {
    tagColors: Record<string, string>; // 태그 이름 -> 배경색
    getTagColor: (tag: string) => string; // 태그의 색상을 가져옴
    addTagColor: (tag: string) => void; // 태그가 없으면 새로운 색상을 추가
}

const useTagStore = create<TagStore>((set, get) => ({
    // 태그별 색상 초기값
    tagColors: {
        "Next.js": "#0070f3",
        "Swift": "#F05138",
        "Algorithm": "#1E90FF",
    },

    // 태그 색상을 가져오는 함수 (없으면 자동 생성)
    getTagColor: (tag) => {
        const state = get();
        return state.tagColors[tag] || state.addTagColor(tag);
    },

    // 새로운 태그가 추가될 경우 랜덤 색상 부여
    addTagColor: (tag) =>
        set((state) => {
            if (!state.tagColors[tag]) {
                const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                return { tagColors: { ...state.tagColors, [tag]: newColor } };
            }
            return state;
        }),
}));

export default useTagStore;
