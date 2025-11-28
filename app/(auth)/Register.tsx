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
import LoginInput from "../../components/LoginInput";
import PrimaryButton from "../../components/PrimaryButton";
import SocialButton from "../../components/SocialButton";
import { authScreenStyles as styles } from "../../constants/authScreenStyles";

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const genderOptions = [
    { label: "Chọn giới tính", value: "" },
    { label: "Nam", value: "Male" },
    { label: "Nữ", value: "Female" },
  ];

  const handleRegister = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !dateOfBirth
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // TODO: Backend - Implement register endpoint
      // POST /api/auth/register
      // Body: {
      //   full_name: string,
      //   email: string,
      //   password: string,
      //   gender: string,
      //   date_of_birth: string (YYYY-MM-DD)
      // }
      // Response: { token: string, user: { id, email, full_name } }
      // Error: { message: string, code: string }
      console.log("Register with:", {
        fullName,
        email,
        password,
        gender,
        dateOfBirth,
      });

      // Navigate to health info screen after successful registration
      router.push("/(home)/HealthInfo");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDateOfBirthChange = (text: string) => {
    // Remove non-digit characters
    const cleaned = text.replace(/\D/g, "");

    let formatted = "";
    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    } else if (cleaned.length <= 8) {
      formatted =
        cleaned.slice(0, 2) +
        "/" +
        cleaned.slice(2, 4) +
        "/" +
        cleaned.slice(4, 8);
    }

    setDisplayDate(formatted);

    // If complete date (dd/mm/yyyy), convert to YYYY-MM-DD format
    if (formatted.length === 10) {
      const parts = formatted.split("/");
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      // Validate date
      const d = parseInt(day, 10);
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);

      if (
        d >= 1 &&
        d <= 31 &&
        m >= 1 &&
        m <= 12 &&
        y >= 1900 &&
        y <= new Date().getFullYear()
      ) {
        // Check if date is not in future
        const selectedDate = new Date(y, m - 1, d);
        if (selectedDate <= new Date()) {
          setDateOfBirth(
            `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(
              2,
              "0"
            )}`
          );
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        {/* App Logo/Title */}
        <View style={styles.logoContainer}>
          <Text style={styles.appTitle}>HEALTH TRACKER</Text>
        </View>

        {/* Register Form Card */}
        <View style={styles.card}>
          {/* Card Header */}
          <Text style={styles.cardTitle}>Đăng Ký</Text>

          {/* Inputs */}
          <View style={styles.inputsContainer}>
            <LoginInput
              placeholder="Họ tên"
              value={fullName}
              onChangeText={setFullName}
              editable={!loading}
            />

            <LoginInput
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <LoginInput
              placeholder="Mật khẩu"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />

            <LoginInput
              placeholder="Xác nhận mật khẩu"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
            />

            {/* Gender Picker */}
            <TouchableOpacity
              onPress={() => setShowGenderPicker(true)}
              style={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E0E0E0",
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 12,
                height: 50,
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: gender ? "#1B3B3A" : "#9BA9A8",
                  fontSize: 14,
                }}
              >
                {gender ? (gender === "Male" ? "Nam" : "Nữ") : "Chọn giới tính"}
              </Text>
            </TouchableOpacity>

            {/* Gender Picker Modal */}
            <Modal
              visible={showGenderPicker}
              transparent={true}
              animationType="fade"
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={1}
                onPress={() => setShowGenderPicker(false)}
              >
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 12,
                    padding: 0,
                    width: "80%",
                  }}
                >
                  {genderOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setGender(option.value);
                        setShowGenderPicker(false);
                      }}
                      style={{
                        paddingVertical: 16,
                        paddingHorizontal: 20,
                        borderBottomWidth:
                          index < genderOptions.length - 1 ? 1 : 0,
                        borderBottomColor: "#E0E0E0",
                        backgroundColor:
                          gender === option.value ? "#F4FBFB" : "#FFFFFF",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: option.value ? "#1B3B3A" : "#9BA9A8",
                          fontWeight: gender === option.value ? "600" : "400",
                        }}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Date of Birth Input - Manual Entry */}
            <LoginInput
              placeholder="Ngày sinh (dd/mm/yyyy)"
              value={displayDate}
              onChangeText={handleDateOfBirthChange}
              keyboardType="number-pad"
              maxLength={10}
              editable={!loading}
            />
          </View>

          {/* Sign Up Button */}
          <PrimaryButton
            title="Đăng Ký"
            loading={loading}
            onPress={handleRegister}
          />

          {/* Sign In Link */}
          <View style={styles.signinPromptContainer}>
            <Text style={styles.signinPromptText}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
              <Text style={styles.signinPromptLink}>Đăng Nhập</Text>
            </TouchableOpacity>
          </View>

          {/* Social Register Buttons */}
          <View style={styles.socialContainer}>
            {/* TODO: Frontend - Integrate Google Sign-In SDK
                  TODO: Backend - Implement Google OAuth registration
                  POST /api/auth/google/register
                  Body: { googleToken: string }
                  Response: { token: string, user: { id, email, name } } */}
            <SocialButton
              icon=""
              label="Tiếp tục với Google"
              onPress={() => console.log("Google sign up")}
            />
          </View>

          <View style={styles.socialContainer}>
            {/* TODO: Frontend - Integrate Apple Sign-In SDK
                  TODO: Backend - Implement Apple OAuth registration
                  POST /api/auth/apple/register
                  Body: { appleToken: string }
                  Response: { token: string, user: { id, email, name } } */}
            <SocialButton
              icon="󠀠"
              label="Tiếp tục với Apple ID"
              onPress={() => console.log("Apple sign up")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
