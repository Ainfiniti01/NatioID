'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageSquare, User, Info, ArrowLeft, Send, Paperclip, Smile, MoreVertical, X, AlertTriangle } from 'lucide-react';

const AdminChatPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'pending', 'resolved', 'flagged'
  const [messageInput, setMessageInput] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(true); // State to toggle user info panel

  useEffect(() => {
    // DUMMY DATA FOR CONVERSATIONS
    setTimeout(() => {
      setConversations([
        {
          id: 'chat1',
          userName: 'Adebayo Johnson',
          userAvatar: 'https://via.placeholder.com/40/004040/FFFFFF?text=AJ',
          lastMessage: 'I have a question about my application.',
          lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          unreadCount: 2,
          status: 'pending',
          user: {
            id: 'user1',
            fullName: 'Adebayo Johnson',
            contact: { email: 'adebayo.j@email.com', phone: '+2348123456789' },
            documentSummary: '3 linked IDs, Verified',
            supportHistory: ['Ticket #1234 (Resolved)', 'Chat #001 (Pending)'],
            actions: ['Block User', 'Escalate', 'Add Internal Note'],
            linkedDocuments: ['ID_Doc_AJ.pdf', 'Application_Form_AJ.pdf'],
          },
          messages: [
            { id: 'msg1', sender: 'user', text: 'Hello, I need help with my application.', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
            { id: 'msg2', sender: 'admin', text: 'Sure, how can I assist you?', timestamp: new Date(Date.now() - 1000 * 60 * 9).toISOString() },
            { id: 'msg3', sender: 'user', text: 'I submitted it last week but haven\'t heard back.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
            { id: 'msg4', sender: 'user', text: 'Is there any update?', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
          ],
        },
        {
          id: 'chat2',
          userName: 'Kemi Okafor',
          userAvatar: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=KO',
          lastMessage: '📎 Image',
          lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          unreadCount: 0,
          status: 'resolved',
          user: {
            id: 'user2',
            fullName: 'Kemi Okafor',
            contact: { email: 'kemi.okafor@email.com', phone: '+2348234567890' },
            documentSummary: '1 linked ID, Pending Verification',
            supportHistory: ['Chat #002 (Resolved)'],
            actions: ['Block User', 'Escalate', 'Add Internal Note'],
            linkedDocuments: ['Passport_KO.jpg'],
          },
          messages: [
            { id: 'msg5', sender: 'user', text: 'I have an issue with my ID.', timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
            { id: 'msg6', sender: 'user', text: 'Here is a picture of it.', attachment: 'https://via.placeholder.com/150', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
            { id: 'msg7', sender: 'admin', text: 'Thank you, I will review this.', timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString() },
          ],
        },
        {
          id: 'chat3',
          userName: 'Uche Okoro',
          userAvatar: 'https://via.placeholder.com/40/33FF57/FFFFFF?text=UO',
          lastMessage: 'Can I get a quick reply?',
          lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          unreadCount: 0,
          status: 'flagged',
          user: {
            id: 'user3',
            fullName: 'Uche Okoro',
            contact: { email: 'uche.okoro@email.com', phone: '+2348345678901' },
            documentSummary: '4 linked IDs, Verified',
            supportHistory: [],
            actions: ['Block User', 'Escalate', 'Add Internal Note'],
            linkedDocuments: [],
          },
          messages: [
            { id: 'msg8', sender: 'user', text: 'I need urgent assistance.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
            { id: 'msg9', sender: 'admin', text: 'Please specify your issue.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9).toISOString() },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredConversations = conversations.filter(chat => {
    const matchesSearch = chat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || chat.status === filter || (filter === 'unread' && chat.unreadCount > 0);
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'admin',
        text: messageInput,
        timestamp: new Date().toISOString(),
      };
      setConversations(conversations.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: messageInput, lastMessageTimestamp: newMessage.timestamp }
          : chat
      ));
      setMessageInput('');
      // Scroll to bottom of chat window
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004040]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Chat Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {selectedChat && (
                <button
                  onClick={() => setShowUserInfo(!showUserInfo)}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={showUserInfo ? "Hide User Info" : "Show User Info"}
                >
                  {showUserInfo ? <X className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                </button>
              )}
              <button
                onClick={() => alert('More options')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="More Options"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Conversations List */}
        <div className={`w-full md:w-1/4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${selectedChat && 'hidden md:flex'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'unread', 'pending', 'resolved', 'flagged'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    filter === f ? 'bg-[#004040] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 p-4">No conversations found.</p>
            ) : (
              filteredConversations.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedChat?.id === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <img src={chat.userAvatar} alt={chat.userName} className="h-10 w-10 rounded-full mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{chat.userName}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimestamp(chat.lastMessageTimestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(chat.status)}`}>
                        {chat.status}
                      </span>
                      {chat.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Panel: Chat Window */}
        <div className={`flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 ${!selectedChat && 'hidden md:flex'}`}>
          {!selectedChat ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <MessageSquare className="h-12 w-12 mr-2" />
              Select a chat to start messaging
            </div>
          ) : (
            <>
              {/* Chat Window Header */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <img src={selectedChat.userAvatar} alt={selectedChat.userName} className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{selectedChat.userName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Online</p> {/* Placeholder for online status */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Quick Replies">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Escalate">
                    <AlertTriangle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map((message, index) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#004040] text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none shadow'
                    }`}>
                      {message.attachment && (
                        <img src={message.attachment} alt="Attachment" className="max-w-full h-auto rounded-md mb-2" />
                      )}
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex items-center">
                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" title="Attach File">
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  className="flex-1 mx-3 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#004040] focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }} // Adjust as needed
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#004040] hover:bg-[#003030] text-white p-3 rounded-full"
                  title="Send Message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar: User Info Panel */}
        {selectedChat && showUserInfo && (
          <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col p-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">User Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedChat.user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contact Details</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedChat.user.contact.email}</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedChat.user.contact.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Document Summary</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedChat.user.documentSummary}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Support History</p>
                <ul className="list-disc list-inside text-gray-900 dark:text-white">
                  {selectedChat.user.supportHistory.map((item, i) => (
                    <li key={i} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Actions</p>
                <div className="space-y-2 mt-1">
                  {selectedChat.user.actions.map((action, i) => (
                    <button key={i} className="w-full text-left text-sm text-[#004040] hover:text-[#003030] font-medium">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Linked Documents</p>
                <ul className="list-disc list-inside text-gray-900 dark:text-white">
                  {selectedChat.user.linkedDocuments.map((doc, i) => (
                    <li key={i} className="text-sm text-[#004040] hover:underline cursor-pointer">{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;
