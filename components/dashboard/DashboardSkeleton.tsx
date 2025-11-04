export function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 animate-pulse">
      <div className="mb-6 md:mb-8">
        <div className="h-10 bg-muted rounded w-64 mb-2"></div>
        <div className="h-4 bg-muted rounded w-96"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="h-4 bg-muted rounded w-20 mb-2"></div>
            <div className="h-8 bg-muted rounded w-16 mb-1"></div>
            <div className="h-3 bg-muted rounded w-24"></div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-6">
        <div className="h-96 bg-muted rounded"></div>
      </div>
    </div>
  );
}