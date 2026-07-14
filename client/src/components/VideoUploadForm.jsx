import { useState } from 'react';
import api from '../utils/api';
import Input from './ui/Input';
import Button from './ui/Button';

const INITIAL = { title: '', description: '', url: '', thumbnail: '', category: '', duration: '', order: '' };

const VideoUploadForm = ({ onCreated }) => {
  const [form,    setForm]    = useState(INITIAL);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setSaving(true);
    try {
      const payload = { ...form, duration: Number(form.duration), order: Number(form.order) || 0 };
      const { data } = await api.post('/videos', payload);
      setSuccess(`"${data.data.title}" created!`);
      setForm(INITIAL);
      onCreated?.(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create video');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4 max-w-xl">
      <h2 className="text-lg font-bold text-white">Upload New Video</h2>
      {error   && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-green-400">{success}</p>}
      <Input id="uf-title"       name="title"       label="Title *"              value={form.title}       onChange={handleChange} required />
      <Input id="uf-url"         name="url"         label="Video URL *"          value={form.url}         onChange={handleChange} required />
      <Input id="uf-category"    name="category"    label="Category *"           value={form.category}    onChange={handleChange} required />
      <Input id="uf-duration"    name="duration"    label="Duration (seconds) *" value={form.duration}    onChange={handleChange} type="number" required />
      <Input id="uf-thumbnail"   name="thumbnail"   label="Thumbnail URL"        value={form.thumbnail}   onChange={handleChange} />
      <Input id="uf-order"       name="order"       label="Order"                value={form.order}       onChange={handleChange} type="number" />
      <div>
        <label htmlFor="uf-desc" className="text-sm font-medium text-gray-300 block mb-1.5">Description *</label>
        <textarea
          id="uf-desc"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="input-field resize-none"
        />
      </div>
      <Button type="submit" variant="primary" disabled={saving}>
        {saving ? 'Saving…' : 'Create Video'}
      </Button>
    </form>
  );
};

export default VideoUploadForm;
