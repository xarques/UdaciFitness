import React from "react";
import { View, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import EntryDetail from './components/EntryDetail';

const UdacityStatusBar = ({ backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
)

const tabsStructure = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: "History",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      )
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: "Add Entry",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="plus-square" size={30} color={tintColor} />
      )
    }
  }
}

const tabBarOptions = {
  activeTintColor: Platform.OS === "ios" ? purple : white,
  style: {
  height: 56,
    backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
    width: 0,
      height: 3
  },
  shadowRadius: 6,
    shadowOpacity: 1
  }
}

const navigationOptions = {
  header: null
}

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(tabsStructure, {
        navigationOptions, tabBarOptions
      })
    : createMaterialTopTabNavigator(tabsStructure, { tabBarOptions });


const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View syle={{height: 20}}/>
            <UdacityStatusBar backgroundColor={purple} barStyle='light-content'/>
            <MainNavigator />
        </View>
      </Provider>
    );
  }
}
