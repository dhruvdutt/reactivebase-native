// Based on: https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/app.jsx

import React, { Component } from "react";
import {
	Image,
	View,
	ScrollView,
	StyleSheet,
	Platform,
	Dimensions,
	StatusBar,
	H2
} from "react-native";
import {
	Text,
	Header,
	Body,
	Title,
	Button,
	Icon,
	Input,
	Item,
	Content,
	Container,
	Label
} from "native-base";
import PropTypes from "prop-types";

import Utils from "./utils";
import TodoItem from "./todoItem";
// import TodoList from "./todoList";

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
	ReactiveList
} from "@appbaseio/reactivebase-native";

import { titleColor } from "./constants";

var { height, width } = Dimensions.get("window");

const ALL_TODOS = "all";
const ACTIVE_TODOS = "active";
const COMPLETED_TODOS = "completed";

const propTypes = {
	// eslint-disable-next-line
	model: PropTypes.object.isRequired
};

class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nowShowing: ALL_TODOS,
			editing: null,
			newTodo: ""
		};
		// this.onData = this.onData.bind(this);
		// this.toggleAll = this.toggleAll.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.customQuery = this.customQuery.bind(this);
	}

	handleChange(newTodo) {
		this.setState({ newTodo });
	}

	onSubmit() {
		const newTodo = this.state.newTodo.trim();
		if (newTodo) {
			this.props.model.addTodo(newTodo);
			this.setState({ newTodo: "" });
		}
	}

	// toggleAll (event) {
	//   let checked = event.target.checked;
	//   this.props.model.toggleAll(checked);
	// }

	customQuery() {
		return {
			match_all: {}
		};

		// return {
		// 	range: {
		// 		createdAt: {
		// 			gt: "0"
		// 		}
		// 	}
		// };
	}

	onAllData(allData) {
		console.log("@allData", allData);
	}

	onData(data) {
		// merging all streaming and historic data
		// let todosData = Utils.mergeTodos(data);

		// sorting todos based on creation time
		// todosData = todosData.sort(function(a, b) {
		//   return a._source.createdAt - b._source.createdAt;
		// });

		// return (
		//   <TodoList
		//     todos={todosData}
		//     model={this.props.model}
		//   />
		// )

		console.log("@onData", data);

		let todo = data._source;

		return (
			<View style={{ margin: 5 }} key={todo.id}>
				<Text>{todo.title}</Text>
			</View>
		);
	}

	render() {
		let todos = this.props.model.todos;

		let { nowShowing, newTodo } = this.state;

		let activeTodoCount = todos.reduce((accum, todo) => {
			return todo.completed ? accum : accum + 1;
		}, 0);

		if (todos.length > 0) {
			// toggleAllSection = (
			// <input
			//   className="toggle-all"
			//   type="checkbox"
			//   onChange={this.toggleAll}
			//   checked={activeTodoCount === 0}
			// />
			// );
		}

		return (
			<View style={{ padding: 10, backgroundColor: "#f5f5f5" }}>
				<Container>
					<ReactiveBase
						app="todomvc"
						credentials="kDoV3s5Xk:4994cac6-00a3-4179-b159-b0adbfdde34b"
						type="todo_reactjs"
					>
						<DataController
							componentId="AllTodosSensor"
							visible={false}
							customQuery={this.customQuery}
						/>
						<ReactiveList
							componentId="ReactiveList"
							dataField="createdAt"
							onData={this.onData}
							// onAllData={this.onAllData}
							react={{
								and: ["AllTodosSensor"]
							}}
						/>
						<View>
							<TextField
								componentId="NewTodoSensor"
								dataField="title"
								defaultSelected={newTodo}
								placeholder="What needs to be done?"
								onValueChange={this.handleChange}
							/>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								marginTop: 5,
								justifyContent: "flex-end"
							}}
						>
							{/* @TODO Fix input */}
							{/* <Input placeholder={"What needs to be done"} value={newTodo} /> */}
							<Button info onPress={this.onSubmit}>
								<Text style={{ textAlign: "center" }}>Add</Text>
							</Button>
						</View>
					</ReactiveBase>
				</Container>
			</View>
		);
	}
}

TodoApp.propTypes = propTypes;

export default TodoApp;
