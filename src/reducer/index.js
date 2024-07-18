
function Reducer(state, action) {
  switch (action.type) {
    case 'add_message':
      return { ...state, chats: [...state.chats, action.payload.message]};
    case 'start_new_chat':
      return { ...state, chats: [{ role: 'system', content: `You are an helpful assistance to answers legal questions in law` }], newChat: true, loading: false };
    case 'add_history':
      let histories = state.histories
      histories.map(history => history.active = false)
      return { ...state, histories: [...histories, action.payload], newChat: false, };
    case 'request':
      return { ...state, request: action.payload, loading: !state.loading  };
    case 'error':
      return { ...state, loading: !state.loading  };
    case 'login_user':
      return { ...state, user: action.payload  };
    default:
      return state;
  }
}

export default Reducer;
