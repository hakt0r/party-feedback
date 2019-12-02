
const initialState = {
  name: "",
  parents: 1,
  kids: 1,
  email: "",
  phone: ""
}

const actions = (state=initialState,action)=>{
  switch (action.type) {
    case "changeField":
      if ( action.fieldType === 'number' && Number(action.value) < 0 ){
        return {
          ...state,
          [action.name]:0
        }
      }
      state = {
        ...state,
        [action.name]:action.value
      };
      localStorage.setItem('savedState',JSON.stringify(state))
      return state
    case "submitForm":
      return {
        ...state,
        submitting:true
      }
    case "loadedLocalStorage":
      return {...state,...action.data}
    default: return state;
  }
}

export default actions;
