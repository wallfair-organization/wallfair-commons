# Intro

This file aims to document all Redis notifications triggered by the Wallfair backend.

Every notification has the following structure:

```json

```

# Notifications

## EVENT_START

**'Notification/EVENT_START'**

Deprecated in favor of EVENT_USER_REWARD

## EVENT_RESOLVE

**'Notification/EVENT_RESOLVE'**

Deprecated in favor of EVENT_USER_REWARD

## EVENT_CANCEL

**'Notification/EVENT_CANCEL'**

Deprecated in favor of EVENT_USER_REWARD

## EVENT_NEW_REWARD

**'Notification/EVENT_NEW_REWARD'**

Deprecated in favor of EVENT_USER_REWARD

# User-related notifications

## EVENT_USER_SIGNED_IN

This event is called when users sign in to the platform.
There is currently only one way for users to sign in, via email and password.

```
{
    type: `Notification/EVENT_USER_SIGNED_IN`
} 
```

## EVENT_USER_SIGNED_UP

This event is triggered every time a user registers.

```json
{
    type: `Notification/EVENT_USER_SIGNED_UP`
}
```

## EVENT_USER_FORGOT_PASSWORD

This event is triggered the moment a user requests an email with a link to reset his password.

```json
{
    type: `Notification/EVENT_USER_FORGOT_PASSWORD`
}
```

## EVENT_USER_UPLOADED_PICTURE

This event is triggered when a user uploads a new picture profile.
It is *NOT* triggered if the system assigns a random avatar to the user.


```json
{
    type: `Notification/EVENT_USER_UPLOADED_PICTURE`
}
```

## EVENT_USER_CHANGED_USERNAME

This event is triggered when a user changes his username. 
It is *NOT* triggered when the system automatically assigns a username to the user.

```json
{
    type: `Notification/EVENT_USER_CHANGED_USERNAME`
}
```

## EVENT_USER_CHANGED_NAME

This event is triggered when a user changed his personal name.

```json
{
    type: `Notification/EVENT_USER_CHANGED_NAME`
}
```

## EVENT_USER_UPDATED_EMAIL_PREFERENCES

This event is triggered when user updates his email preferences. It is *NOT* triggered if the preferences is set by the system.

```json
{
    type: `Notification/EVENT_USER_UPDATED_EMAIL_PREFERENCES`
}
```

## EVENT_USER_SET_CURRENCY

This event is triggered when user updates his currency preferences. It is *NOT* triggered when the preference is set by the system.

```json
{
    type: `Notification/EVENT_USER_SET_CURRENCY`
}
```

## EVENT_USER_REWARD

This event is triggered when the user receives a reward from a **BET**. It is *NOT* triggered for rewards received from Casino/Games. This event always follows **EVENT_BET_RESOLVED**.

```json
{
    type: `Notification/EVENT_USER_REWARD`
}
```

# Event related notifications

## EVENT_ONLINE

This event is triggered when a stream goes online.
In case of twitch, there is a webhook that sets this value.
In case of youtube, there is a polling mechanism that detects this (not implemented yet).

```json
{
    type: `Notification/EVENT_ONLINE`
}
```

## EVENT_OFFLINE

This event is triggered when a stream goes offline.
In case of twitch, there is a webhook that sets this value.
In case of youtube, there is a polling mechanism that detects this (not implemented yet).

```json
{
    type: `Notification/EVENT_OFFLINE`
}
```

## EVENT_NEW

This event is triggered every time a new Event is created, streamed or non-streamed.

```json
{
    type: `Notification/EVENT_NEW`
}
```

## EVENT_UPDATED

This event is triggered every time an Event is updated. Both manual changes and system changes (ex: via webhooks or scraping) will change this value.

```json
{
    type: `Notification/EVENT_UPDATED`
}
```

## EVENT_NEW_BET

This event is triggered every time a new Bet is created in an Event.

```json
{
    type: `Notification/EVENT_NEW_BET`
}
```

# Bet related notifications

## EVENT_BET_PLACED

This event is triggered every time a user places a Trade (BUY) in a Bet.

```json
{
    type: `Notification/EVENT_BET_PLACED`
}
```

## EVENT_BET_STARTED

This event is triggered every time a Bet goes from `Upcoming` to `Active` state automatically. It is *NOT* triggered when a Bet is created directly in the active state. See **EVENT_NEW_BET**.

```json
{
    type: `Notification/EVENT_BET_STARTED`
}
```

## EVENT_BET_CASHED_OUT

This event is triggered every time a user cashes out from a Bet (SELL).

```json
{
    type: `Notification/EVENT_BET_CASHED_OUT`
}
```

## EVENT_BET_RESOLVED

This event is triggered every time a Bet is resolved. See also **EVENT_USER_REWARD**.

```json
{
    type: `Notification/EVENT_BET_RESOLVED`
}
```

## EVENT_BET_EVALUATED

This event is triggered every time a user evalues a Bet.

```json
{
    type: `Notification/EVENT_BET_EVALUATED`
}
```

## EVENT_BET_DISPUTED

This event is triggered when a user disputes a Bet.

```json
{
    type: `Notification/EVENT_BET_DISPUTED`
}
```

## EVENT_BET_CANCELED

This event is triggered every time a Bet is Canceled.

```json
{
    type: `Notification/EVENT_BET_CANCELED`
}
```
