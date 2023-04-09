import { useReducer, useEffect, useRef } from 'react';

function reducer(state, action) {
    switch (action.type) {
      case 'start':
        return { ...state, isRunning: true };
      case 'stop':
        return { ...state, isRunning: false };
      case 'reset':
        return { isRunning: false, time: 0 };
      case 'tick':
        return { ...state, time: state.time + 3 };
      case 'down':
        if (state.time > 0) {
            return { ...state, time: state.time - 1}
        } else {
            return state
        }
      default:
        throw new Error();
    }
  }

  const initialState = {
    isRunning: false,
    time: 0
  };

  
function Stopwatch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);
  useEffect(() => {
    if (!state.isRunning) { 
        console.log(idRef)
      return; 
    }
    idRef.current = setInterval(() => dispatch({ type: 'tick' }), 1000)
    return () => {
      clearInterval(idRef.current)
      idRef.current = 0
    }
  }, [state.isRunning])
  
  return (
    <div>
      {state.time}s
      <button onClick={() => dispatch({ type: 'start' })}>
        Start
      </button>
      <button onClick={() => dispatch({ type: 'stop' })}>
        Stop
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>

        <div>
        <button onClick={() => dispatch({ type: 'down'})} style={{marginTop: '16px'}}>
            --
        </button>
        </div>
    </div>
  );
}

export default Stopwatch