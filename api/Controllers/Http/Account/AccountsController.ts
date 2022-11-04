import { useHttp } from "../../../../composables/useHttp";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormInterface {
  email: string;
  password: string;
  password_confirmation?: string;
}

export function AccountsController() {
  const { fetch } = useHttp();
  async function login(form: FormInterface) {
    const response = await fetch<FormInterface>({
      method: "post",
      url: "auth/login",
      data: form,
      auth: false,
    });
    if (!response.error) {
      try {
        await AsyncStorage.setItem("token", response.data.token);
      } catch (e) {

      }
      return {
        success: true,
        data: response.data,
        message: response.data?.message || "Successfully logged in",
        message_code: response.data?.message_code || "",
      };
    } else {
      return {
        success: false,
        data: response?.errorData || {
          message: "",
          message_code: "",
        },
      };
    }
  }
  async function register(form: FormInterface) {
    const response = await fetch<FormInterface>({
      method: "post",
      url: "auth/register",
      data: form,
      auth: false,
    });
    if (!response.error) {
      return {
        success: true,
        data: response.data.data,
        message: response.data?.message || "Successfully registered",
        message_code: response.data?.message_code || "",
      };
    } else {
      let dynamicMessage = "";
      if (
        Array.isArray(response?.original?.errors) &&
        response?.original?.errors?.length
      ) {
        switch (response?.original?.errors[0].rule) {
          case "unique":
            dynamicMessage = "Email is already in use";
            break;
          case "confirmed":
            dynamicMessage = "Confirmed password is incorrect";
            break;
          default:
            dynamicMessage =
              "There was an error while creating account. Please contact support.";
        }
      }
      return {
        success: false,
        data: response?.errorData || {
          message: dynamicMessage,
          message_code: "",
        },
      };
    }
  }
  return { login, register };
}
