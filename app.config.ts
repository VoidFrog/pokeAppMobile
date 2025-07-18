import { ConfigContext, ExpoConfig } from '@expo/config';
import * as dotenv from 'dotenv';


dotenv.config()
export default ({ config }: ConfigContext): ExpoConfig => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
    name: "introduction_app_pokemon",
    slug: "introduction_app_pokemon",
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      permissions: [
        "android.permission.CAMERA"
      ],
      package: "com.anonymous.introduction_app_pokemon",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PRIVATE_GOOGLE_API_KEY
        }
      }
    }
  };
};