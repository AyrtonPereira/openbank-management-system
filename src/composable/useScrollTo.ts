export function useScrollTo(elementId: string) {
    setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
}