import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoginInput from "../../components/LoginInput";
import PrimaryButton from "../../components/PrimaryButton";
import { authScreenStyles as styles } from "../../constants/authScreenStyles";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!emailOrPhone) {
      alert("Please enter your email or phone number");
      return;
    }

    setLoading(true);
    try {
      // TODO: Backend - Implement forgot password endpoint
      // POST /api/auth/forgot-password
      // Body: { emailOrPhone: string }
      // Response: { message: string }
      // Send reset link via email or SMS
      console.log("Reset password for:", emailOrPhone);
      alert("We've sent you a password reset link");
    } catch (error) {
      alert("Failed to send reset link");
    } finally {
      setLoading(false);
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

        {/* Forgot Password Form Card */}
        <View style={styles.card}>
          {/* Card Header */}
          <Text style={styles.cardTitle}>Quên Mật Khẩu</Text>

          {/* Description */}
          <Text style={styles.description}>
            Nhập email hoặc số điện thoại của bạn, chúng tôi sẽ gửi cho bạn một
            liên kết để đặt lại mật khẩu
          </Text>

          {/* Input */}
          <View style={styles.inputsContainer}>
            <LoginInput
              placeholder="Email hoặc số điện thoại"
              keyboardType="email-address"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              editable={!loading}
            />
          </View>

          {/* Reset Button */}
          <PrimaryButton
            title="Gửi Liên Kết"
            loading={loading}
            onPress={handleResetPassword}
          />

          {/* Back to Login Link */}
          <View style={styles.backToLoginContainer}>
            <Text style={styles.backToLoginText}>Nhớ mật khẩu? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
              <Text style={styles.backToLoginLink}>Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
