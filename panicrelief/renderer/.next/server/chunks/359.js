"use strict";
exports.id = 359;
exports.ids = [359];
exports.modules = {

/***/ 359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(182);
/* harmony import */ var _radix_ui_themes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(132);
/* harmony import */ var _radix_ui_react_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_radix_ui_react_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const button_style = {
    backgroundColor: "rgba(51,122,255,0.1)"
};
const SevDropdown = ({ onValueChange  })=>{
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const handleKeyDown = (event)=>{
            // Handle the keydown event here
            if (event.key === "1" && event.metaKey) {
                // Handle the shortcut for Sev 1
                console.log("Sev 1 shortcut triggered");
                onValueChange(1);
            } else if (event.key === "2" && event.metaKey) {
                // Handle the shortcut for Sev 2
                console.log("Sev 2 shortcut triggered");
                onValueChange(2);
            } else if (event.key === "3" && event.metaKey) {
            // Handle the shortcut for Sev 3
            // console.log('Sev 3 shortcut triggered');
            // onValueChange(3);
            }
        };
        const handleSelection = (event)=>{
            console.log("Sev selected");
            console.log(event);
            onValueChange(event);
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu.Root, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu.Trigger, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__.Button, {
                    variant: "soft",
                    style: button_style,
                    children: [
                        "Severity",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_icons__WEBPACK_IMPORTED_MODULE_2__.CaretDownIcon, {})
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu.Content, {
                sideOffset: 5,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu.Item, {
                        shortcut: "⌘ 1",
                        onSelect: ()=>onValueChange(1),
                        children: "Sev 1 (1 Hour)"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_themes__WEBPACK_IMPORTED_MODULE_1__.DropdownMenu.Item, {
                        shortcut: "⌘ 2",
                        onSelect: ()=>onValueChange(2),
                        children: "Sev 2 (1 Day)"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SevDropdown);


/***/ })

};
;