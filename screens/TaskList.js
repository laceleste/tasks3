import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";

import commonStyles from "../commonStyles";
import todayImage from "../assets/imgs/today.jpg";
import Icon from "react-native-vector-icons/FontAwesome";

import Task from "./Task";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
let customFonts = {
  Lato: require("../assets/fonts/Lato.ttf"),
};
import moment from "moment";
import "moment/locale/pt-br";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      showDoneTasks: true,
      visibleTasks:[],
      tasks: [
        {
          id: Math.random(),
          desc: "blablabla",
          estimateAt: new Date(),
          doneAt: new Date(),
        },
        {
          id: Math.random(),
          desc: "abcedaskldj",
          estimateAt: new Date(),
          doneAt: null,
        },
      ],
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount = ()=> {
    this._loadFontsAsync();
    this.filterTasks()
  }
  toggleFilter = () =>{
    this.setState({showDoneTasks: !this.state.showDoneTasks}, (()=>this.filterTasks()))
  }

  filterTasks = () =>{
    let visibleTasks=null
    if(this.state.showDoneTasks){
      visibleTasks = [...this.state.tasks]
    }else{
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({visibleTasks : visibleTasks})
  }

  toggleTask = taskId =>{
    //estou copiando todo o array para usa-lo aqui
    const tasks = [...this.state.tasks]
    // se ele encontrou...
    tasks.forEach(task => {
      if(task.id === taskId){
        task.doneAt = task. doneAt ? null : new Date()
      }
    })
    this.setState({tasks:tasks}, (()=>this.filterTasks()))
  }

  render() {
    const today = moment().locale("pt-br").format("ddd, D [de] MMMM");
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <ImageBackground source={todayImage} style={styles.background}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={this.toggleFilter}>
                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20} color={commonStyles.colors.secondary}></Icon>
              </TouchableOpacity>
            </View>
            <View style={styles.titleBar}>
              <Text style={styles.title}>Hoje</Text>
              <Text style={styles.subtitle}>{today}</Text>
            </View>
          </ImageBackground>
          <View style={styles.taskList}>
            <FlatList
              data={this.state.visibleTasks}
              keyExtractor={item => `${item.id}`}
              renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask}/>}
            />
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Lato",
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "Lato",
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "flex-end",
    marginTop: Platform.OS === "ios" ? 40 : 10,
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
