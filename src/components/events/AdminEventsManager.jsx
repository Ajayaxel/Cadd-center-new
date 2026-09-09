import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff, 
  Upload, 
  X, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ImageIcon, 
  ArrowLeft,
  Search,
  LayoutGrid
} from 'lucide-react';
import { EVENT_CATEGORIES, slugify, formatEventDate } from '../../data/mockEvents';

export default function AdminEventsManager({ events = [], onSaveEvents, onResetEvents, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Modal State: null = closed, 'create' = new event form, event object = editing existing event
  const [editingEvent, setEditingEvent] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Workshops',
    event_date: new Date().toISOString().split('T')[0],
    location: 'Main Auditorium, CADD Centre Perinthalmanna',
    description: '',
    cover_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    is_featured: false,
    status: 'published',
    gallery_images: []
  });

  const [galleryInputUrl, setGalleryInputUrl] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');

  // Stats calculation
  const totalCount = events.length;
  const publishedCount = events.filter(e => e.status === 'published').length;
  const featuredCount = events.filter(e => e.is_featured).length;

  const openCreateModal = () => {
    setFormData({
      id: `evt-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Workshops',
      event_date: new Date().toISOString().split('T')[0],
      location: 'Main Auditorium, CADD Centre Perinthalmanna',
      description: '',
      cover_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
      is_featured: false,
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      gallery_images: []
    });
    setEditingEvent('create');
  };

  const openEditModal = (evt) => {
    setFormData({
      ...evt,
      gallery_images: evt.gallery_images ? [...evt.gallery_images] : []
    });
    setEditingEvent(evt);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: slugify(val)
    }));
  };

  const handleCoverFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, cover_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFilesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            gallery_images: [
              ...prev.gallery_images,
              {
                id: `img-${Date.now()}-${index}`,
                event_id: prev.id || `evt-${Date.now()}`,
                image_url: reader.result,
                caption: file.name.replace(/\.[^/.]+$/, ""),
                sort_order: prev.gallery_images.length + index + 1,
                created_at: new Date().toISOString()
              }
            ]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddGalleryUrl = () => {
    if (galleryInputUrl.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        gallery_images: [
          ...prev.gallery_images,
          {
            id: `img-${Date.now()}`,
            event_id: prev.id || `evt-${Date.now()}`,
            image_url: galleryInputUrl.trim(),
            caption: galleryCaption.trim() || 'Event Photo',
            sort_order: prev.gallery_images.length + 1,
            created_at: new Date().toISOString()
          }
        ]
      }));
      setGalleryInputUrl('');
      setGalleryCaption('');
    }
  };

  const handleRemoveGalleryImage = (imgId) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter(img => img.id !== imgId)
    }));
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Event Title is required!');
      return;
    }

    let updatedEvents = [];
    const nowStr = new Date().toISOString();

    if (editingEvent === 'create') {
      const newEvt = {
        ...formData,
        id: formData.id || `evt-${Date.now()}`,
        slug: formData.slug || slugify(formData.title),
        created_at: nowStr,
        updated_at: nowStr
      };

      // If set to featured, unfeature previous featured if any
      if (newEvt.is_featured) {
        updatedEvents = events.map(e => ({ ...e, is_featured: false }));
        updatedEvents.unshift(newEvt);
      } else {
        updatedEvents = [newEvt, ...events];
      }
    } else {
      // Editing existing
      const updatedEvt = {
        ...formData,
        updated_at: nowStr
      };

      updatedEvents = events.map(e => {
        if (e.id === updatedEvt.id) {
          return updatedEvt;
        }
        if (updatedEvt.is_featured) {
          return { ...e, is_featured: false };
        }
        return e;
      });
    }

    onSaveEvents(updatedEvents);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      const updated = events.filter(e => e.id !== id);
      onSaveEvents(updated);
    }
  };

  const handleToggleStatus = (id) => {
    const updated = events.map(e => {
      if (e.id === id) {
        return {
          ...e,
          status: e.status === 'published' ? 'draft' : 'published',
          updated_at: new Date().toISOString()
        };
      }
      return e;
    });
    onSaveEvents(updated);
  };

  const handleToggleFeatured = (id) => {
    const updated = events.map(e => {
      if (e.id === id) {
        return { ...e, is_featured: !e.is_featured };
      }
      return { ...e, is_featured: false };
    });
    onSaveEvents(updated);
  };

  const filteredEventsList = events.filter(e => {
    if (filterCategory !== 'All' && e.category !== filterCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[rgb(240,82,87)] mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Website
            </button>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Events CMS &amp; Admin Panel
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage, publish, feature, and update events for CADD Centre Perinthalmanna.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetEvents}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
              title="Reset to default seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Seed Data
            </button>

            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 rounded-xl bg-[rgb(240,82,87)] hover:bg-[#E03E43] text-white text-xs font-bold shadow-md shadow-red-500/20 inline-flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create New Event
            </button>
          </div>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Events</span>
              <h3 className="text-2xl font-black text-slate-900">{totalCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Published</span>
              <h3 className="text-2xl font-black text-emerald-600">{publishedCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Featured Event</span>
              <h3 className="text-2xl font-black text-[rgb(240,82,87)]">{featuredCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[rgb(240,82,87)] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[rgb(240,82,87)]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              {EVENT_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Table / List */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Cover</th>
                  <th className="py-3.5 px-4 sm:px-6">Event Details</th>
                  <th className="py-3.5 px-4 sm:px-6">Category</th>
                  <th className="py-3.5 px-4 sm:px-6">Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Featured</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredEventsList.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Cover Thumbnail */}
                    <td className="py-3 px-4 sm:px-6">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                        <img src={evt.cover_image} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>

                    {/* Details */}
                    <td className="py-3 px-4 sm:px-6 max-w-xs">
                      <div className="font-bold text-slate-900 line-clamp-1">{evt.title}</div>
                      <div className="text-slate-400 text-xs truncate">{evt.slug}</div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 sm:px-6">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {evt.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 sm:px-6 text-xs text-slate-600 whitespace-nowrap">
                      {formatEventDate(evt.event_date)}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 sm:px-6 text-center">
                      <button
                        onClick={() => handleToggleStatus(evt.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          evt.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {evt.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4 sm:px-6 text-center">
                      <button
                        onClick={() => handleToggleFeatured(evt.id)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          evt.is_featured
                            ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={evt.is_featured ? 'Featured on Hero' : 'Set as Featured'}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(evt)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-[rgb(240,82,87)] hover:bg-slate-100 cursor-pointer transition-colors"
                          title="Edit Event"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form for Create / Edit */}
        <AnimatePresence>
          {editingEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-xl font-bold text-slate-900">
                    {editingEvent === 'create' ? 'Create New Event' : 'Edit Event Details'}
                  </h3>
                  <button
                    onClick={() => setEditingEvent(null)}
                    className="p-2 rounded-full hover:bg-slate-200/80 text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSaveForm} className="p-6 overflow-y-auto space-y-6 flex-grow text-xs sm:text-sm">
                  {/* Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Event Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="e.g. Convocation Ceremony 2026"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(240,82,87)]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(240,82,87)]"
                      >
                        {EVENT_CATEGORIES.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Slug & Date & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">SEO Slug</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-[rgb(240,82,87)]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Event Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.event_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(240,82,87)]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g. Main Auditorium, Perinthalmanna"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(240,82,87)]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Event Description *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter detailed description, highlights, agenda..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(240,82,87)]"
                    />
                  </div>

                  {/* Cover Image Upload */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700">Cover Image</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-32 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 relative">
                        <img src={formData.cover_image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2 flex-grow w-full">
                        <input
                          type="text"
                          value={formData.cover_image}
                          onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                          placeholder="Image URL or upload file below..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer border border-slate-200">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image File</span>
                          <input type="file" accept="image/*" onChange={handleCoverFileUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Status & Featured Toggles */}
                  <div className="flex flex-wrap items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 select-none">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="w-4 h-4 rounded text-[rgb(240,82,87)] focus:ring-[rgb(240,82,87)]"
                      />
                      <span>Mark as Featured Event</span>
                    </label>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800">Status:</span>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="px-3 py-1 rounded-xl border border-slate-200 bg-white font-semibold text-xs cursor-pointer"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft / Hidden</option>
                      </select>
                    </div>
                  </div>

                  {/* Gallery Images Section */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-900 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[rgb(240,82,87)]" />
                        Multiple Gallery Photographs ({formData.gallery_images.length})
                      </label>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer border border-slate-200">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Files</span>
                        <input type="file" multiple accept="image/*" onChange={handleGalleryFilesUpload} className="hidden" />
                      </label>
                    </div>

                    {/* URL Input Row */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={galleryInputUrl}
                        onChange={(e) => setGalleryInputUrl(e.target.value)}
                        placeholder="Add Image URL..."
                        className="flex-grow px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                      />
                      <input
                        type="text"
                        value={galleryCaption}
                        onChange={(e) => setGalleryCaption(e.target.value)}
                        placeholder="Caption (optional)"
                        className="w-40 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-[rgb(240,82,87)]"
                      >
                        Add Photo
                      </button>
                    </div>

                    {/* Gallery Thumbnails List */}
                    {formData.gallery_images.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
                        {formData.gallery_images.map((img) => (
                          <div key={img.id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 group">
                            <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(img.id)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-white hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Submit Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[rgb(240,82,87)] hover:bg-[#E03E43] text-white font-bold text-xs shadow-md shadow-red-500/20"
                    >
                      Save Event Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
