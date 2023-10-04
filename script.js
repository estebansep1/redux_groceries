//! Establish DOM elements as variables

const grocerySubmit = document.getElementById('addGrocery');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clear');

//! Instant default state value 

const initialState = {
    groceries: []
}

//! Establish reducer

const groceryReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'grocery/add':
            return {
                groceries: [...state.groceries, {text: action.text}]
            }
        case 'grocery/clear':
            return initialState
        default:
            return state
    }
}

//! Redux create store

let store = Redux.createStore(groceryReducer)

//! Dispatch functions

const clearList = () => {
    list.innerHTML = ''
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'grocery/clear'
    })
}

const newGrocery = e => {
    list.innerHTML = ''
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value;
    store.dispatch({
        type: 'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
 }

 //! Render data

 const renderList = state => {
    state.groceries.forEach(grocery => {
        let li = document.createElement('li')
        list.appendChild(li)
        li.textContent = grocery.text
    })
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

 //! Button event listeners

 grocerySubmit.addEventListener('click', e => newGrocery(e))
 clearBtn.addEventListener('click', clearList)

 //! Subscribe to render function

 store.subscribe(render)
 