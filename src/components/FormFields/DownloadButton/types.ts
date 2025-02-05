import React from "react";

export interface IDownloadButtonType {
    url?: string;
    fileName?: string;
    children?: React.ReactNode;
    target?: string;
}