import { useEffect, useRef, useState } from 'preact/hooks'
import type { JSX } from 'preact'
import { SendButton } from './SendButton.tsx'
import { ToolToggle } from './ToolToggle.tsx'

const MAX_COMPOSER_HEIGHT = 192

type Props = {
  text: string
  onTextChange: (value: string) => void
  deepThinking: boolean
  onDeepThinkingToggle: () => void
  smartSearch: boolean
  onSmartSearchToggle: () => void
  onSend: () => void
}

export function Composer({
  text,
  onTextChange,
  deepThinking,
  onDeepThinkingToggle,
  smartSearch,
  onSmartSearchToggle,
  onSend,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [flashing, setFlashing] = useState(false)
  const flashTimer = useRef<number>(0)
  const canSend = text.trim().length > 0

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, MAX_COMPOSER_HEIGHT)}px`
  }, [text])

  useEffect(() => {
    return () => window.clearTimeout(flashTimer.current)
  }, [])

  function send() {
    if (!canSend) return
    onSend()
    window.clearTimeout(flashTimer.current)
    setFlashing(true)
    flashTimer.current = window.setTimeout(() => setFlashing(false), 220)
  }

  function onKeyDown(event: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      send()
    }
  }

  return (
    <div class="w-full max-w-2xl rounded-3xl border border-border bg-composer p-3 shadow-lg">
      <textarea
        ref={textareaRef}
        rows={2}
        value={text}
        placeholder="Pergunte ao Jarvis…"
        aria-label="Mensagem para o Jarvis"
        class="max-h-48 w-full resize-none bg-transparent px-2 pt-1 text-base leading-6 text-fg outline-none placeholder:text-muted"
        onInput={(event) => onTextChange(event.currentTarget.value)}
        onKeyDown={onKeyDown}
      />

      <div class="mt-2 flex items-end justify-between gap-3">
        <div class="flex flex-wrap gap-2">
          <ToolToggle
            label="Pensamento profundo"
            pressed={deepThinking}
            onToggle={onDeepThinkingToggle}
          />
          <ToolToggle
            label="Pesquisa Inteligente"
            pressed={smartSearch}
            onToggle={onSmartSearchToggle}
          />
        </div>

        <SendButton disabled={!canSend} flashing={flashing} onClick={send} />
      </div>
    </div>
  )
}
