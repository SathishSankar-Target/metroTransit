export const onLoadRouteAction = (routes) => dispatch => {
    dispatch({
        type: 'ROUTE_ACTION',
        payload: routes,
    })
}

export const directionAction = (directionDate) => dispatch => {
    dispatch({
        type: 'DIRECTION_ACTION',
        payload: directionDate,
    })
}