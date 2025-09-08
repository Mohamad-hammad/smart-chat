'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  FileText,
  Package,
  TrendingUp,
  Zap,
  Database,
  Check,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'plans', label: 'Plans' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'payment', label: 'Payment' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600 mt-1">Manage your subscription, usage, and billing information</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#6566F1] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Current Plan */}
            <Card className="group relative border-2 border-purple-200 bg-purple-50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 rounded-2xl overflow-visible hover:-translate-y-1 z-10">
              {/* Gradient Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Current Plan</CardTitle>
                    <CardDescription className="text-gray-600">
                      Your current subscription and next billing date
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#6566F1] to-[#5A5BD8] text-white px-3 py-1 rounded-full font-semibold">Pro</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div>
                  <p className="text-4xl font-bold text-gray-900">$29<span className="text-lg text-gray-600">/month</span></p>
                  <p className="text-gray-600 mt-1">Billed monthly • Next billing: March 15, 2024</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">5 active bots</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">10,000 conversations/month</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Custom branding</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Advanced analytics</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="bg-[#6566F1] hover:bg-[#5A5BD8] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-medium">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Conversations */}
              <Card className="border border-gray-200 bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-[#6566F1]" />
                    <CardTitle className="text-lg">Conversations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-gray-900">
                    7,834 used of 10,000 limit
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#6566F1] h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">78% of monthly limit</p>
                </CardContent>
              </Card>

              {/* Active Bots */}
              <Card className="border border-gray-200 bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Active Bots</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-gray-900">
                    3 active of 5 limit
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">2 more bots available</p>
                </CardContent>
              </Card>

              {/* Storage */}
              <Card className="border border-gray-200 bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Storage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-gray-900">
                    2.3 GB used of 10 GB limit
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">Knowledge base storage</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Plans Tab Content */}
        {activeTab === 'plans' && (
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Available Plans</CardTitle>
              <CardDescription>
                Choose the plan that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-600">More plan options will be available soon</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invoices Tab Content */}
        {activeTab === 'invoices' && (
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Invoice History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Invoices Yet</h3>
                <p className="text-gray-600">Your invoices will appear here after your first billing cycle</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Tab Content */}
        {activeTab === 'payment' && (
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Payment Methods</h3>
                <p className="text-gray-600">Add a payment method to get started</p>
                <Button className="mt-4 bg-[#6566F1] hover:bg-[#5A5BD9] text-white">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default BillingPage;
