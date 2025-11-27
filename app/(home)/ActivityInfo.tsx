import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ProgressBar } from "../../components/ProgressBar";
import { homeScreenStyles as styles } from "../../constants/homeScreenStyles";
import { colors } from "../../constants/theme";

interface Activity {
  id: string;
  icon: string;
  label: string;
  unit: string;
}

interface ActivityWithValue extends Activity {
  value: string;
  targetValue?: string;
}

const AVAILABLE_ACTIVITIES: Activity[] = [
  { id: "walking", icon: "🚶", label: "Chạy bộ", unit: "/km" },
  { id: "cycling", icon: "🚴", label: "Đạp xe", unit: "/km" },
  { id: "swimming", icon: "🏊", label: "Bơi lội", unit: "/phút" },
];

export default function ActivityLevelScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<
    ActivityWithValue[]
  >([]);

  const handleAddActivity = (activity: Activity) => {
    if (!selectedActivities.find((a) => a.id === activity.id)) {
      setSelectedActivities([
        ...selectedActivities,
        { ...activity, value: "" },
      ]);
    }
    setShowActivityModal(false);
  };

  const handleUpdateActivityValue = (id: string, value: string) => {
    setSelectedActivities(
      selectedActivities.map((a) => (a.id === id ? { ...a, value } : a))
    );
  };

  const handleUpdateTargetValue = (id: string, value: string) => {
    setSelectedActivities(
      selectedActivities.map((a) =>
        a.id === id ? { ...a, targetValue: value } : a
      )
    );
  };

  const handleRemoveActivity = (id: string) => {
    setSelectedActivities(selectedActivities.filter((a) => a.id !== id));
  };

  const handleSaveActivityLevel = async () => {
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // POST /api/health/activity
      // Body: {
      //   activities: ActivityWithValue[]
      // }

      console.log("Activity Level:", {
        activities: selectedActivities,
      });

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to dashboard screen
        router.push("/(home)/DashboardScreen");
      }, 500);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to save activity level. Please try again.", [
        { text: "OK" },
      ]);
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
          <ProgressBar progress={0.75} height={8} />
        </View>

        {/* Header */}
        <Text style={styles.title}>Nhập thông tin sức khỏe</Text>
        <Text style={styles.subtitle}>Vui lòng cung cấp thông tin của bạn</Text>

        {/* Activity Level Section */}
        <Text style={styles.sectionTitle}>Mức độ vận động của bạn</Text>

        {selectedActivities.length === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowActivityModal(true)}
          >
            <Text style={styles.addButtonText}>+ Thêm hoạt động</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.activitiesContainer}>
              {selectedActivities.map((activity) => (
                <View key={activity.id} style={styles.activityInputWrapper}>
                  <View style={styles.activityItemHeader}>
                    <Text style={styles.activityItemIcon}>{activity.icon}</Text>
                    <Text style={styles.activityItemLabel}>
                      {activity.label}
                    </Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveActivity(activity.id)}
                    >
                      <Text style={styles.removeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.valueInput}
                      placeholder="Nhập số"
                      keyboardType="decimal-pad"
                      value={activity.value}
                      onChangeText={(text) =>
                        handleUpdateActivityValue(activity.id, text)
                      }
                      placeholderTextColor={colors.textMuted}
                    />
                    <Text style={styles.unitText}>{activity.unit}</Text>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={() => setShowActivityModal(true)}
            >
              <Text style={styles.addMoreButtonText}>
                + Thêm hoạt động khác
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Target Section - Automatically shows selected activities */}
        {selectedActivities.length > 0 && (
          <View style={styles.targetSectionContainer}>
            <Text style={styles.sectionTitle}>Mục tiêu của bạn</Text>

            <View style={styles.targetsContainer}>
              {selectedActivities.map((activity) => (
                <View
                  key={`target-${activity.id}`}
                  style={styles.activityInputWrapper}
                >
                  <View style={styles.activityItemHeader}>
                    <Text style={styles.activityItemIcon}>{activity.icon}</Text>
                    <Text style={styles.activityItemLabel}>
                      {activity.label}
                    </Text>
                  </View>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.valueInput}
                      placeholder="Nhập số mục tiêu"
                      keyboardType="decimal-pad"
                      value={activity.targetValue || ""}
                      onChangeText={(text) =>
                        handleUpdateTargetValue(activity.id, text)
                      }
                      placeholderTextColor={colors.textMuted}
                    />
                    <Text style={styles.unitText}>{activity.unit}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleSaveActivityLevel}
          disabled={loading || selectedActivities.length === 0}
        >
          <Text style={styles.continueButtonText}>Hoàn tất</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>

        {/* Activity Selection Modal */}
        <Modal
          visible={showActivityModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowActivityModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Chọn hoạt động</Text>
                <TouchableOpacity onPress={() => setShowActivityModal(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                {AVAILABLE_ACTIVITIES.map((activity) => (
                  <TouchableOpacity
                    key={activity.id}
                    style={styles.modalItem}
                    onPress={() => handleAddActivity(activity)}
                  >
                    <Text style={styles.modalItemIcon}>{activity.icon}</Text>
                    <Text style={styles.modalItemLabel}>{activity.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
