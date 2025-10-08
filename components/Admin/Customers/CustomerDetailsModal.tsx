// components/customers/modals/CustomerDetailsModal.tsx
import React from "react";
import { X, Mail, Calendar, CreditCard, CheckCircle } from "lucide-react";

interface Customer {
  id: string;
  coupleName: string;
  email: string;
  eventDate: string;
  plan: "Pro" | "Free";
  status: "Active" | "Pending";
}

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

export function CustomerDetailsModal({
  isOpen,
  onClose,
  customer,
}: CustomerDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Customer Details
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Basic Info */}
          <div className='bg-gradient-to-br from-primary/10 to-purple-100 rounded-xl p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <h3 className='text-2xl font-bold text-gray-900'>
                  {customer.coupleName}
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                  Customer ID: {customer.id}
                </p>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  customer.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {customer.status}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-gray-900'>
              Contact Information
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
                  <Mail className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Email Address</p>
                  <p className='font-medium text-gray-900'>{customer.email}</p>
                </div>
              </div>

              <div className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
                  <Calendar className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Event Date</p>
                  <p className='font-medium text-gray-900'>
                    {customer.eventDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-gray-900'>
              Subscription Details
            </h4>
            <div className='p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center'>
                    <CreditCard className='w-5 h-5 text-primary' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Current Plan</p>
                    <p className='font-semibold text-gray-900 text-lg'>
                      {customer.plan}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    customer.plan === "Pro"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {customer.plan === "Pro" ? "Premium" : "Basic"}
                </div>
              </div>

              {customer.plan === "Pro" && (
                <div className='space-y-2 pt-3 border-t'>
                  <p className='text-sm font-medium text-gray-700'>
                    Pro Features:
                  </p>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <CheckCircle className='w-4 h-4 text-green-600' />
                      <span>AI-Powered Planning</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <CheckCircle className='w-4 h-4 text-green-600' />
                      <span>Unlimited Guest List</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <CheckCircle className='w-4 h-4 text-green-600' />
                      <span>Premium Templates</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <CheckCircle className='w-4 h-4 text-green-600' />
                      <span>Priority Support</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Summary */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-gray-900'>
              Activity Summary
            </h4>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <p className='text-2xl font-bold text-gray-900'>120</p>
                <p className='text-sm text-gray-600 mt-1'>Guests</p>
              </div>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <p className='text-2xl font-bold text-gray-900'>15</p>
                <p className='text-sm text-gray-600 mt-1'>Tasks</p>
              </div>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <p className='text-2xl font-bold text-gray-900'>8</p>
                <p className='text-sm text-gray-600 mt-1'>Vendors</p>
              </div>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <p className='text-2xl font-bold text-gray-900'>65%</p>
                <p className='text-sm text-gray-600 mt-1'>Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
