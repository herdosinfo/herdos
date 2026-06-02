"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonBase, tokens } from "@/lib/design";

export function HandDrawnButton({
  children,
  variant = "primary",
  className,
  style,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const palette = {
    primary: {
      background: tokens.colors.paper,
      color: tokens.colors.foreground,
      hoverBackground: tokens.colors.accent,
      hoverColor: "#ffffff",
      borderColor: tokens.colors.border,
    },
    secondary: {
      background: tokens.colors.muted,
      color: tokens.colors.secondary,
      hoverBackground: tokens.colors.secondary,
      hoverColor: "#ffffff",
      borderColor: tokens.colors.border,
    },
  }[variant];

  return (
    <button
      className={className}
      style={{
        ...buttonBase,
        background: palette.background,
        color: palette.color,
        borderColor: palette.borderColor,
        ...(style ?? {}),
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = tokens.shadow.hover;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = tokens.shadow.hard;
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
