import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HealthMetricInput } from "../../components/HealthMetricInput";
import { ProgressBar } from "../../components/ProgressBar";
import { homeScreenStyles as styles } from "../../constants/homeScreenStyles";

export default function HealthInfoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Thông tin sức khỏe cơ bản
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [target, setTarget] = useState("");

  const handleSaveHealthInfo = async () => {
    // Kiểm tra đầu vào
    if (!weight || !height || !target) {
      Alert.alert("Error", "Please fill in all health information fields", [
        { text: "OK" },
      ]);
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // POST /api/health/info
      // Body: {
      //   weight: number (kg),
      //   height: number (cm),
      //   target: number (daily target in calories)
      // }

      console.log("Health Info:", {
        weight,
        height,
        target,
      });

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to activity level screen
        router.push("/(home)/ActivityInfo");
      }, 500);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        "Failed to save health information. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <ProgressBar progress={0.25} height={8} />
        </View>

        {/* Header */}
        <Text style={styles.title}>Nhập thông tin sức khỏe</Text>
        <Text style={styles.subtitle}>
          Vui lòng cung cấp thông tin cơ bản của bạn
        </Text>

        {/* Basic Health Information */}
        <View style={styles.section}>
          <HealthMetricInput
            label="Cân nặng"
            value={weight}
            onChangeText={setWeight}
            unit="kg"
            placeholder="70"
          />

          <HealthMetricInput
            label="Chiều cao"
            value={height}
            onChangeText={setHeight}
            unit="cm"
            placeholder="170"
          />

          <HealthMetricInput
            label="Giới hạn"
            value={target}
            onChangeText={setTarget}
            unit="cal"
            placeholder="2000"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleSaveHealthInfo}
          disabled={loading}
        >
          <Text style={styles.continueButtonText}>Tiếp theo</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
