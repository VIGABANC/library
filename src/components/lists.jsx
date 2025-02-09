import { useState, useEffect, useRef } from "react";
import "../styles/lists.css";

export default function Lists({ head, body, showModal: initialShowModal, onCloseModal }) {
  const [isModalVisible, setIsModalVisible] = useState(initialShowModal);
    const containerRef = useRef(null);

    // Synchronize state with prop
    useEffect(() => {
        setIsModalVisible(initialShowModal);
    }, [initialShowModal]);

    // Handle click outside to close the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsModalVisible(false);
                onCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onCloseModal]);

    return (
        <div className="containerList" ref={containerRef}>
            <div className="header">
                {head.map((headItem, index) => (
                    <span key={index} className="header-item">{headItem}</span>
                ))}
            </div>
            <div className="body">
                {body.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {Object.values(row).map((cell, cellIndex) => (
                            <span key={cellIndex} className="cell">{cell}</span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Render modal if isModalVisible is true
            {isModalVisible && (
                <div className="modal">
                    <p>This is a modal!</p>
                    <button onClick={() => { setIsModalVisible(false); onCloseModal(); }}>Close</button>
                </div>
            )} */}
        </div>
    );
}