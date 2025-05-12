
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Home, Landmark, School, Heart, TrendingUp } from 'lucide-react';
import { colorPalette } from '../../types/auth.types';

const CSRImpactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: colorPalette.primaryPurple }}>CSR Impact & Financial Inclusion</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn how our CSP network is transforming lives and communities through financial inclusion and corporate social responsibility initiatives.
        </p>
      </div>
      
      {/* Impact Statistics Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <Users className="h-12 w-12 mx-auto mb-4" style={{ color: colorPalette.primaryPurple }} />
            <h3 className="text-3xl font-bold mb-2" style={{ color: colorPalette.accentGreen }}>5,000+</h3>
            <p className="text-gray-600">Active CSP Agents</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <Home className="h-12 w-12 mx-auto mb-4" style={{ color: colorPalette.primaryPurple }} />
            <h3 className="text-3xl font-bold mb-2" style={{ color: colorPalette.accentGreen }}>12,000+</h3>
            <p className="text-gray-600">Villages Reached</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <Landmark className="h-12 w-12 mx-auto mb-4" style={{ color: colorPalette.primaryPurple }} />
            <h3 className="text-3xl font-bold mb-2" style={{ color: colorPalette.accentGreen }}>₹2.5M+</h3>
            <p className="text-gray-600">Daily Transactions</p>
          </div>
        </div>
      </section>
      
      {/* Banking Penetration Map */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Banking Penetration Heatmap</h2>
        <Card>
          <CardContent className="p-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: colorPalette.primaryPurple }} />
                <p className="text-gray-500">Interactive Banking Penetration Map</p>
                <p className="text-sm text-gray-400">(Map visualization would be displayed here)</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: colorPalette.primaryPurple }}></span>
                <span>High Penetration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-300"></span>
                <span>Medium Penetration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-200"></span>
                <span>Low Penetration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-gray-200"></span>
                <span>No CSP Coverage</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* CSR Initiatives */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>CSR Initiatives</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" style={{ backgroundColor: colorPalette.accentGreen }}>Financial Literacy</Badge>
              <CardTitle className="text-lg">Rural Financial Education Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded mb-4"></div>
              <CardDescription>
                Our CSP agents conduct monthly financial literacy workshops in villages, teaching basic banking, 
                savings, and digital payment concepts to over 50,000 rural citizens annually.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" style={{ backgroundColor: colorPalette.accentGreen }}>Women Empowerment</Badge>
              <CardTitle className="text-lg">Mahila Banking Sakhi Program</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded mb-4"></div>
              <CardDescription>
                A special initiative to train and empower rural women as CSP agents, with over 2,000 women 
                entrepreneurs now running successful banking points across the country.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" style={{ backgroundColor: colorPalette.accentGreen }}>Education</Badge>
              <CardTitle className="text-lg">Digital Learning Centers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded mb-4"></div>
              <CardDescription>
                CSP locations equipped with computer facilities offer free digital literacy classes to 
                children and seniors in remote areas, reaching over 15,000 beneficiaries.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Success Stories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Success Stories</h2>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="aspect-square bg-gray-100 rounded-lg"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: colorPalette.primaryPurple }}>Transforming Kalanpur Village</h3>
                  <p className="text-gray-600 mb-4">
                    Kalanpur village in Bihar had no banking facilities within 30km until our CSP agent Rajesh Kumar 
                    set up operations in 2020. Today, over 95% of adults in the village have bank accounts, 
                    and the local economy has flourished with easier access to financial services.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-purple-300">Rural Banking</Badge>
                    <Badge variant="outline" className="border-purple-300">Digital Payments</Badge>
                    <Badge variant="outline" className="border-purple-300">Community Impact</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="aspect-square bg-gray-100 rounded-lg"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: colorPalette.primaryPurple }}>Sunita Devi: A Banking Champion</h3>
                  <p className="text-gray-600 mb-4">
                    Sunita Devi from Jharkhand became a CSP agent in 2021 after completing our training program. 
                    Despite initial challenges, she now serves over 200 customers daily and has helped 1,500+ 
                    women in her region open their first bank accounts and gain financial independence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-purple-300">Women Empowerment</Badge>
                    <Badge variant="outline" className="border-purple-300">Entrepreneurship</Badge>
                    <Badge variant="outline" className="border-purple-300">Gender Equality</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Key Challenges & Solutions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Key Challenges & Solutions</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4" style={{ color: colorPalette.accentGreen }}>Challenges in Financial Inclusion</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                  <span className="text-sm font-medium" style={{ color: colorPalette.primaryPurple }}>1</span>
                </div>
                <div>
                  <h4 className="font-medium">Geographic Barriers</h4>
                  <p className="text-gray-600">Remote villages with difficult terrain often lack basic banking infrastructure</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                  <span className="text-sm font-medium" style={{ color: colorPalette.primaryPurple }}>2</span>
                </div>
                <div>
                  <h4 className="font-medium">Digital Literacy</h4>
                  <p className="text-gray-600">Low digital and financial literacy in rural areas creates barriers to adoption</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                  <span className="text-sm font-medium" style={{ color: colorPalette.primaryPurple }}>3</span>
                </div>
                <div>
                  <h4 className="font-medium">Trust Deficit</h4>
                  <p className="text-gray-600">Hesitation to engage with formal banking due to past negative experiences</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                  <span className="text-sm font-medium" style={{ color: colorPalette.primaryPurple }}>4</span>
                </div>
                <div>
                  <h4 className="font-medium">Connectivity Issues</h4>
                  <p className="text-gray-600">Unreliable internet and power infrastructure in remote areas</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4" style={{ color: colorPalette.accentGreen }}>Our Impact Solutions</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center bg-green-100">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Offline Transaction Mode</h4>
                  <p className="text-gray-600">CSP devices can operate in offline mode and sync later when connectivity is restored</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center bg-green-100">
                  <School className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Door-to-Door Education</h4>
                  <p className="text-gray-600">Regular community visits and demonstrations to build trust and awareness</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center bg-green-100">
                  <Heart className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Local Agent Selection</h4>
                  <p className="text-gray-600">Recruiting trusted individuals from the community to become CSP agents</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center bg-green-100">
                  <MapPin className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Strategic Location Planning</h4>
                  <p className="text-gray-600">Data-driven approach to establish CSPs in highest-impact areas</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CSRImpactPage;
