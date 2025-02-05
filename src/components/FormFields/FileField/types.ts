/* eslint-disable no-unused-vars */
import React from "react";
import { Control } from "react-hook-form"

export interface IFileField {
    control: Control<any, any>
    name: string;
    label: string;
    acceptedFileTypes?: string[];
    hiddeFileName?: boolean;
    multiple?: boolean;
    customIcon?: React.ReactNode;
    onChange?(e: any): void;
    customOnChange?(e: any): void;
}