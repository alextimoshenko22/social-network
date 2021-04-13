const SEND_MESSAGE = 'NEW-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Sergei" }
    ],
    messages: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "Goodluck!" },
        { id: 3, message: "Yooo!" }
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.newMessageBody }],
            };
        }
        default:
            return state;
    }
}

export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;
