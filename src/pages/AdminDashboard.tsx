import React, { useState, useEffect } from 'react';
import { useGear, addGearItem, updateGearItem, deleteGearItem, GearItem } from '../services/gearService';
import { auth } from '../services/firebaseService';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Plus, Edit2, Trash2, LogOut, Check, X, Loader2 } from 'lucide-react';

export function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { gear, loading: gearLoading } = useGear();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<GearItem, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    price: '',
    image: '',
    link: '',
    inStock: true
  });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error', error);
      alert('Failed to log in.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', image: '', link: '', inStock: true });
    setEditingId(null);
  };

  const handleEdit = (item: GearItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      link: item.link,
      inStock: item.inStock
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteGearItem(id);
    } catch (error: any) {
      alert('Error deleting item: ' + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingId) {
        await updateGearItem(editingId, formData);
      } else {
        await addGearItem(formData);
      }
      resetForm();
    } catch (error: any) {
      alert('Error saving item: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0A0F0D] flex items-center justify-center text-white"><Loader2 className="w-8 h-8 animate-spin text-orange-600" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0F0D] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-white uppercase italic mb-4">Admin Dashboard</h1>
        <p className="text-white/50 mb-8 max-w-md">Log in with your administrator account to manage your inventory.</p>
        <button 
          onClick={handleLogin}
          className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase transition-all shadow-xl hover:scale-105"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-white uppercase italic">Inventory Management</h1>
            <p className="text-white/50">Admin Dashboard</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase text-sm font-bold"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-[#0A1210] p-6 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                {editingId ? <><Edit2 className="w-5 h-5 text-orange-600"/> Edit Item</> : <><Plus className="w-5 h-5 text-orange-600"/> Add Item</>}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-white/50 tracking-widest mb-1">Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="e.g. StealthPro Reel" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-white/50 tracking-widest mb-1">Description</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="Brief description..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/50 tracking-widest mb-1">Price</label>
                    <input required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="e.g. $189" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/50 tracking-widest mb-1">Stock Status</label>
                    <button type="button" onClick={() => setFormData({...formData, inStock: !formData.inStock})} className={`w-full py-3 rounded-xl border border-white/10 font-bold uppercase text-xs transition-colors flex items-center justify-center gap-2 ${formData.inStock ? 'bg-green-600/20 text-green-500 border-green-600/30' : 'bg-red-600/20 text-red-500 border-red-600/30'}`}>
                      {formData.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-white/50 tracking-widest mb-1">Product Link (URL)</label>
                  <input required type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="https://amazon.com/..." />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-white/50 tracking-widest mb-1">Image URL</label>
                  <input required type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" placeholder="https://unsplash.com/..." />
                </div>
                <div className="pt-4 flex gap-4">
                  {editingId && (
                    <button type="button" onClick={resetForm} className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold uppercase hover:bg-white/5 transition-all text-sm">
                      Cancel
                    </button>
                  )}
                  <button disabled={actionLoading} type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold uppercase transition-all shadow-xl disabled:opacity-50 text-sm">
                    {actionLoading ? 'Saving...' : (editingId ? 'Update Item' : 'Add Item')}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black uppercase flex items-center justify-between">
              Current Gear 
              {gearLoading && <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />}
            </h2>
            {gear.length === 0 && !gearLoading && (
              <div className="bg-[#0A1210] border border-white/10 rounded-3xl p-12 text-center">
                <p className="text-white/50">No gear items found. Add your first item using the form.</p>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-6">
              {gear.map((item) => (
                <div key={item.id} className="bg-[#0A1210] border border-white/10 p-4 rounded-3xl flex gap-4 items-start">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white uppercase truncate pr-2">{item.name}</h4>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="text-white/50 hover:text-orange-500 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="text-white/50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-black text-orange-500 text-sm">{item.price}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.inStock ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {item.inStock ? 'Stocked' : 'Empty'}
                      </span>
                    </div>
                    <a href={item.link} target="_blank" rel="noreferrer" className="text-white/30 text-xs truncate block mt-2 hover:text-white transition-colors">
                      {item.link}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
