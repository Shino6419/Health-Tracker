import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityCard } from "../../components/ActivityCard";
import { homeScreenStyles as menuStyles } from "../../constants/homeScreenStyles";

interface HealthMetrics {
  bmi: number;
  bmr: number;
  tdee: number;
  calories: {
    burned: number;
    target: number;
    percentage: number;
  };
}

export default function DashboardScreen() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<HealthMetrics>({
    bmi: 22.5,
    bmr: 1850,
    tdee: 2200,
    calories: {
      burned: 350,
      target: 650,
      percentage: 65.02,
    },
  });
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Load user data from API or storage
    // TODO: Fetch real data from backend
  }, []);

  const renderCalorieCircle = () => {
    const percentage = Math.min(metrics.calories.percentage, 100);
    const rotation = (percentage / 100) * 360;

    return (
      <View style={styles.circleContainer}>
        {/* Background circle */}
        <View style={styles.circleOuter}>
          {/* Rotating progress arc */}
          <View
            style={[
              styles.circleArc,
              {
                transform: [{ rotate: `${rotation}deg` }],
              },
            ]}
          />
          {/* Inner circle to create donut effect */}
          <View style={styles.circleInner} />
        </View>
        {/* Percentage text */}
        <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Menu Button */}
      <View style={menuStyles.headerWithMenu}>
        <TouchableOpacity
          style={menuStyles.menuButton}
          onPress={() => setShowSidebar(true)}
        >
          <Text style={menuStyles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>Kết quả phân tích sức khỏe</Text>
          <Text style={styles.dashboardHeaderIcon}>⚙️</Text>
        </View>

        {/* Health Metrics Cards Grid */}
        <View style={styles.metricsSection}>
          <View style={styles.metricsRow}>
            <ActivityCard
              icon="📊"
              label="BMI"
              value={metrics.bmi.toFixed(1)}
              unit="BMI"
            />
            <ActivityCard
              icon="📈"
              label="Trạng thái cơ thể"
              value="Bình thường"
              unit="Trạng thái"
            />
          </View>

          <View style={styles.metricsRow}>
            <ActivityCard
              icon="🔥"
              label="BMR"
              value={metrics.bmr.toString()}
              unit="BMI"
            />
            <ActivityCard
              icon="⚡"
              label="TDEE"
              value={metrics.tdee.toString()}
              unit="TDEE"
            />
          </View>
        </View>

        {/* Calorie Information Card */}
        <View style={styles.calorieCard}>
          <Text style={styles.calorieTitle}>Sơ đồ về calo</Text>

          <View style={styles.calorieContent}>
            {/* Circle Progress */}
            {renderCalorieCircle()}

            {/* Calorie Stats */}
            <View style={styles.calorieStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Đốt cháy</Text>
                <Text style={styles.statValue}>{metrics.calories.burned}kcal</Text>
              </View>
              <Text style={styles.statSeparator}>•</Text>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Tổng thu vào</Text>
                <Text style={styles.statValue}>{metrics.calories.target}kcal</Text>
              </View>
              <Text style={styles.statSeparator}>•</Text>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Mỗi lần</Text>
                <Text style={styles.statValue}></Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sidebar Modal */}
      <Modal
        visible={showSidebar}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSidebar(false)}
      >
        <View style={menuStyles.sidebarOverlay}>
          <View style={menuStyles.sidebarContent}>
            <View style={menuStyles.sidebarHeader}>
              <Text style={menuStyles.sidebarTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setShowSidebar(false)}>
                <Text style={menuStyles.sidebarCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={menuStyles.sidebarBody}>
              <TouchableOpacity
                style={menuStyles.sidebarItem}
                onPress={() => {
                  setShowSidebar(false);
                  router.push("/(home)/DashboardScreen");
                }}
              >
                <Text style={menuStyles.sidebarItemText}>Dashboard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={menuStyles.sidebarItem}
                onPress={() => {
                  setShowSidebar(false);
                  router.push("/(home)/HealthInfo");
                }}
              >
                <Text style={menuStyles.sidebarItemText}>Thông tin sức khỏe</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={menuStyles.sidebarItem}
                onPress={() => {
                  setShowSidebar(false);
                  router.push("/(home)/ActivityInfo");
                }}
              >
                <Text style={menuStyles.sidebarItemText}>Mức độ vận động</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={menuStyles.sidebarItem}
                onPress={() => {
                  setShowSidebar(false);
                  router.push("/(home)/CalendarScreen");
                }}
              >
                <Text style={menuStyles.sidebarItemText}>Lịch tập luyện</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={menuStyles.sidebarItem}
                onPress={() => {
                  setShowSidebar(false);
                  router.push("/(home)/ReportsScreen");
                }}
              >
                <Text style={menuStyles.sidebarItemText}>Thống kê & Báo cáo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={menuStyles.sidebarItem}
                onPress={() => {
                  setShowSidebar(false);
                  router.push("/(auth)/Login");
                }}
              >
                <Text style={menuStyles.sidebarItemText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = menuStyles;
