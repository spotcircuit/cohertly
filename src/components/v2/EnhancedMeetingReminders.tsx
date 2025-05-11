import React from 'react';
import { FaCalendar, FaVideo, FaMapMarkerAlt, FaUser, FaChartLine, FaStar } from 'react-icons/fa';
import Link from 'next/link';

export interface Meeting {
  id: string;
  contact: string;
  contactId?: string;
  title: string;
  time: string;
  type: 'virtual' | 'in-person';
  notes?: string;
  contactProfileImage?: string;
  location?: string;
  zoomLink?: string;
  highlightInfo?: {
    type: 'expertise' | 'lastReferral' | 'potentialValue';
    value: string;
    icon?: React.ReactNode;
  };
}

interface EnhancedMeetingRemindersProps {
  meetings: Meeting[];
  onJoinMeeting?: (meetingId: string) => void;
  onViewProfile?: (contactId?: string) => void;
}

const getHighlightIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'expertise':
      return <FaStar className="text-yellow-500" />;
    case 'lastReferral':
      return <FaUser className="text-blue-500" />;
    case 'potentialValue':
      return <FaChartLine className="text-green-500" />;
    default:
      return null;
  }
};

const EnhancedMeetingReminders: React.FC<EnhancedMeetingRemindersProps> = ({
  meetings,
  onJoinMeeting,
  onViewProfile
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
      
      {meetings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FaCalendar className="mx-auto text-3xl mb-2 text-gray-300" />
          <p>No upcoming meetings scheduled</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mr-4">
                  {meeting.contactProfileImage ? (
                    <img 
                      src={meeting.contactProfileImage} 
                      alt={meeting.contact} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-500">
                      {meeting.contact.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                  <p className="text-sm text-gray-600">with {meeting.contact}</p>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500 gap-4">
                    <span className="flex items-center">
                      <FaCalendar className="mr-1.5" />
                      {meeting.time}
                    </span>
                    <span className="flex items-center">
                      {meeting.type === 'virtual' ? (
                        <FaVideo className="mr-1.5" />
                      ) : (
                        <FaMapMarkerAlt className="mr-1.5" />
                      )}
                      {meeting.type === 'virtual' ? 'Virtual' : (meeting.location || 'In Person')}
                    </span>
                  </div>
                  
                  {meeting.highlightInfo && (
                    <div className="mt-3 bg-blue-50 rounded-lg p-2.5 text-sm flex items-center">
                      <span className="mr-2">
                        {meeting.highlightInfo.icon || getHighlightIcon(meeting.highlightInfo.type)}
                      </span>
                      <span className="text-blue-800">
                        {meeting.highlightInfo.type === 'expertise' && 'Top expertise: '}
                        {meeting.highlightInfo.type === 'lastReferral' && 'Last referral: '}
                        {meeting.highlightInfo.type === 'potentialValue' && 'Potential value: '}
                        <span className="font-medium">{meeting.highlightInfo.value}</span>
                      </span>
                    </div>
                  )}
                  
                  {meeting.notes && (
                    <p className="mt-2 text-xs text-gray-500 italic">{meeting.notes}</p>
                  )}
                  
                  <div className="mt-3 flex space-x-3">
                    {onViewProfile && (
                      <button
                        onClick={() => onViewProfile(meeting.contactId)}
                        className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        View Profile
                      </button>
                    )}
                    {meeting.type === 'virtual' && onJoinMeeting && (
                      <button
                        onClick={() => onJoinMeeting(meeting.id)}
                        className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <FaVideo className="mr-1.5" />
                        Join Meeting
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <Link 
          href="/v2/calendar"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All Meetings
        </Link>
      </div>
    </div>
  );
};

export default EnhancedMeetingReminders;
