import { WellsMap } from '@/components/map/WellsMap';
import { getWells } from '@/lib/api/wells';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MapPage() {
  const wells = await getWells();
  
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
    drilling: 124,
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
          Showing {stats.shown} major production sites including upgraders, SAGD facilities, and significant well pads.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Major Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shown}</div>
            <p className="text-xs text-muted-foreground">of ~{totalStats.facilities} shown</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Wells</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.active}</div>
            <p className="text-xs text-muted-foreground">of ~{totalStats.active.toLocaleString()} in AB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drilling Rigs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.drilling}</div>
            <p className="text-xs text-muted-foreground">of ~{totalStats.drilling} active rigs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Oil Sites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.oil}</div>
            <p className="text-xs text-muted-foreground">of ~{totalStats.oil.toLocaleString()} oil wells</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gas Sites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gas}</div>
            <p className="text-xs text-muted-foreground">of ~{totalStats.gas.toLocaleString()} gas wells</p>
          </CardContent>
        </Card>
      </div>

      <WellsMap wells={wells} />
    </div>
  );
}