'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  FileText,
  Package,
  TrendingUp,
  Zap,
  Database,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'plans', label: 'Plans' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'payment', label: 'Payment' }
  ];

  return (
    <DashboardLayout activeSection="billing">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600 mt-1">
            Manage your subscription, usage, and billing information
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Current Plan</CardTitle>
                    <CardDescription>
                      Your current subscription and next billing date
                    </CardDescription>
                  </div>
                  <Badge className="bg-purple-600 text-white">Pro</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">$29/month</p>
                  <p className="text-gray-600">Billed monthly • Next billing: March 15, 2024</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">5 active bots</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">10,000 conversations/month</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Custom branding</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
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
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">Conversations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-gray-900">
                    7,834 used of 10,000 limit
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
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
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
