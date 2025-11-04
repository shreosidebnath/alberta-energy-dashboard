import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Map, BarChart3 } from "lucide-react";
import { getRealCurrentPrices } from "@/lib/api/real-prices";
import { getAlbertaRigCount } from "@/lib/api/rig-count";
import { getCurrentProduction } from "@/lib/api/production";
import { getWells } from "@/lib/api/wells";
export const revalidate = 86400;

export default async function Home() {
  const currentPrices = await getRealCurrentPrices();
  const rigCount = await getAlbertaRigCount();
  const currentProduction = await getCurrentProduction();
  const wells = await getWells();
  
  const activeWells = wells.filter(w => w.status === 'active').length;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Alberta Energy Dashboard
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Real-time tracking of oil & gas production, prices, and drilling activity
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg">
              <TrendingUp className="mr-2 h-5 w-5" />
              View Dashboard
            </Button>
          </Link>
          <Link href="/map">
            <Button size="lg" variant="outline">
              <Map className="mr-2 h-5 w-5" />
              Explore Map
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Link href="/dashboard">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Live Pricing</CardTitle>
              <CardDescription>
                Track WTI, WCS, and differential in real-time
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard?tab=production">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Production Data</CardTitle>
              <CardDescription>
                Monitor oil & gas production across basins
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/map">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <Map className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>
                Visualize wells, pipelines, and facilities
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">
                {(currentProduction.oil.current / 1000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Barrels/Day</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                ${currentPrices.wti.price.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">WTI Price</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                ${currentPrices.wcs.price.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">WCS Price</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{rigCount.count}</div>
              <div className="text-sm text-muted-foreground">Active Rigs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{activeWells}+</div>
              <div className="text-sm text-muted-foreground">Major Facilities</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}