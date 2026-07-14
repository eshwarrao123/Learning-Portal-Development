import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

const AddBookmarkForm = ({ onAdd, getCurrentTime }) => {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const timestamp = Math.floor(getCurrentTime());
      await onAdd({ timestamp, name: name.trim() });
      setName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add bookmark');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1">
        <Input
          id="bookmark-name"
          placeholder="Bookmark label (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
        />
      </div>
      <Button type="submit" variant="primary" disabled={saving} className="shrink-0">
        {saving ? '…' : '+ Bookmark'}
      </Button>
    </form>
  );
};

export default AddBookmarkForm;
