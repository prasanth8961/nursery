import { useEffect, useState, useCallback } from 'react';
import { plantsApi, categoriesApi } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/lib/store/helper';
import { setPlants, setLoading, setError } from '@/lib/store/slices/productSlice';
import { Plant } from '@/types';
import { AdminPlant } from '@/types/admin';

export function useFetchPlants(params: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
} = {}) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.product.loading);
  const [categories, setCategories] = useState<string[]>(['All']);

  const fetchData = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const { page = 1, limit = 10, category, search } = params;
      const [plantsRes, catsRes] = await Promise.all([
        plantsApi.getAll({ page, limit, category, search }),
        categoriesApi.getAll(),
      ]);

      // Map categories
      const catNames = ['All', ...catsRes.data.filter(c => c.isActive).map(c => c.name)];
      setCategories(catNames);

      // Map plants
      const mappedPlants: Plant[] = (plantsRes.data.data as unknown as AdminPlant[]).map(p => {
        const variants = p.variants || [];
        const fallbackImage = variants[0]?.coverImages?.[0] || '';
        return {
          ...p,
          id: p.id,
          name: p.name,
          tamilName: p.tamilName,
          subName: p.subName,
          description: p.description || '',
          baseImageUrl: p.baseImageUrl || fallbackImage,
          category: p.category?.name || 'Others',
          careInfo: p.careInfo || '',
          fertilizingInfo: p.fertilizingInfo || '',
          usageInfo: p.usageInfo || '',
          isFeatured: p.isFeatured,
          isAvailable: p.isAvailable,
          tags: p.tags || [],
          relatedPlantsIds: p.relatedPlantsIds || [],
          variants: variants.map(v => ({
            ...v,
            growthRate: v.growthRate || '',
            height: v.height || '',
            weight: v.weight || '',
          })),
        };
      });

      dispatch(setPlants({ plants: mappedPlants, total: plantsRes.data.total }));
    } catch (err: any) {
      console.error('Failed to fetch plants:', err);
      dispatch(setError(err.message || 'Failed to fetch plants'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, params.page, params.limit, params.category, params.search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { categories, loading, refetch: fetchData };
}
