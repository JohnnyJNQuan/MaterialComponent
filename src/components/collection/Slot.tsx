import * as React from "react";
import { IProps } from "./Slot.d";

export default ({ children, slot }: IProps) => {
	debugger
	let slottedChild = null; // Default to null since react can render null if a slot isn't found
	// Iterate over children to find the slot needed
	React.Children.forEach(children, (child) => {
	  if (!React.isValidElement(child)) { // Check that it is a valid react element.
		return; // Return since we can't do anything with a child without props.
	  }
	  const slotName = "slot";
	  if (child.props[slotName] === slot) { // Verify it matches the slot we are looking for.
		slottedChild = React.cloneElement(child); // Clone it and set it to the slotted child
	  }
	});	
	return slottedChild;
  }
  