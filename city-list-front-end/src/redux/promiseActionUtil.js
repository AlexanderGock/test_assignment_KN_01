import { ActionType } from 'redux-promise-middleware';

export function pendingFor(type) {
    return `${type}_${ActionType.Pending}`
};

export function fulfilledFor(type) {
    return `${type}_${ActionType.Fulfilled}`;
};

export function rejectedFor(type) {
    return `${type}_${ActionType.Rejected}`;
};

export function isRejected(type) {
    return type && type.endsWith(`_${ActionType.Rejected}`);
};
