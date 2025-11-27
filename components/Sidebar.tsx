import { useRouter } from "expo-router";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { homeScreenStyles as menuStyles } from "../constants/homeScreenStyles";

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: "Dashboard", route: "/(home)/DashboardScreen", icon: "📊" },
  {
    label: "Gợi ý kế hoạch",
    route: "/(home)/RecommendationScreen",
    icon: "💡",
  },
  {
    label: "Thống kê & Báo cáo",
    route: "/(home)/ReportsScreen",
    icon: "📈",
  },
  { label: "Lịch tập luyện", route: "/(home)/CalendarScreen", icon: "📅" },
  {
    label: "Thông tin sức khỏe",
    route: "/(home)/HealthInfo",
    icon: "❤️",
  },
  {
    label: "Mức độ vận động",
    route: "/(home)/ActivityInfo",
    icon: "⚡",
  },
  { label: "Đăng xuất", route: "/(auth)/Login", icon: "🚪" },
];

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route as any);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={menuStyles.sidebarOverlay}>
        <View style={menuStyles.sidebarContent}>
          <View style={menuStyles.sidebarHeader}>
            <Text style={menuStyles.sidebarTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={menuStyles.sidebarCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={menuStyles.sidebarBody}>
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={menuStyles.sidebarItem}
                onPress={() => handleNavigate(item.route)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 24, marginRight: 12 }}>
                    {item.icon}
                  </Text>
                  <Text style={menuStyles.sidebarItemText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}
