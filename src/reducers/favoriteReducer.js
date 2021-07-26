const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            const isExist = state.favorites.find(item => item.id === action.payload.id)
            if (isExist){
                return {
                    ...state,
                    favorites: state.favorites.filter(item => item !== action.payload)
                }
            }else{
                return {
                    ...state,
                    favorites: [...state.favorites, action.payload]
                }
            }

        default:
            return state;
    }
}

export default favoriteReducer;