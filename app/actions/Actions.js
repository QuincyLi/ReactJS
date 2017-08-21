export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOADING = 'LOADING';

export const SHOW = 'SHOW';
export const HIDE = 'HIDE';

export function toLogin(data) {
    return {type: LOGIN, text: 'GET IN', data: data};
}

export function toLoading(data, history) {
    return {type: LOADING, text: 'WAITTING',  data: data, history: history};
}

export function toLogout() {
    return {type: LOGOUT, text: 'LOGOUT'};
}

export function toShow() {
    return {type: SHOW};
}

export function toHide() {
    return {type: HIDE};
}