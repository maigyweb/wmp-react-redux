export function login() {
  return {
    type: "LOGIN",
  };
}

export function loginCompletion(error, data) {
  return {
    type: "LOGIN_COMPLETION",
    error,
    data,
  };
}
