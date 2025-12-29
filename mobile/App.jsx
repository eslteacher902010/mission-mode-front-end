// App.jsx (Expo / mobile)
import { use, useEffect } from "react";
import * as Notifications from "expo-notifications";
import AppShell from "./src/core/AppShell";
import useDailyNotification from "./src/hooks/useDailyNotification.mobile";

export default function App() {
  const {user} = useAuth();

  useDailyNotification(user);

  return <AppShell user={user} setUser={setUser} />;
}