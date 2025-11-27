import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Sidebar from "../../components/Sidebar";
import { homeScreenStyles as styles } from "../../constants/homeScreenStyles";

interface Recommendation {
  id: string;
  title: string;
  icon: string;
  description: string[];
  tips: string;
  viewDetails: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "plan-a",
    title: "Kế hoạch A",
    icon: "🚶",
    description: [
      "Lương cao năng",
      "Lương cao độ bền",
      "Lương nước cân xứng",
      "Thời gian ngủ",
    ],
    tips: "56 bài tập",
    viewDetails: "Xem chi tiết",
  },
  {
    id: "plan-b",
    title: "Kế hoạch B",
    icon: "🚴",
    description: [
      "Lương cao năng",
      "Lương cao độ bền",
      "Lương nước cân xứng",
      "Thời gian ngủ",
    ],
    tips: "56 bài tập",
    viewDetails: "Xem chi tiết",
  },
  {
    id: "plan-c",
    title: "Kế hoạch C",
    icon: "🏊",
    description: [
      "Lương cao năng",
      "Lương cao độ bền",
      "Lương nước cân xứng",
      "Thời gian ngủ",
    ],
    tips: "56 bài tập",
    viewDetails: "Xem chi tiết",
  },
];

export default function RecommendationScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedPlanDetail, setSelectedPlanDetail] =
    useState<Recommendation | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleConfirm = async () => {
    if (!selectedPlan) {
      alert("Vui lòng chọn một kế hoạch");
      return;
    }

    setLoading(true);

    try {
      // TODO: Backend - Save selected recommendation plan
      // POST /api/health/recommendation
      // Body: { planId: string }
      // Response: { success: true, message: string }

      console.log("Selected Plan:", selectedPlan);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to main app
        router.replace("/");
      }, 500);
    } catch (error) {
      setLoading(false);
      alert("Lỗi khi lưu kế hoạch. Vui lòng thử lại.");
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Menu Button with Header */}
      <View style={styles.headerWithMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowSidebar(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { marginBottom: 0 }]}>Gợi ý kế hoạch</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          {RECOMMENDATIONS.map((recommendation) => (
            <TouchableOpacity
              key={recommendation.id}
              style={[
                styles.recommendationCard,
                selectedPlan === recommendation.id &&
                  styles.recommendationCardSelected,
              ]}
              onPress={() => handleSelectPlan(recommendation.id)}
            >
              {/* Icon and Title */}
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationIcon}>
                  {recommendation.icon}
                </Text>
                <Text style={styles.recommendationTitle}>
                  {recommendation.title}
                </Text>
              </View>

              {/* Description List */}
              <View style={styles.descriptionContainer}>
                {recommendation.description.map((item, index) => (
                  <Text key={index} style={styles.descriptionItem}>
                    {item}
                  </Text>
                ))}
              </View>

              {/* Tips */}
              <Text style={styles.tipsText}>{recommendation.tips}</Text>

              {/* View Details Link */}
              <TouchableOpacity
                onPress={() => {
                  const plan = RECOMMENDATIONS.find(
                    (r) => r.id === recommendation.id
                  );
                  if (plan) setSelectedPlanDetail(plan);
                }}
              >
                <Text style={styles.viewDetailsLink}>
                  {recommendation.viewDetails}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedPlan && styles.continueButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!selectedPlan || loading}
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
      </ScrollView>

      {/* Sidebar Component */}
      <Sidebar visible={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Plan Details Modal */}
      <Modal
        visible={!!selectedPlanDetail}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPlanDetail(null)}
      >
        <View style={styles.detailsOverlay}>
          <View style={styles.detailsContent}>
            <TouchableOpacity
              style={styles.detailsCloseButton}
              onPress={() => setSelectedPlanDetail(null)}
            >
              <Text style={styles.detailsCloseIcon}>✕</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedPlanDetail && (
                <>
                  <Text style={styles.detailsIcon}>
                    {selectedPlanDetail.icon}
                  </Text>
                  <Text style={styles.detailsTitle}>
                    {selectedPlanDetail.title}
                  </Text>

                  <View style={styles.detailsSection}>
                    <Text style={styles.detailsSectionTitle}>Thông tin</Text>
                    {selectedPlanDetail.description.map((item, index) => (
                      <Text key={index} style={styles.detailsDescriptionItem}>
                        • {item}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.detailsSection}>
                    <Text style={styles.detailsSectionTitle}>Tập luyện</Text>
                    <Text style={styles.detailsTipsText}>
                      {selectedPlanDetail.tips}
                    </Text>
                  </View>

                  <View style={styles.detailsSection}>
                    <Text style={styles.detailsDescription}>
                      Kế hoạch này được thiết kế dựa trên thông tin sức khỏe của
                      bạn để giúp bạn đạt được mục tiêu một cách an toàn và hiệu
                      quả.
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.detailsCloseButtonBottom}
              onPress={() => setSelectedPlanDetail(null)}
            >
              <Text style={styles.detailsCloseButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
