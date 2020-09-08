export function loadUserDetail(id) {
  return {
    type: "LOAD_USER_DETAIL",
    id,
  };
}

export function loadUserDetailCompletion(error, data) {
  return {
    type: "LOAD_USER_DETAIL_COMPLETION",
    error,
    data,
  };
}
