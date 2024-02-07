"use client";

import React from "react";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { reduxStore } from "@/store/redux";

export const Providers = (props: React.PropsWithChildren) => {
    return <Provider store={reduxStore}>{props.children}</Provider>;
};