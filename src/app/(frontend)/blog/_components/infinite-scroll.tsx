"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import PostGrid from "./post-grid";
import { AllPostsQueryResult } from "../../../../../sanity.types";

type State = {
    posts: AllPostsQueryResult;
    loading: boolean;
    done: boolean;
    offset: number;
};

export default function InfinitePosts({ pageSize = 9 }: { pageSize?: number }) {
    const [state, setState] = useState<State>({
        posts: [],
        loading: false,
        done: false,
        offset: 0,
    });

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);

    const loadMore = useCallback(async () => {
        if (loadingRef.current || state.done) return;
        loadingRef.current = true;
        setState((s) => ({ ...s, loading: true }));

        try {
            const res = await fetch(`/api/posts?offset=${state.offset}&limit=${pageSize}`, { cache: "no-store" });
            const json = await res.json();
            const next = (json?.data || []) as AllPostsQueryResult;

            setState((s) => ({
                posts: [...s.posts, ...next],
                loading: false,
                done: next.length < pageSize,
                offset: s.offset + next.length,
            }));
        } catch {
            setState((s) => ({ ...s, loading: false, done: true }));
        } finally {
            loadingRef.current = false;
        }
    }, [pageSize, state.done, state.offset]);

    useEffect(() => {
        // initial load
        loadMore();
    }, [loadMore]);

    useEffect(() => {
        if (!sentinelRef.current || state.done) return;
        const el = sentinelRef.current;

        const io = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                loadMore();
            }
        }, { rootMargin: "600px 0px" });

        io.observe(el);
        return () => io.disconnect();
    }, [state.done, loadMore]);

    return (
        <>
            <PostGrid posts={state.posts} />
            <div ref={sentinelRef} />
            {state.loading && (
                <div className="py-8 text-center text-sm text-gray-500">Loading…</div>
            )}
            {state.done && state.posts.length > 0 && (
                <div className="py-8 text-center text-sm text-gray-400">You’ve reached the end.</div>
            )}
        </>
    );
}