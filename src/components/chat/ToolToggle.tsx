type Props = {
  label: string
  pressed: boolean
  onToggle: () => void
}

export function ToolToggle({ label, pressed, onToggle }: Props) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      class={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
        pressed
          ? 'border-accent bg-accent-dim text-accent'
          : 'border-border text-muted hover:border-muted hover:text-fg'
      }`}
      onClick={onToggle}
    >
      {label}
    </button>
  )
}
