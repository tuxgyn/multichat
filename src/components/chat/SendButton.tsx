type Props = {
  disabled: boolean
  flashing: boolean
  onClick: () => void
}

export function SendButton({ disabled, flashing, onClick }: Props) {
  return (
    <button
      type="button"
      aria-label="Enviar"
      disabled={disabled}
      class={`flex size-10 shrink-0 items-center justify-center rounded-full transition ${
        disabled
          ? 'cursor-not-allowed bg-surface text-muted opacity-50'
          : 'bg-accent text-canvas hover:brightness-110'
      } ${flashing ? 'scale-90' : 'scale-100'}`}
      onClick={onClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  )
}
