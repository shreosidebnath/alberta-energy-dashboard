import { WellsMap } from '@/components/map/WellsMap';
import { getWells } from '@/lib/api/wells';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MapPage() {
  const wells = await getWells();
  
  const stats = {
    total: wells.length,
    active: wells.filter(w => w.status === 'active').length,
    drilling: wells.filter(w => w.status === 'drilling').length,
    oil: wells.filter(w => w.type === 'oil').length,
    gas: wells.filter(w => w.type === 'gas').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Interactive Map</h1>
        <p className="text-muted-foreground">
          Major producing facilities across Alberta
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Showing {stats.total} major oil and gas facilities. Alberta has 18,000+ active wells total. 
          This map displays only significant production sites and upgraders.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Major Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Shown on map</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently producing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drilling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.drilling}</div>
            <p className="text-xs text-muted-foreground">Under development</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Oil Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.oil}</div>
            <p className="text-xs text-muted-foreground">Oil production sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gas Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gas}</div>
            <p className="text-xs text-muted-foreground">Gas production sites</p>
          </CardContent>
        </Card>
      </div>

      <WellsMap wells={wells} />
    </div>
  );
}