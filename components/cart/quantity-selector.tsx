"use client"

interface QuantitySelectorProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border rounded-md">
      <button
        onClick={onDecrease}
        className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-3 py-1 text-center min-w-[40px]">{quantity}</span>
      <button
        onClick={onIncrease}
        className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
