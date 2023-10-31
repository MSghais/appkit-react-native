import { useSnapshot } from 'valtio';
import { ScrollView } from 'react-native';
import {
  ApiController,
  AssetUtil,
  ConnectionController,
  RouterController
} from '@web3modal/core-react-native';
import type { WcWallet } from '@web3modal/core-react-native';
import { ListWallet, FlexView } from '@web3modal/ui-react-native';
import { UiUtil } from '../../utils/UiUtil';
import { useDimensions } from '../../hooks/useDimensions';
import styles from './styles';

export function ConnectView() {
  const { recommended, featured, installed, count } = useSnapshot(ApiController.state);
  const { recentWallets } = useSnapshot(ConnectionController.state);
  const imageHeaders = ApiController._getApiHeaders();
  const { width: maxWidth } = useDimensions();

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

  const onWalletPress = (wallet: WcWallet) => {
    RouterController.push('ConnectingWalletConnect', { wallet });
  };

  const recentTemplate = () => {
    if (!recentWallets?.length) {
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
        />
      ));
  };

  const installedTemplate = () => {
    if (!installed.length) {
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
        />
      ));
  };

  const featuredTemplate = () => {
    if (!featured.length || FEATURED_COUNT < 1) {
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
        />
      ));
  };

  const recommendedTemplate = () => {
    if (!recommended.length || featured.length || RECOMMENDED_COUNT < 1) {
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
        />
      ));
  };

  const allWalletsTemplate = () => {
    return (
      <ListWallet
        walletIcon="allWallets"
        name="All wallets"
        tagLabel={`${Math.floor(count / 10) * 10}+`}
        tagVariant="shade"
        onPress={() => RouterController.push('AllWallets')}
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
    <ScrollView
      style={[styles.container, { width: maxWidth }]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <FlexView padding={['s', 's', '2xl', 's']} rowGap="2xs">
        {recentTemplate()}
        {installedTemplate()}
        {featuredTemplate()}
        {recommendedTemplate()}
        {allWalletsTemplate()}
      </FlexView>
    </ScrollView>
  );
}
