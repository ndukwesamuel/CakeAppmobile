import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useDispatch } from "react-redux";
import { Get_Single_Vendor_Fun } from "../../../Redux/Buyer/VendorSlice";

export default function VendorDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_Single_Vendor_Fun());

    return () => {};
  }, []);

  const cakeCategories = [
    {
      id: "1",
      title: "Anniversary Cakes",
      image: "anniversary-cake-image-url",
    },
    { id: "2", title: "Birthday Cakes", image: "birthday-cake-image-url" },
    { id: "3", title: "Wedding Cakes", image: "wedding-cake-image-url" },
  ];

  return (
    <AppScreenTwo arrrow={"true"}>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Momore Cake</Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            // padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 15,
            paddingVertical: 20,
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.profileStats}>Number Of Orders</Text>
            <Text style={styles.profileStats}>23</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.profileStats}>Completed Orders</Text>

            <Text style={styles.profileStats}>23</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.profileStats}>Years Of Experience</Text>

            <Text style={styles.profileStats}>23 </Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Our vanilla sponge cake is the best option for a classy lunch and
            price. It’s the best option for a classy lunch and celebration of
            your event.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Categories of Cakes
          </Text>
          <FlatList
            data={cakeCategories}
            renderItem={({ item }) => (
              <View style={styles.cakeCard}>
                <Image source={{ uri: item.image }} style={styles.cakeImage} />
                <Text style={styles.cakeTitle}>{item.title}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </AppScreenTwo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEDEB",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileStats: {
    fontSize: 14,
    color: "#333",
  },
  descriptionSection: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cakeCard: {
    alignItems: "center",
    marginRight: 15,
  },
  cakeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  cakeTitle: {
    fontSize: 14,
    color: "#333",
  },
});
