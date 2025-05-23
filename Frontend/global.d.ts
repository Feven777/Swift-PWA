
export {}  // keep it a module

declare global {
  interface Window {
    // make initializeMap optional
    initializeMap?: () => void
  }
}
