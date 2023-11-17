import { useEffect } from 'react'

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
