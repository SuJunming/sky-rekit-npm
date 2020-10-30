import { request, Api, message } from '@api'
export const SJM111111aaaa = {
  state: {
    data: [],
  },
  reducers: {
    setData(state: any, payload: any) {
      return { ...state, data: payload.data }
    },
  },
  effects: (dispatch: any) => ({
    test: async function (params: any) {
      const data = await request.post(Api.test, params)
      message.success('test')
      dispatch.SJM111111aaaa.setData(data)
    },
  }),
}
