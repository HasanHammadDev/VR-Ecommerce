import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface AlertProps {
  message: string;
  type: 'error' | 'warning' | 'success' | 'info';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const getAlertStyle = () => {
    switch (type) {
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`border-l-4 p-4 ${getAlertStyle()} flex items-center justify-between`} role="alert">
      <div className="flex items-center m-2">
        {getIcon()}
        <span className="ml-3">{message}</span>
      </div>
    </div>
  );
};

export default Alert;