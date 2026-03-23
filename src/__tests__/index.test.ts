import { NativeModules, Platform } from 'react-native';

// Set up the native bridge mock BEFORE loading our source modules,
// since they capture NativeModules.ContextSDKBridge at load time.
NativeModules.ContextSDKBridge = {
  setup: jest.fn().mockResolvedValue(true),
  trackEvent: jest.fn().mockResolvedValue(undefined),
  trackPageView: jest.fn().mockResolvedValue(undefined),
  trackUserAction: jest.fn().mockResolvedValue(undefined),
  setGlobalCustomSignals: jest.fn().mockResolvedValue(undefined),
  recentContext: jest.fn().mockResolvedValue(42),
  calibrate: jest.fn().mockResolvedValue(1),
  optimize: jest.fn().mockResolvedValue(2),
  instantContext: jest.fn().mockResolvedValue(3),
  fetchContext: jest.fn().mockResolvedValue(4),
  releaseContext: jest.fn(),
  context_shouldUpsell: jest.fn().mockResolvedValue(true),
  context_validate: jest.fn().mockResolvedValue('valid'),
  context_log: jest.fn().mockResolvedValue(undefined),
  context_logIfNotLoggedYet: jest.fn().mockResolvedValue(undefined),
  context_appendOutcomeMetadata: jest.fn().mockResolvedValue(undefined),
};

const bridge = NativeModules.ContextSDKBridge;

// Use require() so the modules load AFTER the mock is in place.
const {
  setup,
  trackEvent,
  trackPageView,
  trackUserAction,
  setGlobalCustomSignals,
  recentContext,
  instantContext,
  calibrate,
  optimize,
  fetchContext,
  Context,
  Outcome,
} = require('../index');

describe('Outcome enum', () => {
  it('has correct values for standard outcomes', () => {
    expect(Outcome.positive).toBe(1);
    expect(Outcome.skipped).toBe(0);
    expect(Outcome.negative).toBe(-1);
  });

  it('has correct values for detailed outcomes', () => {
    expect(Outcome.positiveConverted).toBe(3);
    expect(Outcome.positiveInteracted).toBe(2);
    expect(Outcome.positiveAdTapped).toBe(4);
    expect(Outcome.negativeNotInteracted).toBe(-2);
    expect(Outcome.negativeDismissed).toBe(-3);
  });

  it('has correct values for ATT outcomes', () => {
    expect(Outcome.attNotDetermined).toBe(20);
    expect(Outcome.attRestricted).toBe(21);
    expect(Outcome.attDenied).toBe(22);
    expect(Outcome.attAuthorized).toBe(23);
    expect(Outcome.attUnsupportedValue).toBe(19);
  });
});

describe('setup', () => {
  it('calls the native bridge on iOS', async () => {
    Platform.OS = 'ios';
    const result = await setup('test-key');
    expect(bridge.setup).toHaveBeenCalledWith('test-key');
    expect(result).toBe(true);
  });

  it('returns true without calling bridge on non-iOS', async () => {
    Platform.OS = 'android';
    jest.clearAllMocks();
    const result = await setup('test-key');
    expect(bridge.setup).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });
});

describe('tracking functions', () => {
  beforeEach(() => {
    Platform.OS = 'ios';
    jest.clearAllMocks();
  });

  it('trackEvent calls bridge with event name and custom signals', async () => {
    await trackEvent('purchase', { price: 9.99 });
    expect(bridge.trackEvent).toHaveBeenCalledWith('purchase', { price: 9.99 });
  });

  it('trackEvent defaults custom signals to empty object', async () => {
    await trackEvent('tap');
    expect(bridge.trackEvent).toHaveBeenCalledWith('tap', {});
  });

  it('trackPageView calls bridge', async () => {
    await trackPageView('home');
    expect(bridge.trackPageView).toHaveBeenCalledWith('home', {});
  });

  it('trackUserAction calls bridge', async () => {
    await trackUserAction('scroll');
    expect(bridge.trackUserAction).toHaveBeenCalledWith('scroll', {});
  });

  it('setGlobalCustomSignals calls bridge', async () => {
    await setGlobalCustomSignals({ plan: 'pro', trial: null });
    expect(bridge.setGlobalCustomSignals).toHaveBeenCalledWith({
      plan: 'pro',
      trial: null,
    });
  });

  it('tracking functions are no-ops on non-iOS', async () => {
    Platform.OS = 'android';
    await trackEvent('event');
    await trackPageView('page');
    await trackUserAction('action');
    await setGlobalCustomSignals({ key: 'val' });
    expect(bridge.trackEvent).not.toHaveBeenCalled();
    expect(bridge.trackPageView).not.toHaveBeenCalled();
    expect(bridge.trackUserAction).not.toHaveBeenCalled();
    expect(bridge.setGlobalCustomSignals).not.toHaveBeenCalled();
  });
});

describe('context fetching', () => {
  beforeEach(() => {
    Platform.OS = 'ios';
    jest.clearAllMocks();
  });

  it('recentContext returns a Context when one exists', async () => {
    const ctx = await recentContext('flow');
    expect(bridge.recentContext).toHaveBeenCalledWith('flow');
    expect(ctx).toBeInstanceOf(Context);
  });

  it('recentContext returns null when native returns -1', async () => {
    bridge.recentContext.mockResolvedValueOnce(-1);
    const ctx = await recentContext('flow');
    expect(ctx).toBeNull();
  });

  it('recentContext returns null on non-iOS', async () => {
    Platform.OS = 'android';
    const ctx = await recentContext('flow');
    expect(ctx).toBeNull();
  });

  it('instantContext returns a Context', async () => {
    const ctx = await instantContext({ flowName: 'flow' });
    expect(bridge.instantContext).toHaveBeenCalledWith('flow', 3, {});
    expect(ctx).toBeInstanceOf(Context);
  });

  it('calibrate calls bridge and invokes callback with Context', (done) => {
    calibrate({
      flowName: 'flow',
      onContextReady: (ctx: InstanceType<typeof Context>) => {
        expect(ctx).toBeInstanceOf(Context);
        expect(bridge.calibrate).toHaveBeenCalledWith('flow', 3, {});
        done();
      },
    });
  });

  it('optimize uses -1000 as sentinel when maxDelay is omitted', (done) => {
    optimize({
      flowName: 'flow',
      onGoodMoment: (ctx: InstanceType<typeof Context>) => {
        expect(ctx).toBeInstanceOf(Context);
        expect(bridge.optimize).toHaveBeenCalledWith('flow', -1000, {});
        done();
      },
    });
  });

  it('fetchContext calls bridge and invokes callback', (done) => {
    fetchContext({
      flowName: 'flow',
      onContextReady: (ctx: InstanceType<typeof Context>) => {
        expect(ctx).toBeInstanceOf(Context);
        expect(bridge.fetchContext).toHaveBeenCalledWith('flow', 3, {});
        done();
      },
    });
  });
});

describe('Context class', () => {
  beforeEach(() => {
    Platform.OS = 'ios';
    jest.clearAllMocks();
  });

  it('shouldUpsell calls the bridge', async () => {
    const ctx = new Context(10);
    const result = await ctx.shouldUpsell();
    expect(bridge.context_shouldUpsell).toHaveBeenCalledWith(10);
    expect(result).toBe(true);
  });

  it('validate calls the bridge', async () => {
    const ctx = new Context(10);
    const result = await ctx.validate();
    expect(bridge.context_validate).toHaveBeenCalledWith(10);
    expect(result).toBe('valid');
  });

  it('log calls the bridge with outcome', async () => {
    const ctx = new Context(10);
    await ctx.log(Outcome.positive);
    expect(bridge.context_log).toHaveBeenCalledWith(10, Outcome.positive);
  });

  it('appendOutcomeMetadata calls the bridge', async () => {
    const ctx = new Context(10);
    await ctx.appendOutcomeMetadata({ revenue: 4.99 });
    expect(bridge.context_appendOutcomeMetadata).toHaveBeenCalledWith(10, {
      revenue: 4.99,
    });
  });
});
