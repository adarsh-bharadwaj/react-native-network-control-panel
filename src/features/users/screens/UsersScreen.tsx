import React from "react";
import { FlatList, Text, View } from "react-native";
import { useUsers } from "./hooks/useUsers";

/**
 * UI LAYER
 *
 * UI must never import:
 *
 * ❌ axios
 * ❌ networking
 *
 * UI only interacts with hooks.
 */

export const UsersScreen = () => {
  const { data, isLoading,error } = useUsers();
  console.log("UsersScreen render", { data, isLoading,dataa:data??[{id:1,name:"No users found"}] });
  if (isLoading) {
    return <Text>Loading users..</Text>;
  }

  const keyExtractor = (item: any) => item.id.toString();

  const renderItem = ({ item }: { item: any }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
  console.log({error})

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};