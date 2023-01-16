const apiV1Prefix = '/api/v1';

export const getGetCityListUrl = () => `${apiV1Prefix}/cities`;
export const getEditCityUrl = (id) => `${apiV1Prefix}/cities/${id}`;
