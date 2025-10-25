import React, { useState, useEffect } from 'react';
import { Profile, News, Settings } from '../types';
import { profileApi, newsApi, settingsApi } from '../utils/api';

const AdminPanel: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'news' | 'settings'>('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Change this to a more secure password
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      await profileApi.update(profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleNewsCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newNews = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      image_url: formData.get('image_url') as string,
      published: formData.get('published') === 'on',
    };

    try {
      await newsApi.create(newNews);
      fetchData();
      alert('News article created successfully!');
    } catch (error) {
      console.error('Error creating news:', error);
      alert('Error creating news article');
    }
  };

  const handleNewsDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await newsApi.delete(id);
        fetchData();
        alert('News article deleted successfully!');
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Error deleting news article');
      }
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      await settingsApi.update(settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="bg-dark-800 p-8 rounded-lg w-96">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg ${
              activeTab === 'profile' ? 'bg-primary-600' : 'bg-dark-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 rounded-lg ${
              activeTab === 'news' ? 'bg-primary-600' : 'bg-dark-700'
            }`}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg ${
              activeTab === 'settings' ? 'bg-primary-600' : 'bg-dark-700'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && profile && (
          <div className="bg-dark-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profile.first_name}
                    onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profile.last_name}
                    onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Profile Image URL</label>
                <input
                  type="url"
                  value={profile.profile_image_url}
                  onChange={(e) => setProfile({...profile, profile_image_url: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.date_of_birth}
                    onChange={(e) => setProfile({...profile, date_of_birth: e.target.value})}
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Nationality</label>
                  <input
                    type="text"
                    value={profile.nationality}
                    onChange={(e) => setProfile({...profile, nationality: e.target.value})}
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Languages</label>
                <input
                  type="text"
                  value={profile.languages}
                  onChange={(e) => setProfile({...profile, languages: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Resume URL</label>
                <input
                  type="url"
                  value={profile.resume_url}
                  onChange={(e) => setProfile({...profile, resume_url: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* Create News Form */}
            <div className="bg-dark-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Create New Article</h2>
              <form onSubmit={handleNewsCreate} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Content</label>
                  <textarea
                    name="content"
                    rows={4}
                    required
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image_url"
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    className="mr-2"
                  />
                  <label className="text-gray-300">Published</label>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Create Article
                </button>
              </form>
            </div>

            {/* News List */}
            <div className="bg-dark-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">News Articles</h2>
              <div className="space-y-4">
                {news.map((article) => (
                  <div key={article.id} className="bg-dark-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(article.created_at).toLocaleDateString()} - 
                        {article.published ? ' Published' : ' Draft'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNewsDelete(article.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && settings && (
          <div className="bg-dark-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Site Settings</h2>
            <form onSubmit={handleSettingsUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Site Title</label>
                <input
                  type="text"
                  value={settings.site_title}
                  onChange={(e) => setSettings({...settings, site_title: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Site Description</label>
                <textarea
                  value={settings.site_description}
                  onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                  rows={3}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={settings.admin_email}
                  onChange={(e) => setSettings({...settings, admin_email: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={settings.copyright_text}
                  onChange={(e) => setSettings({...settings, copyright_text: e.target.value})}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Update Settings
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
