import { useState } from 'react';
import Layout from '../components/Layout';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaPlus, FaEllipsisH, FaClock } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Mock calendar data
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Mock events data
const mockEvents = [
  { 
    id: 1, 
    title: 'Intro Call with David Miller', 
    date: new Date(2025, 4, 8, 15, 0), 
    endDate: new Date(2025, 4, 8, 16, 0),
    type: 'Virtual',
    color: 'blue'
  },
  { 
    id: 2, 
    title: 'Follow-up with Sarah Johnson', 
    date: new Date(2025, 4, 9, 11, 0), 
    endDate: new Date(2025, 4, 9, 12, 0),
    type: 'In-person',
    color: 'green'
  },
  { 
    id: 3, 
    title: 'Quarterly Review', 
    date: new Date(2025, 4, 10, 14, 30), 
    endDate: new Date(2025, 4, 10, 16, 0),
    type: 'Virtual',
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Tax Planning Session', 
    date: new Date(2025, 4, 12, 10, 0), 
    endDate: new Date(2025, 4, 12, 11, 30),
    type: 'Virtual',
    color: 'blue'
  },
  { 
    id: 5, 
    title: 'Networking Event', 
    date: new Date(2025, 4, 15, 18, 0), 
    endDate: new Date(2025, 4, 15, 20, 0),
    type: 'In-person',
    color: 'green'
  },
  { 
    id: 6, 
    title: 'Client Onboarding', 
    date: new Date(2025, 4, 17, 9, 0), 
    endDate: new Date(2025, 4, 17, 10, 0),
    type: 'Virtual',
    color: 'blue'
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 7)); // May 7, 2025
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  
  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date(2025, 4, 7)); // Reset to May 7, 2025
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Check if a day has events
  const getEventsForDay = (day: number) => {
    return mockEvents.filter(event => 
      event.date.getFullYear() === currentYear && 
      event.date.getMonth() === currentMonth && 
      event.date.getDate() === day
    );
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50/50"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = day === 7 && currentMonth === 4 && currentYear === 2025; // May 7, 2025
      const dayEvents = getEventsForDay(day);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`h-24 border border-gray-200 p-1 ${isToday ? 'bg-blue-50' : 'bg-white'} overflow-hidden`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="text-xs text-gray-500">{dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}</span>
            )}
          </div>
          <div className="mt-1 space-y-1 max-h-[calc(100%-24px)] overflow-hidden">
            {dayEvents.slice(0, 2).map(event => (
              <button 
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className={`w-full text-left text-xs truncate px-1.5 py-0.5 rounded bg-${event.color}-100 text-${event.color}-800 border border-${event.color}-200`}
              >
                {formatTime(event.date)} {event.title}
              </button>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden h-[225px] rounded-lg mb-4">
        <Image 
          src="/images/hero.png" 
          alt="Calendar Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-3">
            <FaCalendarAlt /> Calendar
          </h1>
        </div>
      </div>
      
      {/* Small padding */}
      <div className="h-2"></div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          {/* Calendar Mini View */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {MONTHS[currentMonth]} {currentYear}
              </h3>
              <div className="flex space-x-1">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button 
                  onClick={goToNextMonth}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>
            
            {/* Mini calendar */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {DAYS.map(day => (
                <div key={day} className="text-xs font-medium text-gray-500">
                  {day.slice(0, 1)}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`mini-empty-${i}`} className="h-6"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 7 && currentMonth === 4 && currentYear === 2025;
                const hasEvents = getEventsForDay(day).length > 0;
                
                return (
                  <button 
                    key={`mini-day-${day}`}
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs
                      ${isToday ? 'bg-blue-600 text-white' : hasEvents ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-100">
              <button 
                onClick={goToToday}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm py-1.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Upcoming Events
            </h3>
            
            <div className="space-y-3">
              {mockEvents.slice(0, 4).map(event => (
                <div 
                  key={event.id}
                  className={`p-3 rounded-lg bg-white border border-${event.color}-200 hover:bg-${event.color}-50 transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-800">{event.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-${event.color}-100 text-${event.color}-800`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaClock className="mr-1" size={10} />
                    <span>
                      {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {formatTime(event.date)} - {formatTime(event.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-100">
              <button className="w-full flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                <FaPlus size={12} /> Add New Event
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Calendar */}
        <div className="lg:col-span-3">
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            {/* Calendar Header */}
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button 
                  onClick={goToToday}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Today
                </button>
              </div>
              
              <div className="flex items-center">
                <div className="flex border border-blue-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setView('month')}
                    className={`px-3 py-1 text-xs ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                  >
                    Month
                  </button>
                  <button 
                    onClick={() => setView('week')}
                    className={`px-3 py-1 text-xs ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => setView('day')}
                    className={`px-3 py-1 text-xs ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                  >
                    Day
                  </button>
                </div>
                
                <div className="flex ml-2">
                  <button 
                    onClick={goToPreviousMonth}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    <FaChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={goToNextMonth}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    <FaChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {DAYS.map(day => (
                  <div key={day} className="py-2 text-center text-sm font-medium text-gray-700">
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7">
                {generateCalendarDays()}
              </div>
            </div>
            
            {/* Event Details Modal */}
            {selectedEvent !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                  {(() => {
                    const event = mockEvents.find(e => e.id === selectedEvent);
                    if (!event) return null;
                    
                    return (
                      <>
                        <div className={`px-6 py-4 bg-${event.color}-100 rounded-t-lg border-b border-${event.color}-200`}>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                            <button 
                              onClick={() => setSelectedEvent(null)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-600">
                            <FaClock className="mr-2" size={14} />
                            <span>
                              {event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}, {formatTime(event.date)} - {formatTime(event.endDate)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm bg-${event.color}-100 text-${event.color}-800`}>
                              {event.type}
                            </span>
                            <button className="text-gray-500 hover:text-gray-700">
                              <FaEllipsisH />
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                              <p className="text-sm text-gray-600">
                                {event.type === 'Virtual' 
                                  ? 'Virtual meeting via Zoom. Link will be sent 15 minutes before the meeting.' 
                                  : 'In-person meeting at the client\'s office. Bring presentation materials.'}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">Participants</h4>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                                  {event.title.split(' ').slice(-2).map(word => word[0]).join('')}
                                </div>
                                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">
                                  YP
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-end gap-2">
                            <button 
                              onClick={() => setSelectedEvent(null)}
                              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              Close
                            </button>
                            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Edit Event
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
