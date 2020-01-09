
const initialState = {
    routeData : [],
    selectedRoute: '',
    directionData: [],
    selectedDirection: '',
    showDirection: false,
    stopData: [],
    selectedStop: '',
    showStop: false,
    departureData: [],
    showDepartureList: false,
    showRouteSelection: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ONLOAD_ROUTE_ACTION':
         return {
            ...state,
            routeData: action.payload
         }
         case 'ROUTE_CHANGE_ACTION':
         return {
             ...state,
            showStop: action.payload.showStop,
            departureData: action.payload.departureList,
            showDepartureList: action.payload.showDepartureList,
            showDirection: action.payload.showDirection,
            directionData: action.payload.direction,
            selectedRoute: action.payload.selectedRoute,
            stopData: action.payload.stop
         }
         case 'DIRECTION_CHANGE_ACTION':
         return {
            ...state,
            departureData: action.payload.departureList,
            showDepartureList: action.payload.showDepartureList,
            showStop: action.payload.showStop,
            selectedDirection: action.payload.selectedDirection,
            stopData: action.payload.stop
         }
         case 'STOP_CHANGE_ACTION':
         return {
            ...state,
            departureData: action.payload.departureList,
            showDepartureList: action.payload.showDepartureList,
            selectedStop: action.payload.selectedStop
         }
        default:
         return state
    }
}