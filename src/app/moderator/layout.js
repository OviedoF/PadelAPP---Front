'use client'

import { SnackbarProvider } from "notistack"

export default function RegisterLayout({ children }) {
    return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
}