import React from 'react'
import { CounterContext } from './CounterComposed'

const Counter = () => {

    return (
        <div className="App">
            <CounterContext.Consumer>
                { counter =>
                <center>
                    <h1>{counter.value}</h1>
                        <input type="button" value="Incrementar" onClick={() => counter.increment()} />
                </center>
                }
            </CounterContext.Consumer> 
        </div>
    );
}

export default Counter;