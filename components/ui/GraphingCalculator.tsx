"use client"
import React, { useEffect, useRef, useState } from "react";
import Desmos from "desmos";
// import { Button } from "./button";

export default function GraphingCalculator() {
    const calculatorRef = useRef<HTMLDivElement>(null);
    const calculatorInstance = useRef<any>(null);

    useEffect(() => {
        if (calculatorRef.current) {
            calculatorRef.current.innerHTML = "";
            calculatorInstance.current = Desmos.GraphingCalculator(calculatorRef.current, {
                keypad: true,
                expressions: true,
                settingsMenu: true,
                zoomButtons: true,
                expressionsTopbar: true,
            });
            calculatorInstance.current.setExpression({ id: 'graph1', latex: 'y=x^2' });
        }
        return () => {
            if (calculatorInstance.current) {
                calculatorInstance.current.destroy();
                calculatorInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="rounded-lg w-full h-full">
            <div ref={calculatorRef}  className="h-full w-full flex-1"/>
        </div>
    );
}
