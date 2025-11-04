export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Loading Energy Data</h2>
          <p className="text-muted-foreground text-sm">
            Fetching real-time oil prices, rig counts, and production data...
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        <p className="text-xs text-muted-foreground">
          This may take a few seconds on first load
        </p>
      </div>
    </div>
  );
}