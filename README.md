# react-native-context-sdk

![npm version](https://img.shields.io/npm/v/react-native-context-sdk)
[![Changelog](https://img.shields.io/badge/changelog-latest-blue)](https://docs.decision.contextsdk.com/changelog/)
[![Documentation](https://img.shields.io/badge/documentation-latest-blue)](https://docs.decision.contextsdk.com/)
![Issues](https://img.shields.io/github/issues/context-sdk/react-native)
![Pull Requests](https://img.shields.io/github/issues-pr/context-sdk/react-native)

ContextSDK for React Native

## Supported Platforms

- iOS - 14.0 and higher
- Android - Coming Soon

## Overview

Follow these steps to add ContextSDK to your app, and refer to the [official documentation](https://docs.decision.contextsdk.com/) for additional details and advanced configuration.

- **Step 1**: Add ContextSDK to your app
- **Step 2**: (Optional) Log any events
- **Step 3**: Ship an App Store update with ContextSDK

## Installation

**Step 1:** Choose your preferred package manager:

```
npm install react-native-context-sdk@latest
```
```
yarn add react-native-context-sdk
```

**Step 2:** Ensure minimum Deployment Target

ContextSDK requires a minimum deployment target of iOS 14.0, be sure to update your `ios/Podfile` to specify 14.0 or higher:

```ruby
platform :ios, '14.0'
```

### Activating ContextSDK

After you installed ContextSDK, you need to add your license key. [Register here](https://insights.contextsdk.com/register) to get started. Call this on app start.

```js
import { setup } from 'react-native-context-sdk';

void setup("YOUR_LICENSE_KEY_HERE");
```

## Optional: Track additional Events

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

## Go Live

Now all that's left is to ship your update to the App Store to start gaining context insights. Continue to the [release page](https://docs.insights.contextsdk.com/release/) for a final check before shipping, as well as other deployment tips.
