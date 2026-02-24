import { useEffect, useCallback } from 'react';
import { plantsApi } from '@/lib/api';
import { useAppDispatch } from '@/lib/store/helper';
import { setPlants, setLoading, setError } from '@/lib/store/slices/productSlice';
import { Plant } from '@/types';
import { AdminPlant } from '@/types/admin';

export function useFetchFeaturedPlants() {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await plantsApi.getFeatured();
      const mappedPlants: Plant[] = (response.data as unknown as AdminPlant[]).map(p => {
        const variants = p.variants || [];
        const fallbackImage = variants[0]?.coverImages?.[0] || '';
        return {
          ...p,
          id: p.id,
          name: p.name,
          tamilName: p.tamilName || '',
          subName: p.subName || '',
          description: p.description || '',
          baseImageUrl: p.baseImageUrl || fallbackImage,
          category: p.category?.name || 'Others',
          careInfo: p.careInfo || '',
          fertilizingInfo: p.fertilizingInfo || '',
          usageInfo: p.usageInfo || '',
          isFeatured: p.isFeatured || false,
          isAvailable: p.isAvailable || false,
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

      dispatch(setPlants({ plants: mappedPlants, total: mappedPlants.length }));
    } catch (err: any) {
      console.error('Failed to fetch featured plants:', err);
      dispatch(setError(err.message || 'Failed to fetch featured plants'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { refetch: fetchData };
}
