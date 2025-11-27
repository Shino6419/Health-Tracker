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
import { homeScreenStyles as menuStyles } from "../../constants/homeScreenStyles";

interface DailyRecommendation {
  id: string;
  title: string;
  icon: string;
  duration?: string;
  calories: string;
  description?: string;
}

interface DaySchedule {
  day: string;
  date: number;
  isToday: boolean;
  recommendations: DailyRecommendation[];
}

const WEEK_SCHEDULE: DaySchedule[] = [
  {
    day: "T2",
    date: 1,
    isToday: false,
    recommendations: [
      {
        id: "mon-1",
        title: "Chạy bộ",
        icon: "🏃",
        duration: "30 phút",
        calories: "300 kcal",
        description: "Chạy bộ nhẹ nhàng",
      },
      {
        id: "mon-2",
        title: "Yoga",
        icon: "🧘",
        duration: "20 phút",
        calories: "100 kcal",
        description: "Yoga thư giãn",
      },
    ],
  },
  {
    day: "T3",
    date: 2,
    isToday: false,
    recommendations: [
      {
        id: "tue-1",
        title: "Tập tạ",
        icon: "💪",
        duration: "45 phút",
        calories: "400 kcal",
        description: "Tập sức mạnh toàn thân",
      },
      {
        id: "tue-2",
        title: "Đi bộ",
        icon: "🚶",
        duration: "30 phút",
        calories: "150 kcal",
        description: "Đi bộ vừa phải",
      },
    ],
  },
  {
    day: "T4",
    date: 3,
    isToday: false,
    recommendations: [
      {
        id: "wed-1",
        title: "Bơi",
        icon: "🏊",
        duration: "40 phút",
        calories: "350 kcal",
        description: "Bơi tự do",
      },
      {
        id: "wed-2",
        title: "Yoga toàn thân",
        icon: "🧘",
        duration: "25 phút",
        calories: "120 kcal",
        description: "Yoga toàn thân",
      },
    ],
  },
  {
    day: "T5",
    date: 4,
    isToday: true,
    recommendations: [
      {
        id: "thu-1",
        title: "Bài tập Cardio",
        icon: "🏃",
        duration: "20 phút",
        calories: "25 kcal",
        description: "Sáng - 20 phút-25 kcal",
      },
      {
        id: "thu-2",
        title: "T5: Yoga toàn thân",
        icon: "🍱",
        duration: "350 kcal",
        calories: "Protein: 30g",
        description: "Bữa ăn trưa",
      },
      {
        id: "thu-3",
        title: "Tập bung",
        icon: "💪",
        duration: "300 kcal",
        calories: "Carbo: 50g",
        description: "Bữa ăn chiều",
      },
    ],
  },
  {
    day: "T6",
    date: 5,
    isToday: false,
    recommendations: [
      {
        id: "fri-1",
        title: "Nhảy dây",
        icon: "🤸",
        duration: "20 phút",
        calories: "250 kcal",
        description: "Nhảy dây tăng tốc",
      },
      {
        id: "fri-2",
        title: "Yoga nhẹ nhàng",
        icon: "🧘",
        duration: "15 phút",
        calories: "80 kcal",
        description: "Yoga thư giãn",
      },
    ],
  },
  {
    day: "T7",
    date: 6,
    isToday: false,
    recommendations: [
      {
        id: "sat-1",
        title: "Đạp xe",
        icon: "🚴",
        duration: "50 phút",
        calories: "450 kcal",
        description: "Đạp xe ngoài trời",
      },
      {
        id: "sat-2",
        title: "Yoga hỏng hẩy",
        icon: "🧘",
        duration: "30 phút",
        calories: "150 kcal",
        description: "Yoga kéo dãn",
      },
    ],
  },
  {
    day: "CN",
    date: 7,
    isToday: false,
    recommendations: [
      {
        id: "sun-1",
        title: "Đi bộ tự do",
        icon: "🚶",
        duration: "40 phút",
        calories: "200 kcal",
        description: "Đi bộ thư giãn",
      },
      {
        id: "sun-2",
        title: "Yoga toàn thân",
        icon: "🧘",
        duration: "30 phút",
        calories: "120 kcal",
        description: "Yoga thư giãn cuối tuần",
      },
    ],
  },
];

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<DaySchedule>(WEEK_SCHEDULE[3]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<DailyRecommendation | null>(null);
  const [showActivityDetail, setShowActivityDetail] = useState(false);

  const handleSelectDay = (day: DaySchedule) => {
    setSelectedDay(day);
  };

  const handleActivityPress = (activity: DailyRecommendation) => {
    setSelectedActivity(activity);
    setShowActivityDetail(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Menu Button with Header */}
      <View style={menuStyles.headerWithMenu}>
        <TouchableOpacity
          style={menuStyles.menuButton}
          onPress={() => setShowSidebar(true)}
        >
          <Text style={menuStyles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.calendarTitle, { marginBottom: 0 }]}>
          Gợi ý Luyện tập từ AI
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Days of Week */}
        <View style={styles.daysGrid}>
          {WEEK_SCHEDULE.map((day) => (
            <TouchableOpacity
              key={day.day}
              style={[
                styles.dayButton,
                selectedDay.day === day.day && styles.dayButtonActive,
              ]}
              onPress={() => handleSelectDay(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay.day === day.day && styles.dayTextActive,
                ]}
              >
                {day.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDay.day === day.day && styles.dateTextActive,
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current Date Label */}
        <Text style={styles.dateLabel}>Hôm nay, {selectedDay.day}</Text>

        {/* Recommendations List */}
        <View style={styles.recommendationsContainer}>
          {selectedDay.recommendations.map((rec) => (
            <TouchableOpacity
              key={rec.id}
              style={styles.recommendationCard}
              onPress={() => handleActivityPress(rec)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{rec.icon}</Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.recTitle}>{rec.title}</Text>
                  <View style={styles.recDetails}>
                    {rec.duration && (
                      <Text style={styles.recDetail}>
                        {rec.duration} • {rec.calories}
                      </Text>
                    )}
                    {rec.description && (
                      <Text style={styles.recDescription}>
                        {rec.description}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sidebar Component */}
      <Sidebar visible={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Activity Detail Modal */}
      <Modal
        visible={showActivityDetail}
        transparent
        animationType="fade"
        onRequestClose={() => setShowActivityDetail(false)}
      >
        <View style={menuStyles.modalOverlay}>
          <View style={menuStyles.modalContent}>
            {/* Header */}
            <View style={menuStyles.modalHeader}>
              <Text style={menuStyles.modalTitle}>Chi tiết công việc</Text>
              <TouchableOpacity onPress={() => setShowActivityDetail(false)}>
                <Text style={menuStyles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Activity Icon and Title */}
            {selectedActivity && (
              <ScrollView
                contentContainerStyle={menuStyles.modalBody}
                showsVerticalScrollIndicator={false}
              >
                <View style={menuStyles.activityDetailIconContainer}>
                  <Text style={menuStyles.activityDetailIcon}>
                    {selectedActivity.icon}
                  </Text>
                </View>

                <Text style={menuStyles.activityDetailTitle}>
                  {selectedActivity.title}
                </Text>

                {/* Details Section */}
                <View style={menuStyles.detailsSection}>
                  <View style={menuStyles.detailItem}>
                    <Text style={menuStyles.detailLabel}>Thời lượng:</Text>
                    <Text style={menuStyles.detailValue}>
                      {selectedActivity.duration || "Không xác định"}
                    </Text>
                  </View>

                  <View style={menuStyles.detailItem}>
                    <Text style={menuStyles.detailLabel}>Calo tiêu thụ:</Text>
                    <Text style={menuStyles.detailValue}>
                      {selectedActivity.calories}
                    </Text>
                  </View>

                  {selectedActivity.description && (
                    <View style={menuStyles.detailItem}>
                      <Text style={menuStyles.detailLabel}>Mô tả:</Text>
                      <Text style={menuStyles.detailValue}>
                        {selectedActivity.description}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Start Button */}
                <TouchableOpacity
                  style={menuStyles.startActivityButton}
                  onPress={() => {
                    // TODO: Start activity tracking
                    setShowActivityDetail(false);
                  }}
                >
                  <Text style={menuStyles.startActivityButtonText}>
                    Bắt đầu hoạt động
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = menuStyles;
