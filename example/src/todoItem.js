// Based on: https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/todoItem.jsx

import React, { Component } from "react";

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editText: "",
			editing: false,
			autoFocus: false
		};
	}

	handleBlur(event) {
		this.setState({
			editText: this.props.todo.title,
			editing: false
		});
	}

	handleSubmit(event) {
		let val = this.state.editText.trim();
		if (val) {
			this.props.onSave(val);
			this.setState({
				editText: val,
				editing: false
			});
		} else {
			this.props.onDestroy();
		}
	}

	handleEdit() {
		this.setState({
			editText: this.props.todo.title,
			editing: true
		});
	}

	handleKeyDown(event) {
		if (event.which === ESCAPE_KEY) {
			this.setState({
				editText: this.props.todo.title,
				editing: false
			});
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	}

	handleChange(value) {
		if (this.state.editing) {
			this.setState({ editText: value });
		}
	}

	getInitialState() {
		return { editText: this.props.todo.title };
	}

	/**
	 * Safely manipulate the DOM after updating the state when invoking
	 * `this.props.onEdit()` in the `handleEdit` method above.
	 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
	 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	 */
	componentDidUpdate(prevProps, prevState) {
		// if (!prevState.editing && this.state.editing) {
		//   this.setState({ autoFocus: true });
		//
		//   // workaround because after setState re-rendering is not happening
		//   let node = ReactDOM.findDOMNode(this.refs.editField);
		//   node = node.childNodes[0].children[0];
		//   node.focus();
		//   node.setSelectionRange(node.value.length, node.value.length)
		// }
	}

	render() {
		let { todo } = this.props;
		return (
			<View style={{ margin: 5 }} key={todo.id}>
				<Text>{todo.title}</Text>
			</View>
		);
	}
}

export default TodoItem;
