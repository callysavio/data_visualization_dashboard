
const constantsFun = () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            backendBaseUrl:process.env.REACT_APP_BACKEND_PROD_URL
        }
    } else {
         return {
            backendBaseUrl:process.env.REACT_APP_BACKEND_DEV_URL
        }
    }
}

const constants = constantsFun()

export {constants}