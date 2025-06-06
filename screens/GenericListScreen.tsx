import React, { JSX, useEffect } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { usePaginatedFetch } from "../lib/hooks/usePaginatedFetch";

type GenericListScreenProps<T> = {
  endpoint: string;
  renderItem: ({ item }: { item: T }) => JSX.Element;
};

export default function GenericListScreen<T>({
  endpoint,
  renderItem,
}: GenericListScreenProps<T>) {
  const { data, loading, fetchData } = usePaginatedFetch<T>(endpoint);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#23272f" }}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator color="#3fa796" size={"large"} /> : null
        }
      />
    </View>
  );
}
