
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Calendar,
  CheckCircle,
  Clock,
  Gift,
  IndianRupee,
  Sparkles,
  Star,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import LeaderboardCard from '@/components/rewards/LeaderboardCard';

const MOCK_WEEKLY_LEADERBOARD = [
  { id: '1', name: 'Rajesh Kumar', rank: 1, points: 1250, change: 3, region: 'North District', avatar: '/assets/avatars/user1.png', badge: 'Gold CSP' },
  { id: '2', name: 'Priya Patel', rank: 2, points: 1180, change: 1, region: 'East District', avatar: '/assets/avatars/user2.png' },
  { id: '3', name: 'Amit Singh', rank: 3, points: 1120, change: -1, region: 'West District', avatar: '/assets/avatars/user3.png' },
  { id: '4', name: 'Sunita Sharma', rank: 4, points: 980, change: 2, region: 'South District', avatar: '/assets/avatars/user4.png' },
  { id: '5', name: 'Rahul Verma', rank: 5, points: 920, change: 0, region: 'North District', avatar: '/assets/avatars/user5.png' },
];

const MOCK_MONTHLY_LEADERBOARD = [
  { id: '3', name: 'Amit Singh', rank: 1, points: 5840, change: 2, region: 'West District', avatar: '/assets/avatars/user3.png', badge: 'Gold CSP' },
  { id: '1', name: 'Rajesh Kumar', rank: 2, points: 5720, change: -1, region: 'North District', avatar: '/assets/avatars/user1.png' },
  { id: '5', name: 'Rahul Verma', rank: 3, points: 5430, change: 3, region: 'North District', avatar: '/assets/avatars/user5.png' },
  { id: '2', name: 'Priya Patel', rank: 4, points: 5120, change: -2, region: 'East District', avatar: '/assets/avatars/user2.png' },
  { id: '4', name: 'Sunita Sharma', rank: 5, points: 4980, change: 0, region: 'South District', avatar: '/assets/avatars/user4.png' },
];

interface RewardMetric {
  name: string;
  value: number;
  target: number;
  points: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  status: 'available' | 'claimed' | 'pending';
  type: 'cash' | 'badge' | 'item';
  value?: number;
  expiry?: Date;
}

const RewardsDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for rewards
  const [metrics] = useState<RewardMetric[]>([
    { name: 'Transactions Completed', value: 128, target: 150, points: 500 },
    { name: 'Compliance Score', value: 92, target: 95, points: 300 },
    { name: 'Customer Feedback', value: 4.8, target: 4.5, points: 200 },
    { name: 'Self-Audit Completion', value: 100, target: 100, points: 100 },
  ]);
  
  const [availableRewards] = useState<Reward[]>([
    { 
      id: '1', 
      title: 'Monthly Performance Bonus', 
      description: 'Top 10% CSPs get cash bonus', 
      points: 1000, 
      status: 'available',
      type: 'cash',
      value: 1500
    },
    { 
      id: '2', 
      title: 'Gold CSP Badge', 
      description: 'Special profile badge for high performers', 
      points: 2500, 
      status: 'available',
      type: 'badge'
    },
    { 
      id: '3', 
      title: 'Biometric Device Upgrade', 
      description: 'Get the latest biometric scanner model', 
      points: 5000, 
      status: 'available',
      type: 'item'
    },
  ]);
  
  const [claimedRewards] = useState<Reward[]>([
    { 
      id: '4', 
      title: 'Weekly Achievement Bonus', 
      description: 'Bonus for top weekly performance', 
      points: 750, 
      status: 'claimed',
      type: 'cash',
      value: 500
    },
  ]);
  
  const userRewardsPoints = 1780;
  const rankWeekly = 4;
  const rankMonthly = 12;
  const totalUsers = 240;
  
  const handleClaimReward = (reward: Reward) => {
    toast({
      title: 'Reward Claim Initiated',
      description: `Your claim for ${reward.title} is being processed.`
    });
  };
  
  const calculateProgress = (value: number, target: number) => {
    return Math.min(100, Math.round((value / target) * 100));
  };
  
  const percentileRank = (rank: number, total: number) => {
    return Math.round((1 - (rank / total)) * 100);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-end md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards & Leaderboard</h1>
          <p className="text-muted-foreground">
            Track your performance, earn points, and claim rewards
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md bg-muted p-2">
            <Award className="h-5 w-5 text-amber-500" />
            <span className="font-medium">{userRewardsPoints} Points</span>
          </div>
          
          <Badge variant="outline" className="gap-1 border-green-200 bg-green-50 text-green-700">
            <TrendingUp className="h-3.5 w-3.5" />
            Level 3
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Your Rank (Weekly)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                  <div className="text-2xl font-bold">#{rankWeekly}</div>
                  <div className="ml-2 text-sm text-muted-foreground">
                    Top {percentileRank(rankWeekly, totalUsers)}%
                  </div>
                </div>
                <Progress className="mt-2" value={percentileRank(rankWeekly, totalUsers)} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Your Rank (Monthly)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  <div className="text-2xl font-bold">#{rankMonthly}</div>
                  <div className="ml-2 text-sm text-muted-foreground">
                    Top {percentileRank(rankMonthly, totalUsers)}%
                  </div>
                </div>
                <Progress className="mt-2" value={percentileRank(rankMonthly, totalUsers)} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Available Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  <div className="text-2xl font-bold">{userRewardsPoints}</div>
                  <div className="ml-2 text-sm text-muted-foreground">
                    points
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium text-green-600">+450 points</span> earned this week
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Your current progress toward earning more reward points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.name} className="space-y-1.5">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">
                          {metric.value} / {metric.target}
                        </span>
                        <span className="ml-2 text-muted-foreground">
                          ({metric.points} pts)
                        </span>
                      </div>
                    </div>
                    <Progress value={calculateProgress(metric.value, metric.target)} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Next Badge Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Next Badge Progress</CardTitle>
              <CardDescription>
                Earn the Gold CSP badge with 2500 points
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-amber-200 bg-amber-100">
                    <Award className="h-10 w-10 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-medium">Gold CSP Badge</h3>
                </div>
                
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{userRewardsPoints} / 2500 points</span>
                  </div>
                  <Progress value={(userRewardsPoints / 2500) * 100} />
                  <div className="text-center text-sm text-muted-foreground">
                    {2500 - userRewardsPoints} more points needed
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" disabled={userRewardsPoints < 2500}>
                <Gift className="mr-2 h-4 w-4" />
                {userRewardsPoints >= 2500 ? "Claim Badge" : "Continue Earning"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <LeaderboardCard 
              title="Weekly Leaderboard"
              description="This week's top performers"
              leaderboardType="weekly"
              users={MOCK_WEEKLY_LEADERBOARD}
              currentUserId={user?.id}
              onViewAll={() => toast({
                title: "Full leaderboard view",
                description: "This would open the full leaderboard view"
              })}
            />
            
            <LeaderboardCard 
              title="Monthly Leaderboard"
              description="This month's top performers"
              leaderboardType="monthly"
              users={MOCK_MONTHLY_LEADERBOARD}
              currentUserId={user?.id}
              onViewAll={() => toast({
                title: "Full leaderboard view",
                description: "This would open the full leaderboard view"
              })}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Performance History</CardTitle>
              <CardDescription>Track your ranking over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="mx-auto h-12 w-12 opacity-20" />
                  <p className="mt-2">Performance chart would display here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                CSP of the Month
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Special recognition for outstanding performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <Trophy className="h-8 w-8 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">Amit Singh</h3>
                  <p className="text-indigo-100">West District</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">Top Performer</Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">5840 Points</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="bg-black/10 p-4 text-center">
              <p className="text-sm text-indigo-100">
                Congratulations to Amit for exceptional service and 100% compliance score!
              </p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-6">
          {/* Available Rewards */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Available Rewards</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableRewards.map((reward) => (
                <Card key={reward.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{reward.title}</CardTitle>
                      <Badge variant={reward.type === 'cash' ? 'default' : reward.type === 'badge' ? 'secondary' : 'outline'}>
                        {reward.type === 'cash' ? 'Cash' : reward.type === 'badge' ? 'Badge' : 'Item'}
                      </Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      {reward.type === 'cash' && <IndianRupee className="h-5 w-5 text-green-500" />}
                      {reward.type === 'badge' && <Award className="h-5 w-5 text-amber-500" />}
                      {reward.type === 'item' && <Gift className="h-5 w-5 text-blue-500" />}
                      
                      {reward.type === 'cash' && reward.value && (
                        <span className="text-lg font-bold">₹{reward.value}</span>
                      )}
                      {reward.type === 'badge' && (
                        <span className="text-lg font-bold">Special Badge</span>
                      )}
                      {reward.type === 'item' && (
                        <span className="text-lg font-bold">Equipment</span>
                      )}
                    </div>
                    
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Required Points</span>
                        <span className="font-medium">{reward.points}</span>
                      </div>
                      <Progress value={(userRewardsPoints / reward.points) * 100} />
                      {userRewardsPoints < reward.points && (
                        <div className="text-sm text-muted-foreground">
                          {reward.points - userRewardsPoints} more points needed
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={userRewardsPoints < reward.points}
                      onClick={() => handleClaimReward(reward)}
                    >
                      {userRewardsPoints >= reward.points ? "Claim Reward" : "Keep Earning"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Claimed Rewards */}
          {claimedRewards.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Claimed Rewards</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {claimedRewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{reward.title}</CardTitle>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <CheckCircle className="mr-1 h-3.5 w-3.5" />
                          Claimed
                        </Badge>
                      </div>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        {reward.type === 'cash' && <IndianRupee className="h-5 w-5 text-green-500" />}
                        {reward.type === 'badge' && <Award className="h-5 w-5 text-amber-500" />}
                        {reward.type === 'item' && <Gift className="h-5 w-5 text-blue-500" />}
                        
                        {reward.type === 'cash' && reward.value && (
                          <span className="text-lg font-bold">₹{reward.value}</span>
                        )}
                        {reward.type === 'badge' && (
                          <span className="text-lg font-bold">Special Badge</span>
                        )}
                        {reward.type === 'item' && (
                          <span className="text-lg font-bold">Equipment</span>
                        )}
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Claimed on May 12, 2023</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* How to earn more points */}
          <Card>
            <CardHeader>
              <CardTitle>How to Earn More Points</CardTitle>
              <CardDescription>Complete these tasks to increase your reward points</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Complete Self-Audits on time</p>
                    <p className="text-sm text-muted-foreground">Monthly self-audits earn you 100 points each</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Increase Transaction Volume</p>
                    <p className="text-sm text-muted-foreground">Earn 10 points for every successful transaction</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Pass Official Audits</p>
                    <p className="text-sm text-muted-foreground">Clean audits earn 500 bonus points</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium">Get Positive Customer Feedback</p>
                    <p className="text-sm text-muted-foreground">Each 5-star rating earns 50 points</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsDashboard;
