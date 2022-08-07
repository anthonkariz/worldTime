import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const worldTime = createApi({
    reducerPath: 'worldTime',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://worldtimeapi.org/api/',

    }),
    endpoints: (builder) => ({
      
        getTime: builder.mutation({
            query: ({ region,city }) => ({
                url: `/timezone/${region}/${city}`, 
                method: 'GET',
              
            }),
           
        }),


    })

});

export const {useGetTimeMutation}=worldTime;