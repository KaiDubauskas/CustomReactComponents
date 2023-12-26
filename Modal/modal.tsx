import React, { useRef, useEffect, ReactNode } from "react";
import './modal.css';
interface LoginProps {
    content: ReactNode,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,

    /**
     * Width
     * @default auto
     */
    width?: string,

    /**
     * Height
     * @default auto
     */
    height?: string,

    /**
     * Minimum width
     * @default none
     */
    minWidth?: string,

    /**
     * Minimum height
     * @default none
     */
    maxWidth?: string,
}

const Modal: React.FC<LoginProps> = ({
    content,
    isOpen,
    setIsOpen,
    width = 'auto',
    height = 'auto',
    minWidth = 'none',
    maxWidth = 'none',
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    })

    return (
        <div className={`outer-modal-container ${isOpen ? `visible` : `hidden`}`}>
            <div
                className='modal-container'
                ref={modalRef}
                style={{
                    width: width,
                    height: height,
                    minWidth: minWidth,
                    maxWidth: maxWidth,
                }}
            >
                {content}
                <div className="close-modal-button" onClick={() => setIsOpen(false)}>x</div>
            </div>
        </div >
    )
}

export default Modal;
