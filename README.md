# ContextSDK for React Native

[![npm version](https://img.shields.io/npm/v/react-native-context-sdk)](https://www.npmjs.com/package/react-native-context-sdk)
[![Changelog](https://img.shields.io/badge/changelog-latest-blue)](https://docs.decision.contextsdk.com/changelog/)
[![Documentation](https://img.shields.io/badge/documentation-latest-blue)](https://docs.decision.contextsdk.com/)
[![Issues](https://img.shields.io/github/issues/context-sdk/react-native)](https://github.com/context-sdk/react-native/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/context-sdk/react-native)](https://github.com/context-sdk/react-native/pulls)

ContextSDK is a powerful tool that brings real-world context and insights directly into your React Native app through on-device signals, empowering you to boost conversions and engagement, enhance user experiences, and reduce churn — all with privacy in mind, as no personally identifiable information (PII) is ever collected.

Our SDK supports iOS and will soon support Android, making it easy to integrate into your cross-platform React Native projects.

## Getting Started

This repository is dedicated to managing releases of ContextSDK for React Native, distributed via [npm](https://www.npmjs.com/package/react-native-context-sdk). For other platforms, such as Flutter and Swift, or alternative installation methods, please see our [official documentation](https://docs.decision.contextsdk.com/).

To integrate ContextSDK into your React Native project, follow these steps:

### Installation

1. Add `react-native-context-sdk` to your project using your preferred package manager:

```bash
npm install react-native-context-sdk@latest
```

Or:

```bash
yarn add react-native-context-sdk
```

2. Ensure the minimum deployment target for iOS is set to `14.0` or higher in your `ios/Podfile`:

```ruby
platform :ios, "14.0"
```

### Setup

After installing ContextSDK, initialize it with your license key at app startup. You can [sign up here](https://console.contextsdk.com/register) to receive your license key.

```js
import { setup } from "react-native-context-sdk";

void setup("YOUR_LICENSE_KEY_HERE");
```

## Using ContextSDK

### Tracking Events

To maximize the value of ContextSDK, you can log various events in your app to gain insights into how real-world context influences user behavior.

#### Track Page Views

Track users navigating through different screens in your app:

```js
import { trackPageView } from "react-native-context-sdk";

trackPageView("page_identifier");
```

#### Track User Actions

Track specific user actions, such as enabling features or tapping buttons:

```js
import { trackUserAction } from "react-native-context-sdk";

trackUserAction("user_tapped_share_button");
```

#### Track Custom Events

Log any custom events generically to get insights into their real-world context:

```js
import { trackEvent } from "react-native-context-sdk";

trackEvent("custom_event");
```

### Going Live

Once integrated, you're ready to ship your app update to the App Store and start leveraging real-world context insights.  Continue to the [release page](https://docs.insights.contextsdk.com/release/) for a final check before shipping, as well as other deployment tips.

## Documentation

For detailed setup instructions, usage examples, and advanced usage scenarios, visit our [official documentation](https://docs.decision.contextsdk.com/).

## Not using ContextSDK yet?

If you’re interested in adding real-world context insights to your app, you can [sign up here](https://console.contextsdk.com/register) to receive your license key and access. For more information about how ContextSDK can enhance your app’s user experience, visit our [website](https://contextsdk.com) or reach out to our team at support@contextsdk.com.

## Support

For any questions or technical support, please don’t hesitate to reach out to our team — we’re eager to help!

Thank you for choosing ContextSDK! 🚀 We’re excited to support you in building context-aware experiences for your users.
