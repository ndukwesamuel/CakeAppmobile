import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useDispatch, useSelector } from "react-redux";
import { Wishlist_Func } from "../../../Redux/Buyer/OrderSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist_data } = useSelector((state) => state?.OrderSlice);

  useEffect(() => {
    dispatch(Wishlist_Func());
    return () => {};
  }, []);

  console.log({
    ggfg: wishlist_data?.wishlist?.items,
  });

  return (
    <AppScreenThree arrrow={"true"} title={"Wishlist"}>
      <ScrollView style={styles.container}>
        <FlatList
          data={wishlist_data?.wishlist?.items}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.container2}>
              <Image />
              <Text></Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text></Text>
                <Image />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center", // Center horizontally
              }}
            >
              <Text>No Item in Wish List </Text>
            </View>
          }
        />
      </ScrollView>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  container2: {
    borderColor: "#00000033",
    borderWidth: 0.5,
    gap: 12,
    padding: 16,
    borderRadius: 8,
  },
});

const renderItem = () => {
  return <View></View>;
};
