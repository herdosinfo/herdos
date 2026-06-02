"use client";
import type { CSSProperties, ReactNode, HTMLAttributes } from "react";
import { cardBase, tokens } from "@/lib/design";

type HandDrawnCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  accent?: string;
  style?: CSSProperties;
};

export function HandDrawnCard({
  children,
  accent,
  style,
  className,
  ...rest
}: HandDrawnCardProps) {
  return (
    <div
      className={className}
      style={{
        ...cardBase,
        borderColor: accent ?? tokens.colors.border,
        background: accent ? tokens.colors.paper : cardBase.background,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
