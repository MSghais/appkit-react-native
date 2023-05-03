import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import type { FormattedRcpError, FormattedRpcResponse } from '../types/methods';
import Close from '../assets/Close.png';

interface Props {
  rcpResponse?: FormattedRpcResponse;
  isVisible: boolean;
  onClose: () => void;
  isLoading?: boolean;
  rcpError?: FormattedRcpError;
}

export function RequestModal({
  rcpResponse,
  rcpError,
  isVisible,
  onClose,
  isLoading,
}: Props) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Image source={Close} />
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        {isLoading && (
          <>
            <Text style={styles.title}>Pending JSON-RPC Request</Text>
            <ActivityIndicator color="#3396FF" style={styles.loader} />
            <Text style={styles.center}>
              Approve or reject request using your wallet
            </Text>
          </>
        )}
        {rcpResponse && (
          <>
            <Text style={[styles.title, styles.successText]}>
              JSON-RPC Request Response
            </Text>
            {Object.keys(rcpResponse).map((key) => (
              <Text key={key} style={styles.subtitle}>
                {key}:{' '}
                <Text style={styles.responseText}>
                  {rcpResponse[key as keyof FormattedRpcResponse]?.toString()}
                </Text>
              </Text>
            ))}
          </>
        )}
        {rcpError && (
          <>
            <Text style={[styles.title, styles.failureText]}>
              JSON-RPC Request Failure
            </Text>
            <Text style={styles.subtitle}>
              Method: <Text style={styles.responseText}>{rcpError.method}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Error: <Text style={styles.responseText}>{rcpError.error}</Text>
            </Text>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    margin: 8,
  },
  innerContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  loader: {
    marginVertical: 24,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  successText: {
    color: '#3396FF',
  },
  failureText: {
    color: '#F05142',
  },
  subtitle: {
    fontWeight: 'bold',
    marginVertical: 4,
  },
  center: {
    textAlign: 'center',
  },
  responseText: {
    fontWeight: '300',
  },
});
