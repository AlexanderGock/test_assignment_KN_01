export const isReadOnlyUser = (user) => {
    return !user || !user.authorities.some(a => a.authority === "ROLE_ALLOW_EDIT");
};
