import { useChatHomeStore } from '../../stores/chatHomeStore.ts'
import { Composer } from './Composer.tsx'
import { ModeTabs } from './ModeTabs.tsx'

export function ChatHome() {
  const mode = useChatHomeStore((state) => state.mode)
  const setMode = useChatHomeStore((state) => state.setMode)
  const text = useChatHomeStore((state) => state.text)
  const setText = useChatHomeStore((state) => state.setText)
  const deepThinking = useChatHomeStore((state) => state.deepThinking)
  const smartSearch = useChatHomeStore((state) => state.smartSearch)
  const toggleDeepThinking = useChatHomeStore((state) => state.toggleDeepThinking)
  const toggleSmartSearch = useChatHomeStore((state) => state.toggleSmartSearch)
  const rememberConversation = useChatHomeStore(
    (state) => state.rememberConversation,
  )

  return (
    <main class="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10">
      <div class="flex w-full max-w-2xl flex-col items-center gap-6">
        <h1 class="text-center text-4xl font-medium tracking-tight text-fg">
          Jarvis de Harry
        </h1>

        <ModeTabs value={mode} onChange={setMode} />

        <Composer
          text={text}
          onTextChange={setText}
          deepThinking={deepThinking}
          onDeepThinkingToggle={toggleDeepThinking}
          smartSearch={smartSearch}
          onSmartSearchToggle={toggleSmartSearch}
          onSend={rememberConversation}
        />
      </div>
    </main>
  )
}
