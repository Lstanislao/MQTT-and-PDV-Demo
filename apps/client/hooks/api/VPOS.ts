import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axios } from '../../api';

export function useVPOS() {
  const mutation = useMutation<any, AxiosError, any>(async (info) => {
    const { data } = await axios.post('/metodo', info);
    return data;
  });
  return mutation;
}

export function useGet(
  options: Omit<UseQueryOptions, 'queryKey' | 'queryFn'> = {}
) {
  const query = useQuery(
    ['get'],
    async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/1`
      );

      return data;
    },
    options
  );
  return query;
}

// export function useGetCategory(
//   filters: Partial<Category>,
//   options: Omit<
//     UseQueryOptions<Category, AxiosError, Category, ['category']>,
//     'queryKey' | 'queryFn'
//   > = {}
// ) {
//   const query = useQuery<Category, AxiosError>(
//     ['category', filters?._id],
//     async () => {
//       const { data } = await axios.get<Category>(`/api/users/category/v1`, {
//         params: { ...filters },
//       });

//       return data;
//     },
//     options
//   );
//   return query;
// }
