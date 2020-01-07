export default (state = {}, action) => {
    switch (action.type) {
        case 'ROUTE_ACTION':
         return {
            ...state,
          routeData: action.payload
         }
         case 'DIRECTION_ACTION':
         return {
             ...state,
            showDirection: action.payload.showDirection,
            directionData: action.payload.direction
         }
        default:
         return state
    }
}