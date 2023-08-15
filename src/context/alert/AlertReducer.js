const alertReducer = (state, action) => {

    switch(action.type){
        default:
            return state;

        case 'SET_ALERT':
            return action.payload

        case 'REMOVE_ALERT':
            return null;
    };
};

export default alertReducer;
