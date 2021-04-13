let initialState = {
    friends: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Sergei" }
    ]
}

const sidebarReducer = (state = initialState, action) => {
    return state;
}

export default sidebarReducer;