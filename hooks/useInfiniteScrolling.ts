import { RefObject, useCallback, useLayoutEffect, useState } from "react";

export const useInfiniteScrolling = ( element: RefObject<HTMLDivElement>, threshold: number, cb: () => void ) =>
{
    const [ distanceBottom, setDistanceBottom ] = useState( 0 );

    const scrollListener = useCallback( async () =>
    {
        if ( element.current )
        {
            const bottom = element.current.scrollHeight - element.current.clientHeight

            if ( !distanceBottom )
            {
                setDistanceBottom( Math.round( ( bottom / 100 ) * threshold ) );
            }

            if ( element.current.scrollTop > bottom - distanceBottom )
            {
                cb();
            }
        }
    }, [ cb, distanceBottom, element, threshold ] );

    useLayoutEffect( () =>
    {
        const el = element.current;
        el?.addEventListener( 'scroll', scrollListener );
        return () =>
        {
            el?.removeEventListener( 'scroll', scrollListener );
        }
    }, [ element, scrollListener ] );
}