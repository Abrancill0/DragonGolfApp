import AsyncStorage from '@react-native-community/async-storage';

export const setSessionToken = async (token) => {
    try {
      await AsyncStorage.setItem('@DragonGolf:sessionToken', JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }
};

export const setLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('@DragonGolf:language', JSON.stringify(language));
    } catch (error) {
      console.log(error);
    }
};

export const getSessionToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@DragonGolf:sessionToken');
    return JSON.parse(token);
  } catch (error) {
    console.log(error);
  }
};

export const getLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem('@DragonGolf:language');
    return JSON.parse(language);
  } catch (error) {
    console.log(error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@DragonGolf:sessionToken');
  } catch (error) {
    console.log(error);
  }
}