import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export interface ListItem {
  id: string;
  text: string;
}

export function createListItem(index: number): ListItem {
  return {
    id: index.toString(),
    text: Math.random() + '-' + Date.now(),
  };
}

export const ListItemComponent: React.FC<ListItem> = (props) => {
  const style = StyleSheet.create({
    container: {
      padding: 16,
      width: '100%',
    },
    text: {
      padding: 16,
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

const App: React.FC = (): React.ReactElement => {
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const listItems = Array(10)
      .fill(0)
      .map((_, index: number) => createListItem(index));

    setItems(listItems);
  }, []);

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <FlatList
          data={items}
          renderItem={(props) => ListItemComponent(props.item)}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
