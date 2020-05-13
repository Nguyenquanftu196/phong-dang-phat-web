const isAdminWeb = process.env.REACT_APP_IS_ADMIN === 'true'

const prefix = isAdminWeb ? 'root-' : '';

export const COOKIE_ANONYMOUS = `data-win-${prefix}anonymous`
export const COOKIE_USER = `data-win-${prefix}user`