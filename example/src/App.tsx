import * as React from 'react';

import { StyleSheet, View, Text, Button, Appearance } from 'react-native';
import {
  setup,
  trackEvent,
  trackPageView,
  trackUserAction,
  calibrate,
  instantContext,
  fetchContext,
  optimize,
  setGlobalCustomSignals,
} from 'react-native-context-sdk';
import { Outcome } from '../../src/context';

export default function App() {
  const [result, setResult] = React.useState<boolean | undefined>();
  const [shouldUpsell, setShouldUpsell] = React.useState<boolean | undefined>();
  const [validateOutput, setValidateOutput] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    setup(
      'cb980d70d02f321709434529063ac040be6acdd221685e875059efe93591e58281c52e8e4a52532b09aabde0f0d55342b66f711fdddb59a395944e1430f9ff7a'
    ).then((res) => {
      setResult(res);
    });

    setGlobalCustomSignals({
      test_key_string: 'test_value_1',
      test_key_int: 123,
      test_key_float: 123.456,
      test_key_bool: true,
      key_to_delete: 'delete_me',
    }).then(() => {
      setGlobalCustomSignals({
        key_to_delete: null,
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>License Valid: {String(result)}</Text>
      <Text style={styles.label}>Should Upsell: {String(shouldUpsell)}</Text>
      <Text style={styles.label}>Validate Output: {validateOutput}</Text>
      <Button
        title="Track Event"
        onPress={() => {
          trackEvent('test_event', { a: 'b' });
        }}
      />
      <Button
        title="Track Page View"
        onPress={() => {
          trackPageView('test_page_view', { c: 'd' });
        }}
      />
      <Button
        title="Track User Action"
        onPress={() => {
          trackUserAction('test_user_action', { e: 'f' });
        }}
      />
      <Button
        title="Calibrate"
        onPress={async () => {
          setShouldUpsell(undefined);
          setValidateOutput(undefined);
          calibrate({
            flowName: 'test_flow_calibrate',
            maxDelay: 0,
            // This may take up to 3 seconds to be called.
            onContextReady: async (context) => {
              setShouldUpsell(await context.shouldUpsell());
              const output = await context.validate();
              setValidateOutput(output);
              await context.appendOutcomeMetadata({
                test_key_string: 'test_value_23',
                test_key_int: 1245,
                test_key_float: 1245.456,
                test_key_bool: false,
                fake_bool: 15,
              });
              await context.log(Outcome.positive);
            },
            customSignals: {
              test_key_string: 'test_value_2',
              test_key_int: 124,
              test_key_float: 124.456,
              test_key_bool: false,
              fake_bool: 1,
            },
          });
        }}
      />
      <Button
        title="Optimize"
        onPress={async () => {
          setShouldUpsell(undefined);
          setValidateOutput(undefined);

          // This block is only called if it is a good time. Otherwise the promise will never resolve.
          optimize({
            flowName: 'test_flow_optimize',
            onGoodMoment: async (context) => {
              setShouldUpsell(await context.shouldUpsell());
              const output = await context.validate();
              setValidateOutput(output);
              context.log(Outcome.positive);
            },
          });
        }}
      />
      <Button
        title="Optimize maxDelay:0"
        onPress={async () => {
          setShouldUpsell(undefined);
          setValidateOutput(undefined);

          // This block is only called if it is a good time. Otherwise the promise will never resolve.
          optimize({
            flowName: 'test_flow_optimize',
            maxDelay: 0,
            onGoodMoment: async (context) => {
              setShouldUpsell(await context.shouldUpsell());
              const output = await context.validate();
              setValidateOutput(output);
              context.log(Outcome.positive);
            },
          });
        }}
      />
      <Button
        title="Instant Context"
        onPress={async () => {
          setShouldUpsell(undefined);
          setValidateOutput(undefined);

          const context = await instantContext({
            flowName: 'test_flow_instant',
            customSignals: {
              test_key_string: 'test_value_2',
              test_key_int: 124,
              test_key_float: 124.456,
              test_key_bool: false,
              fake_bool: 1,
            },
          });
          setShouldUpsell(await context.shouldUpsell());
          const output = await context.validate();
          setValidateOutput(output);
          context.log(Outcome.positive);
        }}
      />
      <Button
        title="Fetch Context"
        onPress={async () => {
          setShouldUpsell(undefined);
          setValidateOutput(undefined);

          // This may take up to 3 seconds to resolve.
          fetchContext({
            flowName: 'test_flow_fetch',
            onContextReady: async (context) => {
              setShouldUpsell(await context.shouldUpsell());
              const output = await context.validate();
              setValidateOutput(output);
              context.log(Outcome.positive);
            },
            customSignals: {
              test_key_string: 'test_value_22',
              test_key_int: 124,
              test_key_float: 124.456,
              test_key_bool: false,
              fake_bool: 1,
            },
          });
        }}
      />
    </View>
  );
}

const colorScheme = Appearance.getColorScheme();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colorScheme === 'dark' ? 'white' : 'black',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
