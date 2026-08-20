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

    const current =
        useRef(target);

    useEffect(() => {
        const start =
            current.current;

        const delta =
            target -
            start;

        if (
            Math.abs(delta) <
            0.001
        ) {
            current.current =
                target;

            setValue(
                target,
            );

            return;
        }

        const startTime =
            performance.now();

        let frame =
            0;

        const animate = (
            now: number,
        ) => {
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

            const next =
                start +
                delta *
                    eased;

            current.current =
                next;

            setValue(
                next,
            );

            if (
                progress <
                1
            ) {
                frame =
                    requestAnimationFrame(
                        animate,
                    );
            }
        };

        frame =
            requestAnimationFrame(
                animate,
            );

        return () =>
            cancelAnimationFrame(
                frame,
            );
    }, [
        target,
        duration,
    ]);

    return value;
}