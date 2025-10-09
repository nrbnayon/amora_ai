// components/customers/modals/EditCustomerStatusModal.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Customer {
  id: string;
  coupleName: string;
  email: string;
  eventDate: string;
  plan: "Pro" | "Free";
  status: "Active" | "Pending";
}

interface EditCustomerStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onSave: (updatedCustomer: Customer) => void;
}

export function EditCustomerStatusModal({
  isOpen,
  onClose,
  customer,
  onSave,
}: EditCustomerStatusModalProps) {
  const [status, setStatus] = useState<"Active" | "Pending">(customer.status);
  const [plan, setPlan] = useState<"Pro" | "Free">(customer.plan);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...customer,
      status,
      plan,
    });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60  p-4'>
      <div className='bg-white rounded-2xl shadow-xl max-w-md w-full'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Edit Customer Status
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
          {/* Customer Info */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <p className='text-sm text-gray-600'>Customer</p>
            <p className='font-semibold text-gray-900 text-lg'>
              {customer.coupleName}
            </p>
            <p className='text-sm text-gray-600 mt-1'>{customer.email}</p>
          </div>

          {/* Status Selection */}
          <div>
            <label className='block text-sm font-medium text-gray-900 mb-3'>
              Account Status
            </label>
            <div className='space-y-2'>
              <label className='flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50'>
                <input
                  type='radio'
                  name='status'
                  value='Active'
                  checked={status === "Active"}
                  onChange={(e) => setStatus(e.target.value as "Active")}
                  className='w-4 h-4 text-primary focus:ring-primary'
                />
                <div className='ml-3'>
                  <p className='font-medium text-gray-900'>Active</p>
                  <p className='text-sm text-gray-600'>
                    Customer has full access to the platform
                  </p>
                </div>
              </label>

              <label className='flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50'>
                <input
                  type='radio'
                  name='status'
                  value='Pending'
                  checked={status === "Pending"}
                  onChange={(e) => setStatus(e.target.value as "Pending")}
                  className='w-4 h-4 text-primary focus:ring-primary'
                />
                <div className='ml-3'>
                  <p className='font-medium text-gray-900'>Pending</p>
                  <p className='text-sm text-gray-600'>
                    Awaiting customer action or payment
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Plan Selection */}
          {/* <div>
            <label className='block text-sm font-medium text-gray-900 mb-3'>
              Subscription Plan
            </label>
            <div className='space-y-2'>
              <label className='flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50'>
                <input
                  type='radio'
                  name='plan'
                  value='Pro'
                  checked={plan === "Pro"}
                  onChange={(e) => setPlan(e.target.value as "Pro")}
                  className='w-4 h-4 text-primary focus:ring-primary'
                />
                <div className='ml-3'>
                  <p className='font-medium text-gray-900'>Pro Plan</p>
                  <p className='text-sm text-gray-600'>
                    Full access to all premium features
                  </p>
                </div>
              </label>

              <label className='flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50'>
                <input
                  type='radio'
                  name='plan'
                  value='Free'
                  checked={plan === "Free"}
                  onChange={(e) => setPlan(e.target.value as "Free")}
                  className='w-4 h-4 text-primary focus:ring-primary'
                />
                <div className='ml-3'>
                  <p className='font-medium text-gray-900'>Free Plan</p>
                  <p className='text-sm text-gray-600'>
                    Basic features with limitations
                  </p>
                </div>
              </label>
            </div>
          </div> */}

          {/* Actions */}
          <div className='flex gap-3 pt-4'>
            <Button onClick={onClose} variant='outline' className='flex-1 py-2'>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className='flex-1 bg-primary hover:bg-primary/90 text-white py-2'
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
