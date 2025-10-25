import React, { useState, useEffect } from 'react';
import { Profile, News, Settings } from '../types';
import { profileApi, newsApi, settingsApi } from '../utils/api';

const CVPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, newsRes, settingsRes] = await Promise.all([
          profileApi.get(),
          newsApi.getAll(),
          settingsApi.get(),
        ]);
        
        setProfile(profileRes.data);
        setNews(newsRes.data);
        setSettings(settingsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Error loading profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-dark-900 p-8">
          <div className="flex flex-col items-center mb-8">
            <img
              src={profile.profile_image_url}
              alt={profile.first_name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-bold text-white">{profile.first_name} {profile.last_name}</h2>
            <p className="text-gray-400">{profile.title}</p>
          </div>
          
          <nav className="space-y-4">
            <a href="#home" className="flex items-center space-x-3 p-3 bg-primary-600 rounded-lg text-white">
              <span>🏠</span>
              <span>Home</span>
            </a>
            <a href="#about" className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white">
              <span>👤</span>
              <span>About</span>
            </a>
            <a href="#service" className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white">
              <span>💼</span>
              <span>Service</span>
            </a>
            <a href="#portfolio" className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white">
              <span>📁</span>
              <span>Portfolio</span>
            </a>
            <a href="#news" className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white">
              <span>📰</span>
              <span>News</span>
            </a>
            <a href="#contact" className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white">
              <span>✉️</span>
              <span>Contact</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="inline-block bg-red-600 text-white px-3 py-1 text-sm font-bold mb-4">
              HELLO
            </div>
            <div className="flex items-center mb-6">
              <img
                src={profile.profile_image_url}
                alt={profile.first_name}
                className="w-24 h-24 rounded-full mr-6 object-cover"
              />
              <h1 className="text-4xl font-bold text-white">
                {profile.first_name} {profile.last_name}
              </h1>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              {profile.bio}
            </p>
          </div>

          {/* Personal Details Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">👤</span>
                <div>
                  <div className="text-gray-400 text-sm">First Name:</div>
                  <div className="text-white">{profile.first_name}</div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">📅</span>
                <div>
                  <div className="text-gray-400 text-sm">Date of Birth:</div>
                  <div className="text-white">{new Date(profile.date_of_birth).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">📞</span>
                <div>
                  <div className="text-gray-400 text-sm">Phone:</div>
                  <div className="text-white">{profile.phone}</div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">📍</span>
                <div>
                  <div className="text-gray-400 text-sm">Address:</div>
                  <div className="text-white">{profile.address}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">👤</span>
                <div>
                  <div className="text-gray-400 text-sm">Last Name:</div>
                  <div className="text-white">{profile.last_name}</div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">🏳️</span>
                <div>
                  <div className="text-gray-400 text-sm">Nationality:</div>
                  <div className="text-white">{profile.nationality}</div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">✉️</span>
                <div>
                  <div className="text-gray-400 text-sm">Email:</div>
                  <div className="text-white">{profile.email}</div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-700 pb-3">
                <span className="text-2xl mr-4">🌐</span>
                <div>
                  <div className="text-gray-400 text-sm">Languages:</div>
                  <div className="text-white">{profile.languages}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark-700 hover:bg-dark-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Download Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Contact Me
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            {settings?.copyright_text || '© 2024 All Rights Reserved.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPage;
