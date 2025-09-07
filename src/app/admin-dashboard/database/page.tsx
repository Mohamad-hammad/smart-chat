'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  HardDrive, 
  Activity,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Server,
  Trash2,
  Plus
} from 'lucide-react';

interface DatabaseMetric {
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  change: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface Backup {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  status: 'completed' | 'in_progress' | 'failed';
  type: 'full' | 'incremental';
}

const DatabasePage: React.FC = () => {
  const [metrics, setMetrics] = useState<DatabaseMetric[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDatabaseData = async () => {
      try {
        setMetrics([
          {
            name: 'Database Size',
            value: '2.4 GB',
            status: 'healthy',
            change: 5.2,
            icon: HardDrive
          },
          {
            name: 'Active Connections',
            value: '24/100',
            status: 'healthy',
            change: -2.1,
            icon: Activity
          },
          {
            name: 'Query Response Time',
            value: '12ms',
            status: 'healthy',
            change: -8.5,
            icon: Clock
          },
          {
            name: 'Cache Hit Ratio',
            value: '98.5%',
            status: 'healthy',
            change: 1.2,
            icon: BarChart3
          }
        ]);

        setBackups([
          {
            id: '1',
            name: 'Full Backup - Daily',
            size: '2.4 GB',
            createdAt: '2024-01-20 02:00:00',
            status: 'completed',
            type: 'full'
          },
          {
            id: '2',
            name: 'Incremental Backup',
            size: '156 MB',
            createdAt: '2024-01-20 14:00:00',
            status: 'completed',
            type: 'incremental'
          },
          {
            id: '3',
            name: 'Full Backup - Weekly',
            size: '2.4 GB',
            createdAt: '2024-01-19 02:00:00',
            status: 'completed',
            type: 'full'
          }
        ]);
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    loadDatabaseData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'warning':
      case 'in_progress':
        return <Clock className="w-5 h-5" />;
      case 'critical':
      case 'failed':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border-0">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
          <p className="text-gray-600 mt-2">Monitor and manage database performance and backups</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#6566F1] text-white px-4 py-2 rounded-xl hover:bg-[#5A5BD9] transition-colors shadow-lg">
            <Plus className="w-5 h-5" />
            <span>Create Backup</span>
          </button>
        </div>
      </div>

      {/* Database Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border-0 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(metric.status)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${metric.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {getStatusIcon(metric.status)}
                  <span className="ml-2 text-sm font-medium capitalize">{metric.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Database Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-[#6566F1]" />
            Database Operations
          </h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Export Database</p>
                  <p className="text-sm text-gray-600">Create a full database export</p>
                </div>
              </div>
              <div className="text-gray-400">
                <Settings className="w-5 h-5" />
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Import Database</p>
                  <p className="text-sm text-gray-600">Restore from backup file</p>
                </div>
              </div>
              <div className="text-gray-400">
                <Settings className="w-5 h-5" />
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Optimize Database</p>
                  <p className="text-sm text-gray-600">Run database optimization</p>
                </div>
              </div>
              <div className="text-gray-400">
                <Settings className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-[#6566F1]" />
            Security & Maintenance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">SSL Certificate</p>
                <p className="text-sm text-gray-600">Database encryption status</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">Access Control</p>
                <p className="text-sm text-gray-600">User permissions and roles</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Configured
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">Audit Logging</p>
                <p className="text-sm text-gray-600">Database activity monitoring</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Enabled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Management */}
      <div className="bg-white rounded-2xl shadow-sm border-0 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Database className="w-6 h-6 mr-2 text-[#6566F1]" />
                Backup Management
              </h3>
              <p className="text-gray-600 mt-1">Manage database backups and restore points</p>
            </div>
            <button className="flex items-center space-x-2 bg-[#6566F1] text-white px-4 py-2 rounded-xl hover:bg-[#5A5BD9] transition-colors">
              <Plus className="w-5 h-5" />
              <span>New Backup</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Backup Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Database className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{backup.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      backup.type === 'full' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {backup.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(backup.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center w-fit ${getStatusColor(backup.status)}`}>
                      {getStatusIcon(backup.status)}
                      <span className="ml-1 capitalize">{backup.status.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-[#6566F1] hover:text-[#5A5BD9] p-2 rounded-lg hover:bg-[#6566F1]/10 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;
