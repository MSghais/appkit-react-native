import { useSnapshot } from 'valtio';
import { useEffect } from 'react';
import Modal from 'react-native-modal';
import { Card } from '@web3modal/ui-react-native';
import { ApiController, ModalController, RouterController } from '@web3modal/core-react-native';

import { Web3Router } from '../w3m-router';
import { Header } from '../../partials/w3m-header';

import styles from './styles';
import { Snackbar } from '../../partials/w3m-snackbar';

export function Web3Modal() {
  const { open } = useSnapshot(ModalController.state);
  const { history } = useSnapshot(RouterController.state);

  const onBackButtonPress = () => {
    if (history.length > 1) {
      return RouterController.goBack();
    }
    return ModalController.close();
  };

  useEffect(() => {
    ApiController.prefetch();
  }, []);

  return (
    <Modal
      style={styles.modal}
      isVisible={open}
      useNativeDriver
      statusBarTranslucent
      hideModalContentWhileAnimating
      propagateSwipe
      onBackdropPress={ModalController.close}
      onBackButtonPress={onBackButtonPress}
    >
      <Card style={styles.card}>
        <Header />
        <Web3Router />
        <Snackbar />
      </Card>
    </Modal>
  );
}
