import Table from './components/table'
import { useEffect, useReducer } from 'react'
import './App.css'
import { Context, dataReducer, initialRows } from './reducer'

function App() {
  const [state, dispatch] = useReducer(dataReducer, initialRows)

  return (
    <div className='app-container'>
        <Context.Provider value={[state, dispatch]}>
              <Table/>
        </Context.Provider>
    </div>
  )
}

export default App
