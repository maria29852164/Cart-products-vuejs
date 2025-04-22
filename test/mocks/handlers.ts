import { http, HttpResponse } from 'msw'
import { EndpointsEnum } from '../../src/utils/endpoints'

export const handlers = [
    http.post(EndpointsEnum.LOGIN, () => {
        return HttpResponse.json({ token: 'token_test' })
    }),
]
