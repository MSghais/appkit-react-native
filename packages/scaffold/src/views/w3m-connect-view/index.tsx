import { useSnapshot } from 'valtio';
import { ScrollView } from 'react-native';
import {
  ApiController,
  AssetUtil,
  ConnectionController,
  ConnectorController,
  RouterController
} from '@web3modal/core-react-native';
import type { WcWallet } from '@web3modal/core-react-native';
import { ListWallet, FlexView } from '@web3modal/ui-react-native';
import { UiUtil } from '../../utils/UiUtil';
import { useCustomDimensions } from '../../hooks/useCustomDimensions';
import styles from './styles';

export function ConnectView() {
  const { recommended, featured, installed, count } = useSnapshot(ApiController.state);
  const { recentWallets } = useSnapshot(ConnectionController.state);
  const { connectors } = useSnapshot(ConnectorController.state);
  const imageHeaders = ApiController._getApiHeaders();
  const { padding } = useCustomDimensions();
  const isWalletConnectEnabled = connectors.find(c => c.type === 'WALLET_CONNECT');

  const RECENT_COUNT = recentWallets?.length ? (installed.length ? 1 : 2) : 0;

  const INSTALLED_COUNT =
    installed.length >= UiUtil.TOTAL_VISIBLE_WALLETS
      ? UiUtil.TOTAL_VISIBLE_WALLETS - RECENT_COUNT
      : installed.length;

  const FEATURED_COUNT = featured.length
    ? UiUtil.TOTAL_VISIBLE_WALLETS - RECENT_COUNT - INSTALLED_COUNT
    : 0;

  const RECOMMENDED_COUNT =
    UiUtil.TOTAL_VISIBLE_WALLETS - RECENT_COUNT - INSTALLED_COUNT - FEATURED_COUNT;

  const onExternalWalletPress = async (connector: any) => {
    RouterController.push('ConnectingExternal', { connector });
  };

  const onWalletPress = (wallet: WcWallet) => {
    RouterController.push('ConnectingWalletConnect', { wallet });
  };

  const recentTemplate = () => {
    if (!isWalletConnectEnabled || !recentWallets?.length) {
      return null;
    }

    return recentWallets
      .slice(0, RECENT_COUNT)
      .map(wallet => (
        <ListWallet
          key={wallet?.id}
          imageSrc={AssetUtil.getWalletImage(wallet)}
          imageHeaders={imageHeaders}
          name={wallet?.name ?? 'Unknown'}
          onPress={() => onWalletPress(wallet!)}
          tagLabel="Recent"
          tagVariant="shade"
          style={styles.item}
        />
      ));
  };

  const installedTemplate = () => {
    if (!isWalletConnectEnabled || !installed.length) {
      return null;
    }

    const list = filterOutRecentWallets([...installed]);

    return list
      .slice(0, INSTALLED_COUNT)
      .map(wallet => (
        <ListWallet
          key={wallet?.id}
          imageSrc={AssetUtil.getWalletImage(wallet)}
          imageHeaders={imageHeaders}
          name={wallet?.name ?? 'Unknown'}
          onPress={() => onWalletPress(wallet!)}
          style={styles.item}
          installed
        />
      ));
  };

  const featuredTemplate = () => {
    if (!isWalletConnectEnabled || !featured.length || FEATURED_COUNT < 1) {
      return null;
    }

    const list = filterOutRecentWallets([...featured]);

    return list
      .slice(0, FEATURED_COUNT)
      .map(wallet => (
        <ListWallet
          key={wallet?.id}
          imageSrc={AssetUtil.getWalletImage(wallet)}
          imageHeaders={imageHeaders}
          name={wallet?.name ?? 'Unknown'}
          onPress={() => onWalletPress(wallet!)}
          style={styles.item}
        />
      ));
  };

  const recommendedTemplate = () => {
    if (
      !isWalletConnectEnabled ||
      !recommended.length ||
      featured.length ||
      RECOMMENDED_COUNT < 1
    ) {
      return null;
    }
    const list = filterOutRecentWallets([...recommended]);

    return list
      .slice(0, RECOMMENDED_COUNT)
      .map(wallet => (
        <ListWallet
          key={wallet?.id}
          imageSrc={AssetUtil.getWalletImage(wallet)}
          imageHeaders={imageHeaders}
          name={wallet?.name ?? 'Unknown'}
          onPress={() => onWalletPress(wallet!)}
          style={styles.item}
        />
      ));
  };

  const connectorsTemplate = () => {
    return connectors.map(connector => {
      if (connector.type === 'WALLET_CONNECT') return null;

      return (
        <ListWallet
          key={connector.type}
          imageSrc={AssetUtil.getConnectorImage(connector)}
          imageHeaders={imageHeaders}
          name={connector.name || 'Unknown'}
          onPress={() => {
            onExternalWalletPress(connector);
          }}
          style={styles.item}
          installed={connector.installed}
        />
      );
    });
  };

  const allWalletsTemplate = () => {
    if (!isWalletConnectEnabled) {
      return null;
    }

    const label = count > 10 ? `${Math.floor(count / 10) * 10}+` : count;

    return (
      <ListWallet
        name="All wallets"
        showAllWallets
        tagLabel={String(label)}
        tagVariant="shade"
        onPress={() => RouterController.push('AllWallets')}
        style={styles.item}
        testID="button-all-wallets"
      />
    );
  };

  const filterOutRecentWallets = (wallets: WcWallet[]) => {
    const recentIds = recentWallets?.slice(0, RECENT_COUNT).map(wallet => wallet.id);
    if (!recentIds?.length) return wallets;

    const filtered = wallets.filter(wallet => !recentIds.includes(wallet.id));

    return filtered;
  };

  return (
    <ScrollView style={{ paddingHorizontal: padding }} bounces={false}>
      <FlexView padding={['xs', 's', '2xl', 's']}>
        {recentTemplate()}
        {installedTemplate()}
        {featuredTemplate()}
        {recommendedTemplate()}
        {connectorsTemplate()}
        {allWalletsTemplate()}
      </FlexView>
    </ScrollView>
  );
}
