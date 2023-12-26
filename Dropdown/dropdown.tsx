import React from "react";
import './dropdown.css';

/**
 * Creates a Dropdown menu
 * @important Container where this component is created must have 
 * an absolute position
 */
interface ActionItem {
    tag: string;
    action: (...args: any[]) => void;
}
interface DropdownProps {
    /**
     * Controls Whether the display is open. This component can not control 
     * when it's open/closed. Rather, the parent container and functions 
     * within @prop actions should control the display
     */
    isOpen: boolean;

    /**
     * The options the dropdown will display
     */
    actions: ActionItem[];

    /**
     * Position of the dropdown container relative to its parent
     * @default "bottom"
     */
    position?: "top" | "right" | "left" | "bottom"
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, actions, position = "bottom" }) => {
    const right = {
        outer: { top: "50%", right: "0%" },
        inner: { transform: "translateY(-50%)" }
    }
    const bottom = {
        outer: { bottom: "0%", left: "50%" },
        inner: { transform: "translateX(-50%)" }
    }
    const top = {
        outer: { top: "0%", left: "50%" },
        inner: { transform: "translate(-50%, -100%)" }
    }
    const left = {
        outer: { top: "50%", left: "0%" },
        inner: { transform: "translate(-100%, -50%)" }
    }

    let styles;
    switch (position) {
        case 'right':
            styles = right;
            break;
        case 'bottom':
            styles = bottom;
            break;
        case 'top':
            styles = top;
            break;
        case 'left':
            styles = left;
            break;
        default:
            styles = bottom;
    }

    return (
        <div className={`dropdown-outer-container`} style={styles.outer}>
            <div
                className={`${isOpen ? 'dropdown-visible' : 'dropdown-hidden'} dropdown-container`}
                style={styles.inner}
            >
                {actions?.map((action: ActionItem, idx: number) => {
                    return (
                        <div key={idx} className="action-item-container" onClick={action.action}>
                            {action.tag}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Dropdown;
