import { useState } from 'preact/hooks'
import { useChatHomeStore } from '../../stores/chatHomeStore.ts'
import { ChatHome } from '../chat/ChatHome.tsx'
import { Sidebar } from './Sidebar.tsx'

export function AppShell() {
  const reset = useChatHomeStore((state) => state.reset)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function newChat() {
    reset()
    setSidebarOpen(false)
  }

  return (
    <div class="flex h-svh bg-canvas text-fg">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={newChat}
      />

      <div class="flex min-w-0 flex-1 flex-col">
        <div class="flex items-center border-b border-border px-3 py-2 md:hidden">
          <button
            type="button"
            class="rounded-lg px-2 py-1 text-sm text-muted hover:bg-surface hover:text-fg"
            aria-label="Abrir menu"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
        </div>

        <ChatHome />
      </div>
    </div>
  )
}
