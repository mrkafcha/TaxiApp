import {createSlice} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const initialState = {
    trips: [],
}

export const tripsApi = createApi({
    reducerPath: 'tripsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://67978329c2c861de0c6d0045.mockapi.io/trips',
    }),
    endpoints: (builder) => ({
        getTrips: builder.query({
            query: () => '',
            providesTags: ['Trips']
        }),
        addTrips: builder.mutation({
            query:(trip) => ({
                method: 'POST',
                body: trip,
            }),
            invalidatesTags: ['Trips'],
        }),
        updateTrip: builder.mutation({
            query: (trip) => ({
                method: 'PUT',
                url: trip.id,
                body: trip,
            }),
            invalidatesTags: ['Trips']
        })
    })
});

export const { useGetTripsQuery, useAddTripsMutation, useUpdateTripMutation
} = tripsApi;
