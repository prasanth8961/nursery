'use client';
import { useState, useEffect, useRef } from 'react';
import { COLORS, STRINGS } from '../constants';
import type { AdminCategory } from '@/types/admin';
import { uploadApi } from '@/lib/adminApi';
import { MdAdd, MdDelete, MdAddPhotoAlternate, MdClose } from 'react-icons/md';

interface VariantForm {
  size: string;
  price: number;
  discount: number;
  ratings: number;
  reviewsCount: number;
  growthRate: string;
  height: string;
  weight: string;
  quantityInStock: number;
  isAvailable: boolean;
  coverImages: string[];
  _localFiles: File[];
  _uploading: boolean;
}

const EMPTY_VARIANT: VariantForm = {
  size: '',
  price: 0,
  discount: 0,
  ratings: 0,
  reviewsCount: 0,
  growthRate: '',
  height: '',
  weight: '',
  quantityInStock: 0,
  isAvailable: true,
  coverImages: [],
  _localFiles: [],
  _uploading: false,
};

interface PlantForm {
  name: string;
  slug: string;
  tamilName: string;
  subName: string;
  categoryId: string;
  description: string;
  baseImageUrl: string;
  careInfo: string;
  fertilizingInfo: string;
  usageInfo: string;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string;
}

const EMPTY_PLANT: PlantForm = {
  name: '',
  slug: '',
  tamilName: '',
  subName: '',
  categoryId: '',
  description: '',
  baseImageUrl: '',
  careInfo: '',
  fertilizingInfo: '',
  usageInfo: '',
  isAvailable: true,
  isFeatured: false,
  tags: '',
};

interface PlantFormModalProps {
  open: boolean;
  categories: AdminCategory[];
  initialData?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  loading?: boolean;
  isEditing?: boolean;
}

export default function PlantFormModal({ open, categories, initialData, onSubmit, onCancel, loading, isEditing }: PlantFormModalProps) {
  const [plant, setPlant] = useState<PlantForm>(EMPTY_PLANT);
  const [variants, setVariants] = useState<VariantForm[]>([{ ...EMPTY_VARIANT }]);
  const [uploadError, setUploadError] = useState('');
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  /* ===== Image handling hooks moved up ===== */
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setThumbnailFile(null);
      setThumbnailUploading(false);
      setUploadError('');
      if (initialData) {
        setPlant({
          name: String(initialData.name ?? ''),
          slug: String(initialData.slug ?? ''),
          tamilName: String(initialData.tamilName ?? ''),
          subName: String(initialData.subName ?? ''),
          categoryId: String(initialData.categoryId ?? ''),
          description: String(initialData.description ?? ''),
          baseImageUrl: String(initialData.baseImageUrl ?? ''),
          careInfo: String(initialData.careInfo ?? ''),
          fertilizingInfo: String(initialData.fertilizingInfo ?? ''),
          usageInfo: String(initialData.usageInfo ?? ''),
          isAvailable: Boolean(initialData.isAvailable ?? true),
          isFeatured: Boolean(initialData.isFeatured ?? false),
          tags: Array.isArray(initialData.tags) ? (initialData.tags as string[]).join(', ') : '',
        });
        // Load existing variants
        const existingVariants = initialData.variants as Array<Record<string, unknown>> | undefined;
        if (existingVariants && existingVariants.length > 0) {
          setVariants(existingVariants.map((ev) => ({
            size: String(ev.size ?? ''),
            price: Number(ev.price ?? 0),
            discount: Number(ev.discount ?? 0),
            ratings: Number(ev.ratings ?? 0),
            reviewsCount: Number(ev.reviewsCount ?? 0),
            growthRate: String(ev.growthRate ?? ''),
            height: String(ev.height ?? ''),
            weight: String(ev.weight ?? ''),
            quantityInStock: Number(ev.quantityInStock ?? 0),
            isAvailable: Boolean(ev.isAvailable ?? true),
            coverImages: Array.isArray(ev.coverImages) ? (ev.coverImages as string[]) : [],
            _localFiles: [],
            _uploading: false,
          })));
        } else {
          setVariants([{ ...EMPTY_VARIANT }]);
        }
      } else {
        setPlant(EMPTY_PLANT);
        setVariants([{ ...EMPTY_VARIANT }]);
      }
    }
  }, [open, initialData]);

  if (!open) return null;

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const updatePlant = (key: keyof PlantForm, value: string | boolean) => {
    setPlant((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'name' && typeof value === 'string') {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const updateVariant = (idx: number, key: keyof VariantForm, value: unknown) => {
    setVariants((prev) => prev.map((v, i) => (i === idx ? { ...v, [key]: value } : v)));
  };

  const addVariant = () => setVariants((prev) => [...prev, { ...EMPTY_VARIANT }]);

  const removeVariant = (idx: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  };

  /* ===== Image handling ===== */

  const handleFilesSelected = (idx: number, files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setVariants((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, _localFiles: [...v._localFiles, ...newFiles] } : v))
    );
  };

  const removeLocalFile = (variantIdx: number, fileIdx: number) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === variantIdx ? { ...v, _localFiles: v._localFiles.filter((_, fi) => fi !== fileIdx) } : v
      )
    );
  };

  const removeUploadedImage = (variantIdx: number, imgIdx: number) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === variantIdx ? { ...v, coverImages: v.coverImages.filter((_, ii) => ii !== imgIdx) } : v
      )
    );
  };

  const uploadFilesForVariant = async (idx: number): Promise<string[]> => {
    const variant = variants[idx];
    if (variant._localFiles.length === 0) return variant.coverImages;

    updateVariant(idx, '_uploading', true);
    try {
      const res = await uploadApi.multiple(variant._localFiles, 'variants', `${plant.name} ${variant.size}`);
      const allUrls = [...variant.coverImages, ...res.data.urls];
      return allUrls;
    } catch (err: unknown) {
      let msg = `Failed to upload images for Variant ${idx + 1}`;
      if (err && typeof err === 'object' && 'response' in err) {
        const axErr = err as { response?: { data?: { message?: string } } };
        if (axErr.response?.data?.message) {
          msg = axErr.response.data.message;
        }
      }
      throw new Error(msg);
    } finally {
      updateVariant(idx, '_uploading', false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    const plantData: Record<string, unknown> = {
      ...plant,
      tags: plant.tags.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      // 1. Upload thumbnail if selected
      if (thumbnailFile) {
        setThumbnailUploading(true);
        try {
          const res = await uploadApi.single(thumbnailFile, 'plants-thumnail', plant.name);
          plantData.baseImageUrl = res.data.url;
        } catch (err: unknown) {
          throw new Error('Failed to upload plant thumbnail');
        } finally {
          setThumbnailUploading(false);
        }
      }

      // 2. Upload all variant images
      const processedVariants = [];
      for (let i = 0; i < variants.length; i++) {
        const urls = await uploadFilesForVariant(i);
        processedVariants.push({
          size: variants[i].size,
          price: Number(variants[i].price) || 0,
          discount: Number(variants[i].discount) || 0,
          ratings: Number(variants[i].ratings) || 0,
          reviewsCount: Number(variants[i].reviewsCount) || 0,
          growthRate: variants[i].growthRate || undefined,
          height: variants[i].height || undefined,
          weight: variants[i].weight || undefined,
          quantityInStock: Number(variants[i].quantityInStock) || 0,
          isAvailable: variants[i].isAvailable,
          coverImages: urls,
        });
      }
      plantData.variants = processedVariants;
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
      return;
    }

    onSubmit(plantData);
  };

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${COLORS.CARD_BG} rounded-xl w-full max-w-2xl shadow-2xl mx-4 max-h-[90vh] flex flex-col`}>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEditing ? `${STRINGS.EDIT} Plant` : `${STRINGS.ADD_NEW} Plant`}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* ===== Plant Details ===== */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plant Name <span className="text-red-500">*</span></label>
              <input value={plant.name} onChange={(e) => updatePlant('name', e.target.value)} required placeholder="e.g. Hibiscus Red" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug <span className="text-red-500">*</span></label>
              <input value={plant.slug} onChange={(e) => updatePlant('slug', e.target.value)} required placeholder="auto-generated" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamil Name</label>
              <input value={plant.tamilName} onChange={(e) => updatePlant('tamilName', e.target.value)} placeholder="e.g. செம்பருத்தி" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub Name</label>
              <input value={plant.subName} onChange={(e) => updatePlant('subName', e.target.value)} placeholder="e.g. Red Hibiscus" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category <span className="text-red-500">*</span></label>
              <select value={plant.categoryId} onChange={(e) => updatePlant('categoryId', e.target.value)} required className={inputClass}>
                <option value="">Select category...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
              <input value={plant.tags} onChange={(e) => updatePlant('tags', e.target.value)} placeholder="e.g. fast grower, red flower" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={plant.description} onChange={(e) => updatePlant('description', e.target.value)} rows={2} placeholder="Plant description..." className={inputClass} />
          </div>

          {/* ===== Thumbnail Section ===== */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plant Thumbnail (Base Image)</label>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 group">
                {(thumbnailFile || plant.baseImageUrl) ? (
                  <>
                    <img 
                      src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : plant.baseImageUrl} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => { setThumbnailFile(null); updatePlant('baseImageUrl', ''); }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <MdClose size={24} className="text-white" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <MdAddPhotoAlternate size={32} />
                    <span className="text-[10px] mt-1">Click to upload</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && setThumbnailFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This image will be used as the main thumbnail in listings.
                </p>
                <input 
                  value={plant.baseImageUrl} 
                  onChange={(e) => updatePlant('baseImageUrl', e.target.value)} 
                  placeholder="Or paste image URL here..." 
                  className={inputClass} 
                />
              </div>
            </div>
            {thumbnailUploading && <p className="text-xs text-emerald-600 mt-2 animate-pulse">Uploading thumbnail...</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Care Info</label>
              <textarea value={plant.careInfo} onChange={(e) => updatePlant('careInfo', e.target.value)} rows={2} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fertilizing Info</label>
              <textarea value={plant.fertilizingInfo} onChange={(e) => updatePlant('fertilizingInfo', e.target.value)} rows={2} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usage Info</label>
              <textarea value={plant.usageInfo} onChange={(e) => updatePlant('usageInfo', e.target.value)} rows={2} className={inputClass} />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <button type="button" onClick={() => updatePlant('isAvailable', !plant.isAvailable)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${plant.isAvailable ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${plant.isAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{STRINGS.AVAILABLE}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <button type="button" onClick={() => updatePlant('isFeatured', !plant.isFeatured)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${plant.isFeatured ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${plant.isFeatured ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{STRINGS.FEATURED}</span>
            </label>
          </div>

          {/* ===== Variants Section ===== */}
          <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Variants <span className="text-xs font-normal text-gray-500">(min. 1 required)</span>
                </h3>
                <button
                  type="button"
                  onClick={addVariant}
                  className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  <MdAdd size={16} /> Add Variant
                </button>
              </div>

              {uploadError && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm rounded-lg px-3 py-2 mb-3">
                  {uploadError}
                </div>
              )}

              <div className="space-y-4">
                {variants.map((v, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 relative">
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(idx)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded cursor-pointer"
                        title="Remove variant"
                      >
                        <MdDelete size={16} />
                      </button>
                    )}
                    <p className="text-xs font-medium text-gray-500 mb-3">Variant {idx + 1}</p>

                    {/* Variant fields */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Size <span className="text-red-500">*</span></label>
                        <input value={v.size} onChange={(e) => updateVariant(idx, 'size', e.target.value)} required placeholder="e.g. Small" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Price <span className="text-red-500">*</span></label>
                        <input type="number" value={v.price} onChange={(e) => updateVariant(idx, 'price', e.target.value)} required min={0} step="any" placeholder="₹ 0" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Discount %</label>
                        <input type="number" value={v.discount} onChange={(e) => updateVariant(idx, 'discount', e.target.value)} min={0} step="any" placeholder="0" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Height</label>
                        <input value={v.height} onChange={(e) => updateVariant(idx, 'height', e.target.value)} placeholder="e.g. 12 inch" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Weight</label>
                        <input value={v.weight} onChange={(e) => updateVariant(idx, 'weight', e.target.value)} placeholder="e.g. 500g" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Stock</label>
                        <input type="number" value={v.quantityInStock} onChange={(e) => updateVariant(idx, 'quantityInStock', e.target.value)} min={0} placeholder="0" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Ratings</label>
                        <input type="number" value={v.ratings} onChange={(e) => updateVariant(idx, 'ratings', e.target.value)} min={0} max={5} step="0.1" placeholder="0" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Reviews</label>
                        <input type="number" value={v.reviewsCount} onChange={(e) => updateVariant(idx, 'reviewsCount', e.target.value)} min={0} placeholder="0" className={inputClass} />
                      </div>
                    </div>

                    {/* Variant Available Toggle */}
                    <div className="mb-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <button type="button" onClick={() => updateVariant(idx, 'isAvailable', !v.isAvailable)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${v.isAvailable ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${v.isAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Available</span>
                      </label>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Cover Images</label>
                      <div className="flex flex-wrap gap-2">
                        {/* Already uploaded images */}
                        {v.coverImages.map((url, imgIdx) => (
                          <div key={`uploaded-${imgIdx}`} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 group">
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeUploadedImage(idx, imgIdx)}
                              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <MdClose size={16} className="text-white" />
                            </button>
                          </div>
                        ))}

                        {/* Local file previews */}
                        {v._localFiles.map((file, fileIdx) => (
                          <div key={`local-${fileIdx}`} className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-dashed border-emerald-400 group">
                            <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeLocalFile(idx, fileIdx)}
                              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <MdClose size={16} className="text-white" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-[8px] text-center py-0.5">NEW</div>
                          </div>
                        ))}

                        {/* Add Image Button */}
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[idx]?.click()}
                          className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-400 transition-colors cursor-pointer"
                        >
                          <MdAddPhotoAlternate size={20} />
                          <span className="text-[8px] mt-0.5">Add</span>
                        </button>

                        <input
                          ref={(el) => { fileInputRefs.current[idx] = el; }}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFilesSelected(idx, e.target.files)}
                        />
                      </div>
                      {v._uploading && (
                        <p className="text-xs text-emerald-600 mt-1 animate-pulse">Uploading images...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </form>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button type="button" onClick={onCancel} disabled={loading} className={`${COLORS.GHOST_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer`}>
            {STRINGS.CANCEL}
          </button>
          <button type="submit" onClick={handleSubmit} disabled={loading} className={`${COLORS.PRIMARY_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50`}>
            {loading ? STRINGS.LOADING : STRINGS.SAVE}
          </button>
        </div>
      </div>
    </div>
  );
}
