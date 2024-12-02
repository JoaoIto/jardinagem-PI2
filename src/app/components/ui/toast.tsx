import * as React from "react"

export type ToastActionElement = React.ReactElement<{
    altText: string
    onClick: () => void
}>

export interface ToastProps {
    id?: string
    className?: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
    open?: boolean
    onOpenChange?: (open: boolean) => void
    duration?: number
}

