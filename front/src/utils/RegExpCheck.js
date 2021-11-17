export const checkValidation = function (str) {
    const regExp =
    /^(?!.*[!@#$%^&*()_+|<>?:{} ])(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}/i;
    return regExp.test(str);
};
