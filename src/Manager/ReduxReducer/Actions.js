import {actions} from './ActionTypes'

export const login = (Items) => {
    return {
        type: actions.LOGIN,
        value: Items
    }
}

export const logout = () => {
    return {
        type: actions.LOGOUT
    }
}
