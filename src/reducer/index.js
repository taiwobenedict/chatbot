
function Reducer(state, action) {
  let histories = state.histories
  switch (action.type) {
    case 'add_message':
      return { ...state, chats: [...state.chats, action.payload.message] };
    case 'start_new_chat':
      return { ...state, chats: [{ role: 'system', content: `You are an helpful assistance to answers legal questions in law` }], newChat: true, loading: false };
    case 'add_history':
      histories.map(history => history.active = false)
      return { ...state, histories: [ action.payload, ...histories], newChat: false, };
    case 'request':
      return { ...state, request: action.payload, loading: !state.loading };
    case 'set_histories':
      return { ...state, histories: action.payload };
    case 'set_active':
      const id = action.payload

      state.histories.forEach(history => {
        if (history.id === id) {
          history.active = true;
        } else {
          history.active = false
        }
      })

      return { ...state, };
    case 'search':


      const searchQuery = action.payload

      const searchedHistories = state.histories.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return { ...state, histories: searchedHistories };
    case 'remove_history':
      const historyId = action.payload
      const newHistory = state.histories.filter(history => history.id !== historyId )
      return { ...state, histories: newHistory };
    case 'set_messages':
      return { ...state, chats: action.payload, newChat: false };
    case 'error':
      return { ...state, loading: !state.loading };
    case 'login_user':
      return { ...state, user: action.payload };
    case 'logout_user':
      return { ...state, user: null };
    default:
      return state;
  }
}

export default Reducer;
