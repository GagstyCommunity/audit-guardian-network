import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, CheckCircle2, CircleDollarSign, ShoppingCart, PackageCheck, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Trend {
  value: number;
  isPositive: boolean;
  label: string;
}

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<any>;
  trend?: Trend;
  isLoading: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  isLoading
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{isLoading ? "Loading..." : value}</div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        {trend && (
          <div className="mt-4 flex items-end justify-between space-x-2">
            <p className="text-sm text-muted-foreground">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(trend.isPositive ? "text-green-500" : "text-red-500", "ml-1 font-medium")}>
                {trend.value}%
              </span>
              {` ${trend.label}`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
