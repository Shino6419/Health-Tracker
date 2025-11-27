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

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
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
      // Body: { email: string, password: string }
      // Response: { token: string, user: { id, email, name } }
      // Error: { message: string, code: string }
      // Validations: Check email exists, password strength
      console.log("Register with:", email, password);

      // Navigate to health info screen after successful registration
      router.push("/(home)/HealthInfo");
    } catch (error) {
      alert("Registration failed");
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

        {/* Register Form Card */}
        <View style={styles.card}>
          {/* Card Header */}
          <Text style={styles.cardTitle}>Sign Up</Text>

          {/* Inputs */}
          <View style={styles.inputsContainer}>
            <LoginInput
              placeholder="Email Address"
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

            <LoginInput
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
            />
          </View>

          {/* Sign Up Button */}
          <PrimaryButton
            title="Sign Up"
            loading={loading}
            onPress={handleRegister}
          />

          {/* Sign In Link */}
          <View style={styles.signinPromptContainer}>
            <Text style={styles.signinPromptText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
              <Text style={styles.signinPromptLink}>Sign In</Text>
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
              label="Continue with Google"
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
              label="Continue with Apple ID"
              onPress={() => console.log("Apple sign up")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
