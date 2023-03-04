import { useReducer } from "react"

export function useForceUpdate() {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  return () => {
    console.log("forceUpdate")
    forceUpdate()
  }
}
