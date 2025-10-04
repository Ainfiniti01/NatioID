'use client';

import React from 'react';
import LogPage from '../../components/LogPage';

export default function Logs() {
  // DUMMY ONLY – REMOVE IN PRODUCTION
  const logs = [
    {
      id: 'LOG001',
      userId: 'USR001',
      action: 'user_login',
      entityType: 'users',
      entityId: 1,
      level: 'info',
      message: 'User successfully logged in',
      details: {
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Lagos, Country',
        sessionId: 'sess_abc123',
        loginMethod: 'email'
      },
      ipAddress: '192.168.1.100',
      createdAt: '2024-09-18T14:30:00Z'
    },
    {
      id: 'LOG002',
      userId: 'USR002',
      action: 'complaint_submitted',
      entityType: 'complaints',
      entityId: 15,
      level: 'info',
      message: 'New complaint submitted',
      details: {
        complaintId: 'CMP-2024-015',
        category: 'infrastructure',
        priority: 'high',
        location: 'Victoria Island, Lagos'
      },
      ipAddress: '192.168.1.105',
      createdAt: '2024-09-18T14:25:00Z'
    },
    {
      id: 'LOG003',
      userId: null,
      action: 'failed_login_attempt',
      entityType: 'authentication',
      entityId: null,
      level: 'warning',
      message: 'Failed login attempt detected',
      details: {
        ip: '203.198.45.12',
        userAgent: 'curl/7.68.0',
        attempts: 5,
        email: 'test@example.com',
        reason: 'invalid_password'
      },
      ipAddress: '203.198.45.12',
      createdAt: '2024-09-18T14:20:00Z'
    },
    {
      id: 'LOG004',
      userId: 'USR003',
      action: 'application_approved',
      entityType: 'applications',
      entityId: 87,
      level: 'info',
      message: 'Application approved by admin',
      details: {
        applicationId: 'APP-2024-087',
        applicationType: 'passport_renewal',
        adminId: 'ADM001',
        processingTime: '48 hours'
      },
      ipAddress: '192.168.1.110',
      createdAt: '2024-09-18T14:15:00Z'
    },
    {
      id: 'LOG005',
      userId: null,
      action: 'system_error',
      entityType: 'system',
      entityId: null,
      level: 'error',
      message: 'Database connection timeout',
      details: {
        error: 'Connection timeout after 30 seconds',
        database: 'main_db',
        query: 'SELECT * FROM users WHERE status = active',
        stackTrace: 'Error: timeout at Connection.query...'
      },
      ipAddress: '127.0.0.1',
      createdAt: '2024-09-18T14:10:00Z'
    },
    {
      id: 'LOG006',
      userId: 'USR001',
      action: 'profile_updated',
      entityType: 'users',
      entityId: 1,
      level: 'info',
      message: 'User profile information updated',
      details: {
        changedFields: ['phone', 'address'],
        oldValues: {
          phone: '+234 803 456 7890',
          address: '123 Old Address, Lagos'
        },
        newValues: {
          phone: '+234 803 456 7891',
          address: '456 New Address, Lagos'
        }
      },
      ipAddress: '192.168.1.100',
      createdAt: '2024-09-18T14:05:00Z'
    }
  ];

  const stats = {
    totalLogs: 15847,
    errorLogs: 234,
    warningLogs: 1456,
    infoLogs: 14157,
    todayLogs: 567
  };

  return (
    <LogPage
      logs={logs}
      stats={stats}
      title="System Logs"
      dataSource="citizen"
    />
  );
}
