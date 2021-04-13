export const required = value => {
    return value ? undefined : "Field is required";
}

export const maxLengthCreator = (maxLength) => (value) => {
    return value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;
}

export const validEmail = value => {
    return /\S+@\S+\.\S+/.test(value) ? undefined : 'Invalid Email Address';
}

export const composeValidators = (...vadlidators) => (value) => {
    return vadlidators.reduce((error, validator) => error || validator(value), undefined);
}