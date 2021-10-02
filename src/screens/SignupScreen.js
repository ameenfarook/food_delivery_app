import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Fonts, Images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Separator} from '../components';
import {Display} from '../utils';
import Feather from 'react-native-vector-icons/Feather';
import {AuthenicationService} from '../services';
import LottieView from 'lottie-react-native';

const inputStyle = state => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.SECONDARY_GREEN,
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

const showMarker = state => {
  switch (state) {
    case 'valid':
      return (
        <AntDesign
          name="checkcircleo"
          color={Colors.SECONDARY_GREEN}
          size={18}
          style={{marginLeft: 5}}
        />
      );
    case 'invalid':
      return (
        <AntDesign
          name="closecircleo"
          color={Colors.DEFAULT_RED}
          size={18}
          style={{marginLeft: 5}}
        />
      );
    default:
      return null;
  }
};

const SignupScreen = ({navigation}) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailState, setEmailState] = useState('default');
  const [usernameState, setUsernameState] = useState('default');

  const register = () => {
    let user = {
      username,
      email,
      password,
    };
    setIsLoading(true);
    AuthenicationService.register(user).then(response => {
      setIsLoading(false);
      if (!response?.status) {
        setErrorMessage(response?.message);
      }
    });
    // navigation.navigate('RegisterPhone')
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenicationService.checkUserExist(type, value).then(response => {
        if (response?.status) {
          type === 'email' && emailErrorMessage
            ? setEmailErrorMessage('')
            : null;

          type === 'username' && usernameErrorMessage
            ? setUsernameErrorMessage('')
            : null;
          type === 'email' ? setEmailState('valid') : null;
          type === 'username' ? setUsernameState('valid') : null;
        } else {
          type === 'email' ? setEmailErrorMessage(response?.message) : null;
          type === 'username'
            ? setUsernameErrorMessage(response?.message)
            : null;
          type === 'email' ? setEmailState('invalid') : null;
          type === 'username' ? setUsernameState('invalid') : null;
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.content}>
        Enter your email, choose a username and password
      </Text>
      <View style={inputStyle(usernameState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('username', text)
            }
          />
          {showMarker(usernameState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{usernameErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('email', text)
            }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Password"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setPassword(text)}
          />
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity style={styles.signinButton} onPress={() => register()}>
        {isLoading ? (
          <LottieView source={Images.LOADING} autoPlay />
        ) : (
          <Text style={styles.signinButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialSigninButtonText}>
            Connect with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: Colors.FABEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialSigninButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  signinButtonLogoContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginVertical: 3,
  },
});

export default SignupScreen;
