import Expo from "expo";
import React, { Component } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Text, Header, Body, Title } from "native-base";

import {
	ReactiveBase,
	DataSearch,
	DataController,
	TextField,
	SingleDropdownList,
	MultiDropdownList,
	SingleDropdownRange,
	MultiDropdownRange,
	RangeSlider,
	DatePicker,
	DateRange,
	ReactiveList
} from "@appbaseio/reactivebase-native";

import StorybookUI from "../storybook";

import TodoModel from "./todoModel";
import TodoApp from "./todoApp";
import { backgroundColor, titleColor } from "./constants";

let model = new TodoModel("react-todos");

class Main extends Component {
	state = {
		isReady: false
	};

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("native-base/Fonts/Ionicons.ttf")
		});

		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady) {
			return <Text>Loading...</Text>;
		}

		const topBar = (
			<View
				style={{ paddingTop: Expo.Constants.statusBarHeight, backgroundColor }}
			/>
		);

		return (
			<View>
				{topBar}
				<Header style={{ backgroundColor }}>
					<Body>
						<Title style={{ color: titleColor }}>todos</Title>
					</Body>
				</Header>
				<ScrollView>
					<View style={{ padding: 10 }}>
						<TodoApp model={model} />
					</View>
				</ScrollView>
			</View>
		);
	}
}

if (process.env.RUN === "storybook") {
	module.exports = StorybookUI;
	Expo.registerRootComponent(StorybookUI);
} else {
	module.exports = Main;
	Expo.registerRootComponent(Main);
}
