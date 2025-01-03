import { useCall } from "@stream-io/video-react-sdk";

export function useStreamCall() {
    const call = useCall()

    if (!call) {
        throw new Error("useStreamCall must be used within a StreamCall component")
    }

    return call
}