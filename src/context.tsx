import { NativeModules, Platform } from 'react-native';
import { LRUCache } from 'lru-cache';

const ContextSDKBridge = NativeModules.ContextSDKBridge
  ? NativeModules.ContextSDKBridge
  : new Proxy(
      {},
      {
        get() {
          throw new Error();
        },
      }
    );

// Any Context we obtain is registered here so we can notify the native code once it can release the reference.
// TODO: Once ReactNative supports WeakRef or similar use that. For now use a large LRU cache.
// TODO: Technically this can cause issues if the caller keeps a reference to the context and the context is disposed.
const activeContexts = new LRUCache<number, Context>({
  max: 1000,
  disposeAfter: (_, key) => {
    console.log('disposing context', key);
    ContextSDKBridge.releaseContext(key);
  },
});

export type OutcomeMetadata = Record<string, string | number | boolean>;
export class Context {
  private contextId: number;

  constructor(contextId: number) {
    this.contextId = contextId;
    if (Platform.OS === 'ios') {
      activeContexts.set(contextId, this);
    }
  }

  shouldUpsell = async () => {
    if (Platform.OS === 'ios') {
      return ContextSDKBridge.context_shouldUpsell(this.contextId);
    } else {
      return true;
    }
  };

  validate = async () => {
    if (Platform.OS === 'ios') {
      return ContextSDKBridge.context_validate(this.contextId);
    } else {
      return 'This is only supported on iOS platforms.';
    }
  };

  async log(outcome: Outcome) {
    if (Platform.OS === 'ios') {
      await ContextSDKBridge.context_log(this.contextId, outcome);
    }
  }

  async logIfNotLoggedYet(outcome: Outcome) {
    if (Platform.OS === 'ios') {
      await ContextSDKBridge.context_logIfNotLoggedYet(this.contextId, outcome);
    }
  }

  async appendOutcomeMetadata(metadata: OutcomeMetadata) {
    if (Platform.OS === 'ios') {
      await ContextSDKBridge.context_appendOutcomeMetadata(
        this.contextId,
        metadata
      );
    }
  }
}

export enum Outcome {
  /// Optional outcome: The user has tapped on the ad, and followed any external link provided.
  positiveAdTapped = 4,

  /// Optional outcome: The user ended up successfully purchasing the product (all the way through the payment flow)
  positiveConverted = 3,

  /// Optional outcome: The user has tapped on the banner, and started the purchase flow, or read more about the offer
  positiveInteracted = 2,

  //---------------------------------------------------------------------------------------------------------
  // The default signals
  //---------------------------------------------------------------------------------------------------------

  /// A generic, positive signal. Use this for the basic ContextSDK integration, e.g. when showing an upsell prompt.
  positive = 1,

  /// Log this when ContextSDK has recommended to skip showing an upsell prompt (`.shouldUpsell` is false). Logging this explicitly is not required if you use `ContextManager.optimize()` or `ContextManager.calibrate()` as it will be handled by ContextSDK automatically.
  skipped = 0,

  /// A generic, negative signal. Use this for the basic ContextSDK integration, on a user e.g. declining or dismissing an upsell prompt
  negative = -1,

  //---------------------------------------------------------------------------------------------------------
  // Optionally, you can provide additionally depth by using the enums below instead of only using .negative
  //---------------------------------------------------------------------------------------------------------

  /// Optional outcome: Use this as a negative signal of a user not interacting with e.g. a banner. Depending on your app, we may recommend to log this when the app is put into the background, and hasn't interacted with a banner in any way. This can be done using the `logIfNotLoggedYet` method
  negativeNotInteracted = -2,

  /// Optional outcome: The user has actively dismissed the banner (e.g. using a close button)
  negativeDismissed = -3,

  //---------------------------------------------------------------------------------------------------------
  // All ATT related outcomes
  //---------------------------------------------------------------------------------------------------------
  // Available outcomes taken from AppTrackingTransparency framework `AuthorizationStatus`
  attNotDetermined = 20,
  attRestricted = 21,
  attDenied = 22,
  attAuthorized = 23,
  attUnsupportedValue = 19,
}
