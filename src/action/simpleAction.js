export const onLoadRouteAction = (routes) => dispatch => {
    dispatch({
        type: 'ONLOAD_ROUTE_ACTION',
        payload: routes,
    })
}

export const routeChangeAction = (directionDate) => dispatch => {
    dispatch({
        type: 'ROUTE_CHANGE_ACTION',
        payload: directionDate,
    })
}

export const directionChangeAction = (stopDate) => dispatch => {
    dispatch({
        type: 'DIRECTION_CHANGE_ACTION',
        payload: stopDate,
    })
}

export const stopChangeAction = (departureDate) => dispatch => {
    dispatch({
        type: 'STOP_CHANGE_ACTION',
        payload: departureDate,
    })
}
export const showMoreClickAction = (showMoreClickData) => dispatch => {
    dispatch({
        type: 'SHOW_MORE_CLICK_ACTION',
        payload: showMoreClickData,
    })
}