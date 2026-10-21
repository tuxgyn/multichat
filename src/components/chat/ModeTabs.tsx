export type ChatMode = 'rapido' | 'equilibrio' | 'especialista'

const MODES: { id: ChatMode; label: string }[] = [
  { id: 'rapido', label: 'Rápido' },
  { id: 'equilibrio', label: 'Equilíbrio' },
  { id: 'especialista', label: 'Especialista' },
]

type Props = {
  value: ChatMode
  onChange: (mode: ChatMode) => void
}

export function ModeTabs({ value, onChange }: Props) {
  return (
    <div
      class="flex rounded-full bg-surface p-1"
      role="tablist"
      aria-label="Modo de resposta"
    >
      {MODES.map((mode) => {
        const active = mode.id === value

        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={active}
            class={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              active
                ? 'bg-composer text-fg shadow-sm'
                : 'text-muted hover:text-fg'
            }`}
            onClick={() => onChange(mode.id)}
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
