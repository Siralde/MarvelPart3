const comics = (state = [] , action) => {

    switch (action.type){

        case 'GET_COMICS_SUCCESS':
        return action.comics;

        case 'GET_COMICS_REQUEST':
            return state;
        case 'GET_COMICS_ERROR':
            return state;
        default:
            return state;
            
    }
}

export default comics;
