const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="QRScanner" component={QRScannerScreen} />
      <HomeStack.Screen name="DogDetail" component={DogDetailScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="Results" component={ResultsScreen} />
      {/* Other screens */}
    </HomeStack.Navigator>
  );
}

const AppNavigator = () => {
  const isLoggedIn = /* check auth status, e.g. from context or redux */

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};
