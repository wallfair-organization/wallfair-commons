const notificationEvents = {
    EVENT_START: 'Notification/EVENT_START', // Deprecated in favor of EVENT_USER_REWARD
    EVENT_RESOLVE: 'Notification/EVENT_RESOLVE', // Deprecated in favor of EVENT_USER_REWARD
    EVENT_CANCEL: 'Notification/EVENT_CANCEL', // Deprecated in favor of EVENT_USER_REWARD
    EVENT_NEW_REWARD: 'Notification/EVENT_NEW_REWARD', // Deprecated in favor of EVENT_USER_REWARD
    // User-related events
    EVENT_USER_SIGNED_IN: `Notification/EVENT_USER_SIGNED_IN`,
    EVENT_USER_SIGNED_UP: `Notification/EVENT_USER_SIGNED_UP`,
    EVENT_USER_FORGOT_PASSWORD: `Notification/EVENT_USER_FORGOT_PASSWORD`,
    EVENT_USER_UPLOADED_PICTURE: `Notification/EVENT_USER_UPLOADED_PICTURE`,
    EVENT_USER_CHANGED_USERNAME: `Notification/EVENT_USER_CHANGED_USERNAME`,
    EVENT_USER_CHANGED_NAME: `Notification/EVENT_USER_CHANGED_NAME`,
    EVENT_USER_CHANGED_PASSWORD: `Notification/EVENT_USER_CHANGED_PASSWORD`,
    EVENT_USER_UPDATED_EMAIL_PREFERENCES: `Notification/EVENT_USER_UPDATED_EMAIL_PREFERENCES`,
    EVENT_USER_SET_CURRENCY: `Notification/EVENT_USER_SET_CURRENCY`,
    EVENT_USER_REWARD: 'Notification/EVENT_USER_REWARD',
    // Event related events
    EVENT_ONLINE: 'Notification/EVENT_ONLINE',
    EVENT_OFFLINE: 'Notification/EVENT_OFFLINE',
    EVENT_NEW: 'Notification/EVENT_NEW',
    EVENT_UPDATED: 'Notification/EVENT_UPDATED',
    EVENT_NEW_BET: 'Notification/EVENT_NEW_BET',
    // Bet related events
    EVENT_BET_PLACED: 'Notification/EVENT_BET_PLACED',
    EVENT_BET_STARTED: 'Notification/EVENT_BET_STARTED',
    EVENT_BET_CASHED_OUT: 'Notification/EVENT_BET_CASHED_OUT',
    EVENT_BET_RESOLVED: 'Notification/EVENT_BET_RESOLVED',
    EVENT_BET_EVALUATED: 'Notification/EVENT_BET_EVALUATED',
    EVENT_BET_DISPUTED: 'Notification/EVENT_BET_DISPUTED',
    EVENT_BET_CANCELED: 'Notification/EVENT_BET_CANCELED',
    // Reward system related events
    EVENT_USER_REWARDED: 'Notification/EVENT_USER_REWARDED'
};

exports.notificationEvents = notificationEvents

const eventTypes = [...Object.values(notificationEvents)]

exports.universalEventTypes = eventTypes

