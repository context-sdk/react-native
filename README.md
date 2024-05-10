# react-native-context-sdk

ContextSDK for React Native

## Supported Platforms

- iOS - 14.0 and higher
- Android - Coming Soon

## Installation

```sh
npm install react-native-context-sdk
```

## Usage

On your first screen, or somewhere that is always ran at app start setup ContextSDK.

```js
import { setup } from 'react-native-context-sdk';

// ...

const licenseValid = await setup("YOUR_LICENSE_KEY_HERE");
```

Optionally, you can log specific events to get a better understanding of how the real world context influences your app.

```js
import {
  trackEvent,
  trackPageView,
  trackUserAction,
} from 'react-native-context-sdk';

/*
Use this to track users navigating through different screen in your app. 
It allow us to provide you insights into which screen is most commonly used in which real world context.
*/
trackPageView("page_identifier");

/*
Use this to track certain user actions, like when a user enabled a certain feature, when a user tapped a button, when the user created an account, or when the user shared something. 
This allows us to provide you insights into which user actions are most commonly done in which real world context.
*/
trackUserAction("user_tapped_share_button");

/*
Use this to track certain events in your app. This can be used generically to track any type of event. For example, you can add this to your existing analytics code to log all your existing events into ContextSDK. 
This allows us to provide you insights into which events are most commonly triggered in which real world context.
*/
trackEvent("custom_event");
```

## License

MIT
