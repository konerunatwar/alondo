type AuthFormShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthFormShell({
  title,
  description,
  children,
  footer,
}: AuthFormShellProps) {
  return (
    <div className="w-full rounded-2xl border border-border/70 bg-card p-8 shadow-sm sm:p-10">
      <div className="flex w-full flex-col">
        <div className="mb-6 space-y-1.5">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-5">{children}</div>

        {footer ? (
          <div className="mt-6 border-t border-border/60 pt-6 text-center">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
