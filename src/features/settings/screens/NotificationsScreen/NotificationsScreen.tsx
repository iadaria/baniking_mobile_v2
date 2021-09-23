import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import {
  AppText,
  Block,
  Divider,
  AppSwitch,
} from '~/src/app/common/components/UI';
import {
  AppPermission,
  PERMISSION_TYPE,
} from '~/src/app/common/components/AppPersmission';
import { logline } from '~/src/app/utils/debug';
import { Header } from '~/src/app/common/components/Header';

export function NotificationsScreen() {
  async function handleNotifyPermission() {
    logline('', '[NotificationsScreen/handleNotificationsPermission]');
    const result = await AppPermission.requestNotifyPermission();
    if (!result) {
      try {
        logline('result', result);
        Linking.openSettings();
        // Linking.openURL('baniking_mobile://app/notifications');
      } catch (error) {
        logline('[NotificationsScreen/handleNotifyPersmissions/link]', error);
      }
    }
  }

  return (
    <Block full base>
      <Header iconKind="backward" />
      <AppText h1>Уведомления</AppText>

      <Block margin={[3, 0]}>
        <Block style={styles.item} center>
          <AppText>Новостная рассылка (Email)</AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Приглашения на собрания (Push)</AppText>
          <AppSwitch onPress={async () => await handleNotifyPermission()} />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Приглашения на собрания (Email) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Изменение статуса (Push) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Участие в собраниях (Push) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Участие в собраниях (Email) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />

        <Block style={styles.item} center>
          <AppText>Новостная рассылка (Email) </AppText>
          <AppSwitch />
        </Block>

        <Divider style={styles.divider} height={1.5} />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
