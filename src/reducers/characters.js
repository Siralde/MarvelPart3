const characters = (state = [], action) => {

    switch (action.type){

        case 'GET_CHARACTERS_SUCCESS':
            return action.characters;
        case 'GET_CHARACTERS_REQUEST':
            return state;
        case 'GET_CHARACTERS_ERROR':
            return state;
        default:
            return state;
    }
}

export default characters;
