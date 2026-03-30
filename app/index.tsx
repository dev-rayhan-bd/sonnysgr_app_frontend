import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Index() {
    SplashScreen.hideAsync();
    return <Redirect href="/profilesetup/size" />;
}