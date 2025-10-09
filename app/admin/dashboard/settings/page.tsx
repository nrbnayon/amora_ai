"use client";
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    newCustomerSignup: true,
    paymentNotifications: true,
    stripeEnabled: true,
    primaryEmail: "example@gmail.com",
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdate = () => {
    console.log("Settings updated:", settings);
    // TODO: API call to save settings
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      {/* Header */}
      <div className="w-full mx-auto py-4">
        <PageHeader title="Settings" />
      </div>

      {/* Content */}
      <div className="w-full mx-auto px-6 py-8 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <div className="space-y-8">
          {/* Email Notification Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Email Notification
            </h2>
            <div className="space-y-3">
              <SettingRow
                label="New Customer Signup"
                checked={settings.newCustomerSignup}
                onChange={() => handleToggle("newCustomerSignup")}
              />
              <SettingRow
                label="Payment notifications"
                checked={settings.paymentNotifications}
                onChange={() => handleToggle("paymentNotifications")}
              />
            </div>
          </section>

          {/* Notification Recipients Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notification Recipents
            </h2>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Primary notification email
              </label>
              <input
                type="email"
                value={settings.primaryEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    primaryEmail: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                placeholder="example@gmail.com"
              />
            </div>
          </section>

          {/* Payment Gateway Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Gateway
            </h2>
            <SettingRow
              label={<span className="text-blue-600 font-medium">stripe</span>}
              checked={settings.stripeEnabled}
              onChange={() => handleToggle("stripeEnabled")}
            />
          </section>

          {/* Update Button */}
          <div>
            <button
              onClick={handleUpdate}
              className="px-8 py-3 bg-[#7B2D5E] hover:bg-[#6B2550] text-white font-medium rounded-lg transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// Setting Row Component
function SettingRow({
  label,
  checked,
  onChange,
}: {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
      <span className="text-sm text-gray-700">{label}</span>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}
