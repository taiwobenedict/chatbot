
function Reducer(state, action) {
  switch (action.type) {
    case 'add_message':
      return { ...state, chats: [...state.chats, action.payload.message]};
    case 'start_new_chat':
      return { ...state, chats: [{ role: 'system', content: `You are an helpful assistance to answers legal questions in law` }], newChat: true, };
    case 'add_history':
      return { ...state, histories: [], newChat: false, };
    case 'request':
      return { ...state, request: action.payload, loading: !state.loading  };
    case 'error':
      return { ...state, loading: !state.loading  };
    default:
      return state;
  }
}

export default Reducer;
