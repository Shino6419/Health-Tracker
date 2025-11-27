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
          <Text style={styles.cardTitle}>Forgot Password</Text>

          {/* Description */}
          <Text style={styles.description}>
            Enter your email or phone number and we'll send you a link to reset
            your password
          </Text>

          {/* Input */}
          <View style={styles.inputsContainer}>
            <LoginInput
              placeholder="Email or Phone Number"
              keyboardType="email-address"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              editable={!loading}
            />
          </View>

          {/* Reset Button */}
          <PrimaryButton
            title="Send Reset Link"
            loading={loading}
            onPress={handleResetPassword}
          />

          {/* Back to Login Link */}
          <View style={styles.backToLoginContainer}>
            <Text style={styles.backToLoginText}>Remember your password? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
              <Text style={styles.backToLoginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
