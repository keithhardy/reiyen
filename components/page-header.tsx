import { cn } from '@/lib/utils';

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn('grid grid-cols-2 space-y-6 py-4', className)}
      {...props}
    >
      {children}
    </header>
  );
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('text-3xl font-medium', className)} {...props} />;
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-balance text-sm font-light text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function PageHeaderGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn('col-span-2 space-y-4 lg:col-span-1', className)}
      {...props}
    />
  );
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('col-span-2 lg:col-span-1 lg:text-right', className)}
      {...props}
    />
  );
}

export {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
};
