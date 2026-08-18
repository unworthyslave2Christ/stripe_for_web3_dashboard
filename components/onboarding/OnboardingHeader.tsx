import {
    Badge,
} from "@/components/ui/badge";

export function OnboardingHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div>

            <Badge variant="secondary">
                {eyebrow}
            </Badge>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                {description}
            </p>

        </div>
    );
}