import { useMemo, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type TUseEventCallback = (...args: any[]) => any

interface IEventCallbackHook {
    <F extends TUseEventCallback>(callback?: F): (this: any, ...args: Parameters<F>) => ReturnType<F>
}

/**
 * A Hook to define an event handler with an always-stable function identity.
 * useEvent updates the callback it's using after an "effective-time". So make sure to use it as a callback or in a useEffect which is placed after useEvent.
 * @remarks
 * Based on {@link https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md useEvent RFC}.
 *
 * @param callbackFn function to use for event handler
 * @returns an event handler
 */
const useEvent: IEventCallbackHook = <F extends TUseEventCallback>(callbackFn?: F) => {
    const callbackRef = useRef(callbackFn)

    useIsomorphicLayoutEffect(() => {
        callbackRef.current = callbackFn
    })

    return useMemo(
        () =>
            function (this: any, ...args: Parameters<F>) {
                if (callbackRef.current) {
                    return Reflect.apply(callbackRef.current, this, args)
                }
            },
        []
    )
}

export { useEvent }
