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
import SocialButton from "../../components/SocialButton";
import { authScreenStyles as styles } from "../../constants/authScreenStyles";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      // TODO: Backend - Implement login endpoint
      // POST /api/auth/login
      // Body: { email: string, password: string }
      // Response: { token: string, user: { id, email, name } }
      // Error: { message: string, code: string }
      console.log("Login with:", email, password);

      // Navigate to health info screen after successful login
      router.push("/(home)/HealthInfo");
    } catch (error) {
      alert("Login failed");
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

        {/* Login Form Card */}
        <View style={styles.card}>
          {/* Card Header */}
          <Text style={styles.cardTitle}>Sign In</Text>

          {/* Inputs */}
          <View style={styles.inputsContainer}>
            <LoginInput
              placeholder="Email or Mobile Number"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <LoginInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => router.push("/(auth)/Forgot")}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <PrimaryButton
            title="Sign In"
            loading={loading}
            onPress={handleLogin}
          />

          {/* Sign Up Link */}
          <View style={styles.signupPromptContainer}>
            <Text style={styles.signupPromptText}>Didn't Joined yet? </Text>
            {/* TODO: Frontend - Navigate to register screen */}
            <TouchableOpacity onPress={() => router.push("/(auth)/Register")}>
              <Text style={styles.signupPromptLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            {/* 
                  TODO: Backend - Implement Google OAuth endpoint
                   */}
            <SocialButton
              icon=""
              label="Continue with Google"
              onPress={() => console.log("Google login")}
            />
          </View>

          <View style={styles.socialContainer}>
            {/* TODO: Backend - Implement Apple OAuth endpoint
             */}
            <SocialButton
              icon="󠀠"
              label="Continue with Apple ID"
              onPress={() => console.log("Apple login")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
