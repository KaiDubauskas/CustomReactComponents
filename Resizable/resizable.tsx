import React, { ReactNode, useState, useEffect } from "react";
import './resizable.css'

/**
 * A modular, resizable component on the x axis.
 * A dragger is used to resize the width of the left and right components.
 */
interface ResizableProps {
    /** Left panel of the Resizable Component */
    leftPanel: ReactNode

    /** Right panel of the Resizable Component */
    rightPanel: ReactNode

    /**
     * @optional Controls whether left panel is displayed
     * @default true
     */
    displayLeftPanel?: boolean
    setDisplayLeftPanel?: (val: boolean) => void

    /**
     * When true, uses pixels to calculate the width of the left panel.
     * When false, width of left panel is calculated as a percentage
     * of the @prop parentWidth
     * @default false
     */
    useAbsolute?: boolean

    /**
     * Default width of the left panel. Uses px as unit when @prop useAbsolute 
     * is set and uses % if @prop useAbsolute is false
     * @default 50
     */
    defaultWidth?: number

    /**
     * Width of parent element; used to calc left panel width.
     * window.innerWidth is used if @prop useAbsolute is false and 
     * the default value is used
     * @default null
     * @require useAbsolute is false 
     */
    parentWidth?: number | null


    /**
     * Minimum width (px) of left panel.
     * @default 0
     * @require useAbsolute is true
     */
    minWidthPx?: number

    /**
     * Color of the resize dragger
     * @default black
     */
    draggerColor?: string

    /**
     * Width (px) of the resize dragger
     * @default 4
     */
    draggerWidth?: number

    /**
     * Will collapse the left panel if the user slides the dragger
     * such that the left panel is smaller than minWidthPx
     * @default false
     */
    collapseLeftPanel?: boolean
}

const Resizable: React.FC<ResizableProps> = ({
    leftPanel,
    rightPanel,
    displayLeftPanel = true,
    setDisplayLeftPanel = () => { },
    useAbsolute = false,
    defaultWidth = 50,
    minWidthPx = 0,
    parentWidth = null,
    draggerColor = '#000000',
    collapseLeftPanel = false,
    draggerWidth = 4
}) => {
    const [width, setWidth] = useState<number>(defaultWidth);
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startWidth, setStartWidth] = useState<number>(0);

    useEffect(() => {
        setStartWidth(parentWidth ? parentWidth : window.innerWidth * (width / 100));
    }, [])

    useEffect(() => {
        setWidth(displayLeftPanel ? defaultWidth : 0);
    }, [displayLeftPanel])


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartX(e.clientX);
        setStartWidth(useAbsolute ? width : (parentWidth ? parentWidth : window.innerWidth) * (width / 100));
        setMouseDown(true);
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (mouseDown) {
            const deltaX = e.clientX - startX;
            const newWidthPercent = (startWidth + deltaX) / (parentWidth ? parentWidth : window.innerWidth) * 100;
            let newWidthPixel = Math.max(startWidth + deltaX, minWidthPx)


            if (collapseLeftPanel &&
                (startWidth >= minWidthPx && ((startWidth + deltaX) < minWidthPx - 70))) {
                newWidthPixel = 0;
                if (setDisplayLeftPanel) {
                    setDisplayLeftPanel(false);
                }
            } else if (width == 0) {
                setDisplayLeftPanel(true);
            }
            setWidth(useAbsolute ? newWidthPixel : newWidthPercent)
        }
    };

    const handleMouseUp = () => {
        setMouseDown(false);
    };

    return (
        <div className="resizable-container"
            onMouseMove={mouseDown ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
        >
            <div className="editor-container" style={{ width: `${width}${useAbsolute ? 'px' : '%'}`, zIndex: 2 }}>
                {leftPanel}
            </div>
            <div className="resize" onMouseDown={handleMouseDown} style={{
                width: draggerWidth,
                backgroundColor: draggerColor,
            }} />

            <div className="output-container">
                {rightPanel}
            </div>
        </div>
    )

}

export default Resizable;
