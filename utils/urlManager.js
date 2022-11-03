import { Router, useRouter } from "next/router"

export default function (values) {

    const router = useRouter()

    let currentUrlParams = new URLSearchParams(window.location.search)
    values && values.length > 0 && values.map(x => {
        currentUrlParams.set(x.key, x.value)
    })
    router.push('?'+currentUrlParams.toString(), undefined, { shallow: true })
}