import React from 'react';
import { 
  FaLinkedin, FaGoogle, FaWhatsapp, FaEnvelope, 
  FaPhone, FaCalendarAlt, FaSlack, FaTwitter, 
  FaFacebook, FaAddressBook, FaQuestion
} from 'react-icons/fa';

export type ContactSource = 
  | 'linkedin' 
  | 'gmail' 
  | 'whatsapp' 
  | 'outlook'
  | 'phone'
  | 'calendar'
  | 'slack'
  | 'twitter'
  | 'facebook'
  | 'manual'
  | 'unknown';

interface ContactSourceIndicatorProps {
  sources: ContactSource[];
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export default function ContactSourceIndicator({ 
  sources, 
  size = 'md', 
  showLabels = false,
  className = ''
}: ContactSourceIndicatorProps) {
  const getIcon = (source: ContactSource) => {
    switch (source) {
      case 'linkedin':
        return { icon: <FaLinkedin />, color: 'text-blue-700', label: 'LinkedIn' };
      case 'gmail':
        return { icon: <FaGoogle />, color: 'text-red-500', label: 'Gmail' };
      case 'whatsapp':
        return { icon: <FaWhatsapp />, color: 'text-green-500', label: 'WhatsApp' };
      case 'outlook':
        return { icon: <FaEnvelope />, color: 'text-blue-500', label: 'Outlook' };
      case 'phone':
        return { icon: <FaPhone />, color: 'text-gray-700', label: 'Phone' };
      case 'calendar':
        return { icon: <FaCalendarAlt />, color: 'text-indigo-500', label: 'Calendar' };
      case 'slack':
        return { icon: <FaSlack />, color: 'text-purple-500', label: 'Slack' };
      case 'twitter':
        return { icon: <FaTwitter />, color: 'text-blue-400', label: 'Twitter' };
      case 'facebook':
        return { icon: <FaFacebook />, color: 'text-blue-600', label: 'Facebook' };
      case 'manual':
        return { icon: <FaAddressBook />, color: 'text-gray-600', label: 'Manual Entry' };
      default:
        return { icon: <FaQuestion />, color: 'text-gray-400', label: 'Unknown' };
    }
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex ${showLabels ? 'flex-col space-y-1' : 'flex-row space-x-1'} ${className}`}>
      {sources.map((source, index) => {
        const { icon, color, label } = getIcon(source);
        return (
          <div 
            key={`${source}-${index}`} 
            className={`${showLabels ? 'flex items-center' : 'tooltip'}`}
            data-tip={!showLabels ? label : undefined}
          >
            <span className={`${color} ${sizeClasses[size]}`}>
              {icon}
            </span>
            {showLabels && (
              <span className="ml-1 text-xs text-gray-600">{label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
