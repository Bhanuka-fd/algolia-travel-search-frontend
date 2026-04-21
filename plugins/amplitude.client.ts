import * as amplitude from '@amplitude/analytics-browser'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    amplitude.init(config.public.amplitudeApiKey,{
        autocapture:{
            pageViews:false,
        },
    })

    return {
        provide: {
            amplitude,
        },
    }
})