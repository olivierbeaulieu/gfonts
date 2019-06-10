import { useState, useEffect } from 'react'

export default function useInfiniteScroll(
    callback: (cb: () => void) => void
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [isFetching, setIsFetching] = useState(false)

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop <
                document.documentElement.offsetHeight ||
            isFetching
        ) {
            return
        }

        setIsFetching(true)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!isFetching) return
        callback(() => {
            console.log('called back')
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching])

    return [isFetching, setIsFetching]
}
