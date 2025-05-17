
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, ChevronRight, Trophy } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  rank: number;
  points: number;
  avatar?: string;
  change?: number;
  badge?: string;
  region?: string;
}

interface LeaderboardCardProps {
  title: string;
  description?: string;
  leaderboardType: 'weekly' | 'monthly';
  users: LeaderboardUser[];
  currentUserId?: string;
  onViewAll?: () => void;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  title,
  description,
  leaderboardType,
  users,
  currentUserId,
  onViewAll,
}) => {
  // Sort users by rank
  const sortedUsers = [...users].sort((a, b) => a.rank - b.rank);
  
  // Find the current user in the list
  const currentUser = currentUserId ? users.find(user => user.id === currentUserId) : undefined;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl">
              <Award className="mr-2 h-5 w-5" />
              {title}
            </CardTitle>
            {description && <CardDescription className="text-gray-100">{description}</CardDescription>}
          </div>
          <Badge variant="outline" className="border-white bg-white/20 text-white">
            {leaderboardType === 'weekly' ? 'This Week' : 'This Month'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y">
          {/* Top 3 users */}
          {sortedUsers.slice(0, 3).map((user, index) => (
            <div 
              key={user.id} 
              className={`flex items-center justify-between p-4 ${
                user.id === currentUserId ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold 
                  ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                    index === 1 ? 'bg-gray-100 text-gray-800' : 
                    'bg-amber-100 text-amber-800'}`}
                >
                  {index === 0 ? (
                    <Trophy className="h-4 w-4" />
                  ) : (
                    user.rank
                  )}
                </div>
                
                <Avatar className="h-10 w-10 border-2 border-white shadow">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.name}</span>
                    {user.badge && (
                      <Badge variant="outline" className="text-xs">
                        {user.badge}
                      </Badge>
                    )}
                  </div>
                  {user.region && (
                    <div className="text-xs text-muted-foreground">{user.region}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold">{user.points.toLocaleString()} pts</div>
                  {user.change !== undefined && (
                    <div className={`text-xs ${
                      user.change > 0 
                        ? 'text-green-600' 
                        : user.change < 0 
                          ? 'text-red-600' 
                          : 'text-gray-500'
                    }`}>
                      {user.change > 0 ? `+${user.change}` : user.change}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Show more users */}
          {sortedUsers.length > 3 && (
            <div className="p-2 text-center text-sm text-muted-foreground">
              <button 
                onClick={onViewAll}
                className="flex w-full items-center justify-center rounded-md p-2 transition-colors hover:bg-muted"
              >
                View All Rankings
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          )}
          
          {/* Show current user if not in top 3 */}
          {currentUser && !sortedUsers.slice(0, 3).some(u => u.id === currentUser.id) && (
            <div className="bg-muted p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-800">
                    {currentUser.rank}
                  </div>
                  
                  <Avatar className="h-10 w-10 border-2 border-white shadow">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currentUser.name} <span className="text-sm font-normal">(You)</span></span>
                    </div>
                    {currentUser.region && (
                      <div className="text-xs text-muted-foreground">{currentUser.region}</div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">{currentUser.points.toLocaleString()} pts</div>
                  {currentUser.change !== undefined && (
                    <div className={`text-xs ${
                      currentUser.change > 0 
                        ? 'text-green-600' 
                        : currentUser.change < 0 
                          ? 'text-red-600' 
                          : 'text-gray-500'
                    }`}>
                      {currentUser.change > 0 ? `+${currentUser.change}` : currentUser.change}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
