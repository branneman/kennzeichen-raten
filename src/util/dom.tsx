import { useState, useEffect } from 'react'

export function useAllImagesLoaded(fn: () => void) {
  useEffect(() => {
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener('load', resolve)
              img.addEventListener('error', resolve)
            }),
        ),
    ).then(() => fn())
    return undefined
  })
}

export function useKeySequenceDetector(
  keySequence: string,
  onSequenceDetected: () => void,
) {
  const [typedKeys, setTypedKeys] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newTypedKeys = typedKeys + e.key

      if (newTypedKeys === keySequence) {
        onSequenceDetected()
        setTypedKeys('')
      } else if (!keySequence.startsWith(newTypedKeys)) {
        setTypedKeys('')
      } else {
        setTypedKeys(newTypedKeys)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () =>
      window.removeEventListener('keydown', handleKeyDown)
  }, [typedKeys, keySequence, onSequenceDetected])
}
