import { NativeModules, Platform } from 'react-native';
import { Context } from './context';
export { Outcome, Context } from './context';
export type { OutcomeMetadata } from './context';

const LINKING_ERROR =
  `The package 'react-native-context-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ContextSDKBridge = NativeModules.ContextSDKBridge
  ? NativeModules.ContextSDKBridge
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export type CustomSignals = Record<string, string | number | boolean>;
export type GlobalCustomSignals = Record<
  string,
  string | number | boolean | null
>;

export async function setup(licenseKey: string): Promise<boolean> {
  if (Platform.OS === 'ios') {
    return ContextSDKBridge.setup(licenseKey);
  } else {
    return true;
  }
}

export async function trackEvent(
  eventName: string,
  customSignals: CustomSignals = {}
) {
  if (Platform.OS === 'ios') {
    await ContextSDKBridge.trackEvent(eventName, customSignals);
  }
}

export async function trackPageView(
  pageName: string,
  customSignals: CustomSignals = {}
) {
  if (Platform.OS === 'ios') {
    await ContextSDKBridge.trackPageView(pageName, customSignals);
  }
}

export async function trackUserAction(
  userActionName: string,
  customSignals: CustomSignals = {}
) {
  if (Platform.OS === 'ios') {
    await ContextSDKBridge.trackUserAction(userActionName, customSignals);
  }
}

/**
 * Set custom signals that will be used for all ContextSDK events on this instance.
 * We recommend using this to provide generic information that's applicable to all calls, like any AB test information, or other data that may be relevant to calculate the likelihood of an event.
 * Please be sure to not include any PII or other potentially sensitive information.
 * You can overwrite values by using the same key again, and remove them by setting them to null.
 */
export async function setGlobalCustomSignals(
  customSignals: GlobalCustomSignals
) {
  if (Platform.OS === 'ios') {
    await ContextSDKBridge.setGlobalCustomSignals(customSignals);
  }
}

/**
 * Fetch the most recently generated Context for a given flowName
 */
export async function recentContext(flowName: string): Promise<Context | null> {
  if (Platform.OS === 'ios') {
    const contextId = await ContextSDKBridge.recentContext(flowName);
    if (contextId !== -1) {
      return new Context(contextId);
    }
  }
  return null;
}

export function calibrate(options: {
  flowName: string;
  onContextReady: (context: Context) => void;
  maxDelay?: number;
  customSignals?: CustomSignals;
}): void {
  const {
    flowName,
    onContextReady,
    maxDelay = 3,
    customSignals = {},
  } = options;
  if (Platform.OS === 'ios') {
    ContextSDKBridge.calibrate(flowName, maxDelay, customSignals).then(
      (contextId: number) => {
        onContextReady(new Context(contextId));
      }
    );
  } else {
    onContextReady(new Context(-1));
  }
}

export function optimize(options: {
  flowName: string;
  maxDelay?: number;
  /** Note: This callback might not be called if ContextSDK deems it to be a bad time to perform the flow. Will always be called while calibrating a flow. */
  onGoodMoment: (context: Context) => void;
  customSignals?: CustomSignals;
}): void {
  const { flowName, maxDelay, onGoodMoment, customSignals = {} } = options;
  // Native Interop does not support nullable numbers, so we use a magic number to represent null.
  let effectiveMaxDelay = maxDelay ?? -1000;
  if (Platform.OS === 'ios') {
    ContextSDKBridge.optimize(flowName, effectiveMaxDelay, customSignals).then(
      (contextId: number) => {
        onGoodMoment(new Context(contextId));
      }
    );
  } else {
    onGoodMoment(new Context(-1));
  }
}

export async function instantContext(options: {
  flowName: string;
  duration?: number;
  customSignals?: CustomSignals;
}): Promise<Context> {
  const { flowName, duration = 3, customSignals = {} } = options;
  if (Platform.OS === 'ios') {
    const contextId = await ContextSDKBridge.instantContext(
      flowName,
      duration,
      customSignals
    );
    return new Context(contextId);
  } else {
    return new Context(-1);
  }
}

export function fetchContext(options: {
  flowName: string;
  onContextReady: (context: Context) => void;
  duration?: number;
  customSignals?: CustomSignals;
}): void {
  const {
    flowName,
    onContextReady,
    duration = 3,
    customSignals = {},
  } = options;
  if (Platform.OS === 'ios') {
    ContextSDKBridge.fetchContext(flowName, duration, customSignals).then(
      (contextId: number) => {
        onContextReady(new Context(contextId));
      }
    );
  } else {
    onContextReady(new Context(-1));
  }
}
