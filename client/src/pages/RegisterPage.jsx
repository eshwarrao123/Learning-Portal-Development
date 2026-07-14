import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form,  setForm]  = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy,  setBusy]  = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="card w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">GVCC <span className="text-brand-500">Learn</span></h1>
          <p className="text-gray-400 mt-2 text-sm">Create your account</p>
        </div>

        {error && (
          <div role="alert" className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="reg-name"     name="name"     label="Full Name" value={form.name}     onChange={handleChange} autoComplete="name"     required />
          <Input id="reg-email"    name="email"    label="Email"     type="email" value={form.email}    onChange={handleChange} autoComplete="email"    required />
          <Input id="reg-password" name="password" label="Password"  type="password" value={form.password} onChange={handleChange} autoComplete="new-password" required />
          <Button type="submit" variant="primary" disabled={busy} className="mt-2 w-full py-2.5">
            {busy ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
