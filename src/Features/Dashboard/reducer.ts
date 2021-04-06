import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurements = {
    at: any;
    metric: string;
    unit: string;
    value: number;
}

export type Metrics = {
    metric: string;
    measurements: Array<Measurements>;
};

export type ApiErrorAction = {
    error: string;
};

export type InitialState = {
    selectedMetricsWithMeasurements: Array<Metrics>;
};

const initialState : InitialState = {
    selectedMetricsWithMeasurements:[],
};

const slice = createSlice({
    name: 'MetricsData',
    initialState,
    reducers: {
        metricsApiDataRecevied: (state, action: PayloadAction<Array<Metrics>>) => {
            state.selectedMetricsWithMeasurements = action.payload;
        },
        metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    },
});

export const { reducer } = slice;
export const { actions } = slice;
