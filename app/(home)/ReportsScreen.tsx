import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { homeScreenStyles as menuStyles } from "../../constants/homeScreenStyles";
import { colors } from "../../constants/theme";

const screenWidth = Dimensions.get("window").width;

interface ChartData {
  label: string;
  value: number;
}

export default function ReportsScreen() {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"week" | "month">("week");

  // Sample weight progress data - Week
  const weightDataWeek: ChartData[] = [
    { label: "20", value: 75 },
    { label: "21", value: 74.5 },
    { label: "22", value: 74.2 },
    { label: "23", value: 73.8 },
    { label: "24", value: 73.5 },
    { label: "25", value: 73.2 },
  ];

  // Sample weight progress data - Month
  const weightDataMonth: ChartData[] = [
    { label: "1", value: 78 },
    { label: "5", value: 76.5 },
    { label: "10", value: 75.2 },
    { label: "15", value: 74 },
    { label: "20", value: 73.5 },
    { label: "25", value: 73 },
  ];

  // Sample daily activity data - Week
  const activityDataWeek: ChartData[] = [
    { label: "20", value: 8500 },
    { label: "21", value: 9200 },
    { label: "22", value: 10500 },
    { label: "23", value: 7800 },
    { label: "24", value: 9600 },
    { label: "25", value: 11200 },
  ];

  // Sample daily activity data - Month
  const activityDataMonth: ChartData[] = [
    { label: "1", value: 6000 },
    { label: "5", value: 8500 },
    { label: "10", value: 9200 },
    { label: "15", value: 10500 },
    { label: "20", value: 9800 },
    { label: "25", value: 11200 },
  ];

  // Select data based on tab
  const weightData = selectedTab === "week" ? weightDataWeek : weightDataMonth;
  const activityData = selectedTab === "week" ? activityDataWeek : activityDataMonth;

  const maxWeight = Math.max(...weightData.map((d) => d.value));
  const minWeight = Math.min(...weightData.map((d) => d.value));
  const maxActivity = Math.max(...activityData.map((d) => d.value));

  // Line chart rendering
  const renderWeightChart = () => {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.yAxisContainer}>
          <Text style={styles.yAxisLabel}>75</Text>
          <Text style={styles.yAxisLabel}>50</Text>
          <Text style={styles.yAxisLabel}>25</Text>
          <Text style={styles.yAxisLabel}>0</Text>
        </View>

        <View style={styles.lineChartWrapper}>
          <svg
            width={screenWidth - 80}
            height={180}
            viewBox={`0 0 ${screenWidth - 80} 180`}
            style={styles.svgChart}
          >
            <polyline
              points={weightData
                .map((d, i) => {
                  const x = (i / (weightData.length - 1)) * (screenWidth - 120);
                  const y =
                    180 - ((d.value - minWeight) / (maxWeight - minWeight)) * 150;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Data points and labels */}
          <View style={styles.dataPointsContainer}>
            {weightData.map((d, i) => {
              const x = (i / (weightData.length - 1)) * (screenWidth - 120);
              const y =
                180 - ((d.value - minWeight) / (maxWeight - minWeight)) * 150;
              return (
                <View
                  key={i}
                  style={[
                    styles.dataPoint,
                    { left: x - 4, top: y - 4 },
                  ]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.xAxisLabels}>
          {weightData.map((d, i) => (
            <Text key={i} style={styles.xAxisLabel}>
              {d.label}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  // Bar chart rendering
  const renderActivityChart = () => {
    const barWidth = (screenWidth - 60) / activityData.length - 2;

    return (
      <View style={styles.barChartContainer}>
        <View style={styles.barsWrapper}>
          {activityData.map((d, i) => {
            const barHeight = (d.value / maxActivity) * 120;
            return (
              <View key={i} style={styles.barItem}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      width: barWidth,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{d.label}</Text>
              </View>
            );
          })}
        </View>
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
        <Text style={styles.reportsNotificationIcon}>🔔</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header Section */}
        <View style={styles.reportsHeaderSection}>
          <Text style={styles.reportsHeaderTitle}>Thống kê & Báo cáo</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "week" && styles.tabActive,
            ]}
            onPress={() => setSelectedTab("week")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "week" && styles.tabTextActive,
              ]}
            >
              Tuần
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "month" && styles.tabActive,
            ]}
            onPress={() => setSelectedTab("month")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "month" && styles.tabTextActive,
              ]}
            >
              Tháng
            </Text>
          </TouchableOpacity>
        </View>

        {/* Weight Progress Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Tiến trình cân nặng</Text>
            <Text style={styles.cardSubtitle}>
              {selectedTab === "week" ? "Tuần này: 1.8 kg" : "Tháng này: 5 kg"}
            </Text>
          </View>

          {renderWeightChart()}

          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>Mục tiêu: 65 kg</Text>
          </View>
        </View>

        {/* Daily Activity Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Hoạt động hàng ngày</Text>
          </View>

          <View style={styles.activityInfo}>
            <Text style={styles.activityLabel}>Mục tiêu:</Text>
            <Text style={styles.activityValue}>
              {selectedTab === "week" ? "10,000 bước/ngày" : "250,000 bước/tháng"}
            </Text>
          </View>

          {renderActivityChart()}
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
