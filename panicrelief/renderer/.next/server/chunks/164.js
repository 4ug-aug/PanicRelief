"use strict";
exports.id = 164;
exports.ids = [164];
exports.modules = {

/***/ 164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FileDrop)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(182);
/* harmony import */ var _radix_ui_themes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_2__);



const text_style = {
    color: "white",
    fontSize: "24px"
};
const hover_effect = {
    backgroundColor: "rgba(0,0,0,0.3)",
    color: "white",
    fontSize: "24px",
    border: "0.2rem dashed"
};
const image_style = {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 10
};
function FileDrop({ onFiles , onRemove  }) {
    const { 0: isOver , 1: setIsOver  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: imagePreviews , 1: setImagePreviews  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // Listen for paste events
    // Define the event handlers
    const handleDragOver = (event)=>{
        event.preventDefault();
        setIsOver(true);
    };
    const handleDragLeave = (event)=>{
        event.preventDefault();
        setIsOver(false);
    };
    const handleDrop = (event)=>{
        event.preventDefault();
        setIsOver(false);
        // Fetch the files
        const droppedFiles = Array.from(event.dataTransfer.files);
        onFiles(droppedFiles);
    // Optionally handle file processing here
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // Convert these handlers to handle the entire document
        const handleDragOverDoc = (event)=>{
            event.preventDefault();
            setIsOver(true);
        };
        const handleDragLeaveDoc = (event)=>{
            event.preventDefault();
            setIsOver(false);
        };
        const handleDropDoc = (event)=>{
            event.preventDefault();
            setIsOver(false);
            // Fetch the files
            const droppedFiles = Array.from(event.dataTransfer.files).filter((file)=>file.type.startsWith("") // Ensure we're only processing image files
            );
            // Process each file
            droppedFiles.forEach((file)=>{
                const reader = new FileReader();
                reader.onloadend = ()=>{
                    // Add the image URL to our array for previewing
                    setImagePreviews((prev)=>[
                            ...prev,
                            reader.result
                        ]);
                };
                reader.readAsDataURL(file);
            });
            onFiles(droppedFiles);
        };
        // Add event listeners to the document
        document.addEventListener("dragover", handleDragOverDoc);
        document.addEventListener("dragleave", handleDragLeaveDoc);
        document.addEventListener("drop", handleDropDoc);
        // Cleanup the event listeners on component unmount
        return ()=>{
            document.removeEventListener("dragover", handleDragOverDoc);
            document.removeEventListener("dragleave", handleDragLeaveDoc);
            document.removeEventListener("drop", handleDropDoc);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
    const removeImage = (index)=>{
        setImagePreviews((prev)=>prev.filter((_, i)=>i !== index));
        onRemove(index);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    display: isOver ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "95vh",
                    width: "95vw",
                    position: "fixed",
                    top: "2.5vh",
                    left: "2.5vw",
                    zIndex: 9999,
                    ...hover_effect
                },
                children: isOver && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    style: text_style,
                    children: "Drop files anywhere to upload"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap"
                },
                children: imagePreviews.map((image, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "image-preview-container",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: image,
                            alt: `Preview ${index}`,
                            className: "image-preview",
                            onClick: ()=>removeImage(index)
                        })
                    }, index))
            })
        ]
    });
}


/***/ })

};
;