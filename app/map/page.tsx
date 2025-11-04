import { WellsMap } from '@/components/map/WellsMap';
import { getWells } from '@/lib/api/wells';
import { getAlbertaRigCount } from '@/lib/api/rig-count';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const revalidate = 86400;

export default async function MapPage() {
  const wells = await getWells();
  const rigCount = await getAlbertaRigCount();
  
  const stats = {
    shown: wells.length,
    active: wells.filter(w => w.status === 'active').length,
    drilling: wells.filter(w => w.status === 'drilling').length,
    oil: wells.filter(w => w.type === 'oil').length,
    gas: wells.filter(w => w.type === 'gas').length,
  };

  const totalStats = {
    facilities: 150,
    active: 18000,
    drilling: rigCount.count,
    oil: 12500,
    gas: 5500
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Interactive Map</h1>
        <p className="text-muted-foreground">
          Major producing facilities and operations across Alberta
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Facility locations sourced from Alberta Energy Regulator (AER) public data. 
          Displaying {stats.shown} significant production sites out of thousands of wells in Alberta.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Major Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shown}</div>
            <p className="text-xs text-muted-foreground">shown on map</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Wells (AB)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">~{(totalStats.active / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">{stats.active} facilities shown</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rigs (AB)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{totalStats.drilling}</div>
            <p className="text-xs text-muted-foreground">currently drilling</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Oil Wells (AB)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~{(totalStats.oil / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">{stats.oil} facilities shown</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gas Wells (AB)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~{(totalStats.gas / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">{stats.gas} facilities shown</p>
          </CardContent>
        </Card>
      </div>

      <WellsMap wells={wells} />
    </div>
  );
}