import {actions} from './ActionTypes'

export const login = (Items, erroruser, errorpass) => {
    return {
        type: actions.LOGIN,
        value: Items,
        erroruser: erroruser,
        errorpass: errorpass
    }
}

export const logout = () => {
    return {
        type: actions.LOGOUT
    }
}
