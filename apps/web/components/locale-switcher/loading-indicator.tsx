export default function LoadingIndicator() {
  return (
    <span className="absolute -top-1 -right-1 h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
    </span>
  );
}
