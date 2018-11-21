import React from "react"
import { prop } from "ramda"
import useProfunctorState from "@staltz/use-profunctor-state"

const Input = ({ state, setState }) => {
  const handleChange = ({ target: { value } }) =>
    setState(value)

  return (
    <div>
      <input value={state} onChange={handleChange} />
    </div>
  )
}

function App() {
  const initialState = {
    name: "Moo",
    other: {},
    isValid: false
  }
  const { state, promap } = useProfunctorState(initialState)

  const inputP = promap(
    prop("name"),
    (fromComponent, state) => ({
      ...state,
      name: fromComponent,
      isValid: /i+/gi.test(fromComponent)
    })
  )

  return (
    <div>
      <div>Global app state: {JSON.stringify(state)}</div>
      <Input {...inputP} />
      <Input
        {...inputP.promap(x => x, x => x.toUpperCase())}
      />
      <Input
        {...inputP.promap(
          x => x.toLowerCase(),
          x => x.toUpperCase()
        )}
      />
    </div>
  )
}

export default App
