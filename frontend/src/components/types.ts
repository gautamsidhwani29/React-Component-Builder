import type React from "react"

export type ButtonProps = {
    label: string,
    size: "xs" | "sm" | "md" | "lg",
    color: "primary" | "secondary",
    tailwindClasses?: string,
    loading: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export type LoadingSpinnerProps = {
    tailwindClasses?: string
}

export type PromptInputProps = {
    placeholder: string,
    value: string
    onChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    tailwindClasses?: string
}

export type SuggestionChipProps = {
    text: string
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export type PromptBarProps = {
    prompt: string
    onPromptChange: (value: string) => void
    onGenerate: () => void
    isLoading: boolean
}

export type CodePanelProps = {
    finalCode: string
    streamedText?: string
    isStreaming?: boolean
}

export type PlaygroundProps = {
    code: ModelResponse | null;
    loading: boolean;
}

export type ModelResponse = {
    imports: string[],
    code: string
}

export type PreviewPanelProps = {
    previewUrl: string
}