import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { Box, Button, List, ListItem, ListItemButton, ListItemText, styled, Typography, } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getRandomText } from "../../features/plugins/getRandomText";
import { openModal } from "../../app/store/interfaceSlice";
import { removeFile } from "../../app/store/filesSlice";
import { useTranslation } from "react-i18next";
import { app } from "../../app/model/constants/app";
const File = React.forwardRef(() => {
    const { glagolVC } = app;
    const dispatch = useDispatch();
    const { files } = useSelector((state) => state.files);
    const { t } = useTranslation();
    const VisuallyHiddenInput = styled("input")({
        // clip: 'rect(0 0 0 0)',
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });
    function clickButton() {
        const filteredFiles = files.filter((file) => file.text === this.text);
        glagolVC.saveFile(filteredFiles, this.text);
    }
    function removingFile(fileForRemove) {
        dispatch(removeFile(fileForRemove[0]));
        dispatch(openModal(false));
    }
    function sendFile(event) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            glagolVC.sendFile(file);
            dispatch(openModal(false));
        }
    }
    useEffect(() => {
        glagolVC.setHandler("removeFile", removingFile);
        return () => {
            /**
             * TODO removing sharing
             */
        };
    }, []);
    return (_jsxs(Box, { sx: {
            margin: "25vh auto auto",
            bgcolor: "background.paper",
            minWidth: "500px",
            padding: "20px",
            textAlign: "center",
            color: "white",
        }, children: [_jsxs(Box, { sx: {
                    borderBottom: "2px solid white",
                }, children: [_jsx(Typography, { children: t("modal.files.load") }), _jsxs(Button, { sx: {
                            margin: "20px auto 30px",
                        }, component: "label", variant: "contained", startIcon: _jsx(CloudUpload, {}), children: ["Upload file", _jsx(VisuallyHiddenInput, { onChange: sendFile, type: "file" })] })] }), _jsxs(Box, { sx: {
                    paddingTop: "10px",
                }, children: [_jsx(Typography, { children: t("modal.files.save") }), _jsx(List, { children: files.map((element) => {
                            const file = JSON.parse(atob(element.text));
                            return (_jsx(ListItem, { sx: {
                                    width: "initial",
                                    boxSizing: "border-box",
                                    bgcolor: "black",
                                    margin: "10px",
                                    "&:hover": {
                                        width: "initial",
                                        color: "black",
                                        bgcolor: "white",
                                    },
                                }, component: "div", disablePadding: true, children: _jsx(ListItemButton, { onClick: clickButton.bind(element), children: _jsx(ListItemText, { primary: file.file_name }) }) }, getRandomText(5)));
                        }) })] })] }));
});
export { File };
