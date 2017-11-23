import React from "react";
import { Text } from "react-native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { text, boolean, number, select, array } from "@storybook/addon-knobs";

import DataControllerStory from "./DataControllerStory";
import DataSearchStory from "./DataSearchStory";
import TextFieldStory from "./TextFieldStory";

storiesOf("DataController", module)
	.add("Basic", () => (
		<DataControllerStory />
	))
	.add("with defaultSelected and customQuery", () => (
		<DataControllerStory
			defaultSelected={text("defaultSelected", "BMW")}
			customQuery={(value) => ({
				bool: {
					must: {
						match: {
							brand: value
						}
					}
				}
			})}
		/>
	));

storiesOf("DataSearch", module)
	.add("Basic", () => (
		<DataSearchStory />
	))
	.add("with placeholder", () => (
		<DataSearchStory placeholder={text("placeholder", "Find fast cars")} />
	))
	.add("with defaultSelected", () => (
		<DataSearchStory
			defaultSelected={text("defaultSelected", "BMW")}
		/>
	))
	.add("with highlight", () => (
		<DataSearchStory
			highlight={boolean("highlight", true)}
			highlightField={select("highlightField", ["name", "brand", "model"], "name")}
		/>
	))
	.add("with fieldWeights as [1, 2, 3]", () => (
		<DataSearchStory fieldWeights={[1, 2, 3]} />
	))
	.add("with queryFormat", () => (
		<DataSearchStory queryFormat={select("queryFormat", { and: "and", or: "or" }, "and")} />
	))
	.add("with fuzziness as a number", () => (
		<DataSearchStory fuzziness={number("fuzziness (0, 1 or 2)", 1)} />
	))
	.add("with fuzziness as AUTO", () => (
		<DataSearchStory fuzziness={text("fuzziness ('AUTO')", "AUTO")} />
	))
	.add("without autoSuggest", () => (
		<DataSearchStory autoSuggest={boolean("autoSuggest", false)} />
	));

storiesOf("TextField", module)
	.add("Basic", () => (
		<TextFieldStory />
	))
	.add("With placeholder", () => (
		<TextFieldStory placeholder={text("placeholder", "Search Cars")} />
	))
	.add("With defaultSelected", () => (
		<TextFieldStory defaultSelected={text("defaultSelected", "BMW")} />
	));