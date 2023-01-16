export const cityListSelector = state => state.citylist.get('citylist');
export const cityListPaginationSelector = state => state.citylist.get('pagination');
export const cityListFilterSelector = state => state.citylist.get('filter');
export const getCityListInProgressFilter = state => state.citylist.get('getCityListInProgress');
