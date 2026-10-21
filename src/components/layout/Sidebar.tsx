import { useChatHomeStore } from '../../stores/chatHomeStore.ts'

type Props = {
  open: boolean
  onClose: () => void
  onNewChat: () => void
}

export function Sidebar({ open, onClose, onNewChat }: Props) {
  const conversations = useChatHomeStore((state) => state.conversations)
  const activeConversationId = useChatHomeStore(
    (state) => state.activeConversationId,
  )
  const selectConversation = useChatHomeStore((state) => state.selectConversation)

  function onSelect(id: string) {
    selectConversation(id)
    onClose()
  }

  return (
    <>
      {open && (
        <button
          type="button"
          class="fixed inset-0 z-20 bg-black/50 md:hidden"
          aria-label="Fechar menu"
          onClick={onClose}
        />
      )}

      <aside
        class={`z-30 w-[260px] shrink-0 flex-col border-r border-border bg-sidebar p-3 ${
          open ? 'flex' : 'hidden md:flex'
        } max-md:fixed max-md:inset-y-0 max-md:left-0`}
      >
        <button
          type="button"
          class="rounded-xl border border-border px-3 py-2 text-left text-sm text-fg transition-colors hover:bg-surface"
          onClick={onNewChat}
        >
          Nova conversa
        </button>

        {conversations.length === 0 ? (
          <p class="mt-8 px-1 text-sm text-muted">Nenhuma conversa ainda</p>
        ) : (
          <ul class="mt-6 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
            {conversations.map((conversation) => {
              const active = conversation.id === activeConversationId

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    class={`w-full truncate rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      active
                        ? 'bg-surface text-fg'
                        : 'text-muted hover:bg-surface hover:text-fg'
                    }`}
                    onClick={() => onSelect(conversation.id)}
                  >
                    {conversation.title}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </aside>
    </>
  )
}
