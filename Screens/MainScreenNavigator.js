import React from 'react'
import { Ionicons} from '@expo/vector-icons'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Home from './Home'
import Profile from './Profile'
import Search from './Search'
import Settings from './Settings'
import ChangePassword from './ChangePassword'
import UserTemplate from '../libs/UserTemplate'
import FriendProfile from '../libs/FriendProfile'
import ContentListTemplate from '../libs/ContentListTemplate'


const SearchStack = createStackNavigator({
    Search: Search,
    UserTemplate: UserTemplate,
    ContentListTemplate: ContentListTemplate,
  },
  {
    //initialRouteName: 'Search',
    navigationOptions: {
      header: null
    }
  })

const HomeStack = createStackNavigator({
    Home: Home,
    UserTemplate: UserTemplate,
    FriendProfile: FriendProfile,
    ContentListTemplate: ContentListTemplate,
    },
    {
        navigationOptions: {
            header: null
        }
    })

const ProfileStack = createStackNavigator({
    Profile: Profile,
    ContentListTemplate: ContentListTemplate,
    Settings: Settings,
    ChangePassword: ChangePassword
},
    {
        navigationOptions: {
            header: null
        }
    })

export default createBottomTabNavigator(
    
    {
        Home: {screen: HomeStack},
        Search: {screen: SearchStack},
        Profile: {screen: ProfileStack},
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let feather = false;
                if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                    feather = true
                } else if (routeName === 'Search') {
                    iconName = `ios-search${focused ? '' : '-outline'}`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'rgb(251, 131, 71)',
            inactiveTintColor: 'white',
            activeBackgroundColor: 'rgb(71, 186, 251)',
            inactiveBackgroundColor: 'rgb(71, 186, 251)',
        },
        
    }
)