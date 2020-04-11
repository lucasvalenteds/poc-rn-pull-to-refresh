import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  RefreshControl,
  useWindowDimensions,
  Button,
} from 'react-native';

async function wait(timeInMs: number): Promise<void> {
  return new Promise((resolve) => {
    const handle = setTimeout(() => {
      resolve();
      clearTimeout(handle);
    }, timeInMs);
  });
}

export interface ListItem {
  id: string;
  text: string;
}

export function createListItem(): ListItem {
  return {
    id: Math.random().toString(),
    text: new Date().toString(),
  };
}

export const ListItemComponent: React.FC<ListItem> = (props) => {
  const style = StyleSheet.create({
    container: {
      padding: 16,
      width: '100%',
    },
    text: {
      fontSize: 16,
    },
  });

  return (
    <TouchableNativeFeedback>
      <View key={props.id} style={style.container}>
        <Text style={style.text}>{props.text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export const EmptyState: React.FC = () => {
  const window = useWindowDimensions();
  const style = StyleSheet.create({
    container: {
      width: window.width,
      height: window.height,
      justifyContent: 'center',
    },
    title: {
      fontSize: 26,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      textAlign: 'center',
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.title}>Empty log list</Text>
      <Text style={style.subtitle}>Swipe from top to bottom to load data</Text>
    </View>
  );
};

const App: React.FC = (): React.ReactElement => {
  const window = useWindowDimensions();
  const style = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    list: {
      width: window.width,
      height: window.height,
    },
  });

  const [items, setItems] = useState<ListItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onRefresh = async (): Promise<void> => {
    setLoading(true);
    await wait(500);
    setItems((previous: ListItem[]) => [createListItem(), ...previous]);
    await wait(1500);
    setLoading(false);
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <View style={style.container}>
          <FlatList
            style={style.list}
            data={items}
            renderItem={(props) => ListItemComponent(props.item)}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={['#ffea53']}
                progressBackgroundColor={'#2b7489'}
              />
            }
            ListEmptyComponent={EmptyState}
          />
          {items.length !== 0 ? (
            <Button title={'Clear'} onPress={() => setItems([])} />
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
