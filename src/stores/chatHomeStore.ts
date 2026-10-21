import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMode } from '../components/chat/ModeTabs.tsx'

export type Conversation = {
  id: string
  title: string
  updatedAt: number
}

type ChatHomeState = {
  mode: ChatMode
  deepThinking: boolean
  smartSearch: boolean
  text: string
  conversations: Conversation[]
  activeConversationId: string | null
  setMode: (mode: ChatMode) => void
  setText: (text: string) => void
  toggleDeepThinking: () => void
  toggleSmartSearch: () => void
  rememberConversation: () => void
  selectConversation: (id: string) => void
  reset: () => void
}

const composerState = {
  mode: 'equilibrio' as ChatMode,
  deepThinking: false,
  smartSearch: false,
  text: '',
  activeConversationId: null as string | null,
}

function titleFromText(text: string) {
  const title = text.trim().replace(/\s+/g, ' ')
  if (title.length <= 40) return title
  return `${title.slice(0, 40)}…`
}

export const useChatHomeStore = create<ChatHomeState>()(
  persist(
    (set) => ({
      ...composerState,
      conversations: [],
      setMode: (mode) => set({ mode }),
      setText: (text) => set({ text }),
      toggleDeepThinking: () =>
        set((state) => ({ deepThinking: !state.deepThinking })),
      toggleSmartSearch: () =>
        set((state) => ({ smartSearch: !state.smartSearch })),
      rememberConversation: () =>
        set((state) => {
          const title = titleFromText(state.text)
          if (!title) return state

          const now = Date.now()
          const current = state.conversations.find(
            (conversation) => conversation.id === state.activeConversationId,
          )

          if (current) {
            return {
              conversations: state.conversations
                .map((conversation) =>
                  conversation.id === current.id
                    ? { ...conversation, updatedAt: now }
                    : conversation,
                )
                .toSorted((a, b) => b.updatedAt - a.updatedAt),
            }
          }

          const conversation: Conversation = {
            id: crypto.randomUUID(),
            title,
            updatedAt: now,
          }

          return {
            activeConversationId: conversation.id,
            conversations: [conversation, ...state.conversations],
          }
        }),
      selectConversation: (id) => set({ activeConversationId: id }),
      reset: () => set(composerState),
    }),
    {
      name: 'jarvis-conversations',
      partialize: (state) => ({ conversations: state.conversations }),
    },
  ),
)
