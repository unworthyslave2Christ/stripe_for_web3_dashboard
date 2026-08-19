"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

export function useAnimatedNumber(
    target: number,
    duration = 700,
) {
    const [
        value,
        setValue,
    ] = useState(target);

    const currentValue =
        useRef(target);

    useEffect(() => {

        const start =
            currentValue.current;

        const delta =
            target -
            start;

        if (
            Math.abs(delta) <
            0.001
        ) {
            currentValue.current =
                target;

            setValue(target);

            return;
        }

        const startTime =
            performance.now();

        let frameId =
            0;

        function animate(
            now: number,
        ) {
            const elapsed =
                now -
                startTime;

            const progress =
                Math.min(
                    elapsed /
                        duration,
                    1,
                );

            const eased =
                1 -
                Math.pow(
                    1 -
                        progress,
                    3,
                );

            const nextValue =
                start +
                delta *
                    eased;

            currentValue.current =
                nextValue;

            setValue(
                nextValue,
            );

            if (
                progress <
                1
            ) {
                frameId =
                    requestAnimationFrame(
                        animate,
                    );
            }
        }

        frameId =
            requestAnimationFrame(
                animate,
            );

        return () => {
            cancelAnimationFrame(
                frameId,
            );
        };
    }, [
        target,
        duration,
    ]);

    return value;
}